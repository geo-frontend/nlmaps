let test = require('../../../node_modules/tape');
const shell = require('shelljs');

//makeMap should be default?
test('top-level nlmaps package exports makeMap, leaflet, googlemaps and openlayers', function(t){
  let nlmaps = require('../build/nlmaps.cjs.js').nlmaps;
  t.equal(typeof nlmaps.createMap, 'function');
  t.equal(typeof nlmaps.leaflet , 'object');
  t.equal(typeof nlmaps.googlemaps, 'object');
  t.equal(typeof nlmaps.openlayers , 'object');
  t.equal(typeof nlmaps.geoLocate , 'function');
  t.end();

});

//test configPArser
test('config parser',function(t){
  const TEMPCONFDIR = 'packages/config/.tmp';
  if (!shell.test('-e', TEMPCONFDIR)) {
    shell.mkdir(TEMPCONFDIR);
  }
  shell.cp('packages/nlmaps/test/testconfig.js', TEMPCONFDIR + '/config.js');
  let config = require('../../lib/configParser.js').CONFIG;
  t.equal(typeof config.BASEMAP_PROVIDERS, 'object')
  t.assert(config.BASEMAP_PROVIDERS.standaard !== undefined);
  t.end();
});