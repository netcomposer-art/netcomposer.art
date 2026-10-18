#!/usr/bin/env python3
"""Validate a NetComposer Supplier index (netcomposer.json) and its per-sound manifests. Python 3 stdlib only.

usage: python3 validate_supplier.py https://example.org/netcomposer.json [--sample 25] [--all-manifests] [--seed 846] [--json report.json]

Checks
  index     : JSON, nc_version, offerings[] each with audio + manifest URLs
  manifests : every sampled manifest parses; license (manifest or index default_license) is in the accepted set;
              audio named in the manifest matches the index entry
  audio     : for a sample, downloads the audio and compares sha256 and size_bytes with the manifest
Exit code 0 = no errors (warnings allowed), 1 = errors.
"""
import argparse,collections,hashlib,json,random,sys,urllib.parse,urllib.request,concurrent.futures as cf,datetime
ACCEPTED={"CC0-1.0","CC-BY-3.0","CC-BY-4.0","CC-BY-SA-3.0","CC-BY-SA-4.0","PDM-1.0","Public-Domain"}
UA={"User-Agent":"NetComposer-supplier-validator/0.1 (+https://netcomposer.art/supplier-spec/)"}
def get(url,binary=False):
  with urllib.request.urlopen(urllib.request.Request(url,headers=UA),timeout=60) as r:
    b=r.read(); return b if binary else json.loads(b.decode("utf-8"))
def main():
  ap=argparse.ArgumentParser(); ap.add_argument("index"); ap.add_argument("--sample",type=int,default=25); ap.add_argument("--all-manifests",action="store_true")
  ap.add_argument("--seed",type=int,default=846); ap.add_argument("--json"); a=ap.parse_args()
  errors=[]; warns=[]; rep={"index":a.index,"checked_at":datetime.datetime.now().astimezone().isoformat(timespec="seconds")}
  idx=get(a.index); offs=idx.get("offerings") or []
  if not idx.get("nc_version"): errors.append("index: nc_version missing")
  if not offs: errors.append("index: no offerings"); 
  bad=[i for i,o in enumerate(offs) if not (isinstance(o,dict) and o.get("audio") and o.get("manifest"))]
  if bad: errors.append(f"index: {len(bad)} offerings lack audio or manifest")
  dlic=idx.get("default_license"); rep.update(nc_version=idx.get("nc_version"),creator=idx.get("creator"),default_license=dlic,offerings=len(offs))
  if dlic and dlic not in ACCEPTED: errors.append(f"index: default_license {dlic} not accepted")
  rnd=random.Random(a.seed); good=[o for i,o in enumerate(offs) if i not in set(bad)]
  mset=good if a.all_manifests else rnd.sample(good,min(len(good),max(a.sample,a.sample)))
  def man(o):
    try: return o,get(urllib.parse.urljoin(a.index,o["manifest"])),None
    except Exception as e: return o,None,str(e)[:120]
  with cf.ThreadPoolExecutor(16) as ex: res=list(ex.map(man,mset))
  fields=collections.Counter(); lic=collections.Counter(); mans={}
  for o,m,e in res:
    if e: errors.append(f"manifest {o['manifest']}: {e}"); continue
    mans[o["manifest"]]=(o,m); fields.update(m.keys())
    l=m.get("license") or dlic; lic[l]+=1
    if l not in ACCEPTED: errors.append(f"manifest {o['manifest']}: license {l} not accepted")
    for f in ("title","creator","audio","sha256","size_bytes"):
      if f not in m: errors.append(f"manifest {o['manifest']}: {f} missing")
    if m.get("audio") and urllib.parse.urljoin(urllib.parse.urljoin(a.index,o["manifest"]),m["audio"])!=urllib.parse.urljoin(a.index,o["audio"]):
      warns.append(f"manifest {o['manifest']}: audio {m['audio']} resolves differently from the index entry")
  rep.update(manifests_checked=len(mans),manifest_fields={k:v for k,v in sorted(fields.items())},licenses=dict(lic))
  asample=rnd.sample(list(mans.values()),min(len(mans),a.sample))
  def aud(om):
    o,m=om
    try: b=get(urllib.parse.urljoin(a.index,o["audio"]),binary=True); return o,m,hashlib.sha256(b).hexdigest(),len(b),None
    except Exception as e: return o,m,None,None,str(e)[:120]
  with cf.ThreadPoolExecutor(8) as ex: ares=list(ex.map(aud,asample))
  ok=0
  for o,m,h,n,e in ares:
    if e: errors.append(f"audio {o['audio']}: {e}"); continue
    if h!=m.get("sha256"): errors.append(f"audio {o['audio']}: sha256 {h[:12]} != manifest {str(m.get('sha256'))[:12]}"); continue
    if m.get("size_bytes") is not None and n!=m["size_bytes"]: errors.append(f"audio {o['audio']}: size {n} != manifest {m['size_bytes']}"); continue
    ok+=1
  rep.update(audio_checked=len(ares),audio_ok=ok,errors=errors,warnings=warns,status="valid" if not errors else "invalid")
  print(json.dumps(rep,indent=1,ensure_ascii=False))
  if a.json: json.dump(rep,open(a.json,"w"),indent=1,ensure_ascii=False)
  return 0 if not errors else 1
if __name__=="__main__": sys.exit(main())
