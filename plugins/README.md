# Listed plugins

`registry.json` lists the insert plugins the NetComposer Studio offers in **Add › Plugins**. Each entry points at a
`plugin.json` in a folder here and carries the sha256 of that file and of its DSP file; the Studio checks both before
the plugin's code runs. Anyone can still load any plugin from a URL in the Studio, after a warning.

To list a plugin, open a pull request that:

1. adds its folder as `plugins/<name>/` (`plugin.json` and its DSP file, as they passed the checker);
2. adds its entry to `registry.json` (format: nc-fx `schema/plugin-registry.schema.json`), with `integrity` from
   `node -e "const c=require('crypto'),f=require('fs');console.log('sha256-'+c.createHash('sha256').update(f.readFileSync(process.argv[1])).digest('base64'))" <file>`;
3. pastes the output of `npx -p github:netcomposer-art/nc-fx nc-fx-check plugins/<name> --browser` (every line PASS).

Each one is read by hand before it is merged. A new version is a new folder or new files with new hashes.

The guide: https://github.com/netcomposer-art/nc-fx/blob/main/docs/plugins.md. The template:
https://github.com/netcomposer-art/nc-plugin-template.
