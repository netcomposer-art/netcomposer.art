#!/usr/bin/env python3
"""Render the Sketch that /create/ downloads, with kit 0.2.0.

The page used to put stretch_to_s on the pad. Kit 0.2.0 refuses that before
it fetches anything. This drives the real page, then renders that plan.
"""
import json
import os
import shutil
import socket
import subprocess
import sys
import tempfile
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DUMP = ROOT / "tests" / "dump_sketch.mjs"


def free_port():
    s = socket.socket()
    s.bind(("127.0.0.1", 0))
    port = s.getsockname()[1]
    s.close()
    return port


def chrome_bin():
    for name in (os.environ.get("CHROME"), "google-chrome", "google-chrome-stable", "chromium", "chromium-browser"):
        if name and shutil.which(name):
            return shutil.which(name)
    sys.exit("chrome not found (set CHROME)")


def wait_http(port, timeout=15):
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            with socket.create_connection(("127.0.0.1", port), 0.3):
                return
        except OSError:
            time.sleep(0.15)
    sys.exit(f"port {port} did not open")


def main():
    http_port = free_port()
    dbg_port = free_port()
    http = subprocess.Popen(
        [sys.executable, "-m", "http.server", str(http_port), "--bind", "127.0.0.1"],
        cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    user = tempfile.mkdtemp(prefix="nc-sketch-chrome-")
    chrome = subprocess.Popen(
        [chrome_bin(), "--headless=new", "--disable-gpu", "--no-sandbox", "--disable-dev-shm-usage",
         "--remote-debugging-address=127.0.0.1", f"--remote-debugging-port={dbg_port}",
         f"--user-data-dir={user}", "about:blank"],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        wait_http(http_port)
        wait_http(dbg_port)
        url = f"http://127.0.0.1:{http_port}/create/"
        raw = subprocess.check_output(["node", str(DUMP), str(dbg_port), url], text=True)
        plan = json.loads(raw)
        blob = json.dumps(plan)
        if "stretch_to_s" in blob:
            sys.exit("downloaded Sketch still asks for stretch_to_s")
        for layer in plan["layers"]:
            for ev in layer.get("events") or []:
                if "dur_s" not in ev:
                    sys.exit(f"event on {layer['id']} has no dur_s")
        from ncperf.schema import validate
        errs = validate(plan)
        if errs:
            sys.exit("Sketch does not validate:\n" + "\n".join(errs))
        from ncperf.render import Renderer
        out = tempfile.mkdtemp(prefix="nc-sketch-out-")
        path = os.path.join(out, "plan.json")
        with open(path, "w", encoding="utf-8") as f:
            json.dump(plan, f)
        flac, mp3, log = Renderer(plan, out).run(plan.get("id") or "sketch")
        if not os.path.isfile(flac) or os.path.getsize(flac) < 1000:
            sys.exit(f"render did not write audio: {flac}")
        ratios = {u.get("time_stretch") for u in log.get("uses", [])}
        if ratios - {1, 1.0, None}:
            sys.exit(f"render time-stretched: {ratios}")
        print(f"OK {flac} ({os.path.getsize(flac)} bytes, {len(log.get('uses', []))} uses, stretch {sorted(ratios)})")
    finally:
        chrome.terminate()
        http.terminate()
        chrome.wait(timeout=10)
        http.wait(timeout=10)


if __name__ == "__main__":
    main()
