const { exec } = require('child_process');

//sanity check for process.argv[2]?
let pkgs = ['nlmaps-leaflet', 'nlmaps-openlayers', 'nlmaps-googlemaps', 'nlmaps'];
for (let i = 0; i < pkgs.length; i++) {
  let pkg = pkgs[i];
  let bundleName = `${pkg}.iife.js`;
  exec(`rollup -c config/rollup.cjs.js && rollup -c config/rollup.es.js && rollup -c config/rollup.iife.js && cp build/${bundleName} ../../dist/`, {cwd: `./packages/${pkg}`}, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
}
