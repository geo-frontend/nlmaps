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

//test configParser
test('parse testconfig.js and create config object',function(t){
  const TEMPCONFDIR = 'packages/config/.tmp';
  if (!shell.test('-e', TEMPCONFDIR)) {
    shell.mkdir(TEMPCONFDIR);
  }
  shell.cp('packages/nlmaps/test/testconfig.js', TEMPCONFDIR + '/config.js');
  let config = require('../../lib/configParser.js').CONFIG;    
  t.equal(typeof config, 'object',"config is an object");
  t.equal(config.BASE_DEFAULTS.crs,'EPSG:3857',"default crs = EPSG:3857");
  t.equal(config.WMS_DEFAULTS.version,'1.1.1', "default WMS version is 1.1.0");
  t.equal(config.BASEMAP_PROVIDERS.standaard.url,'https://geodata.nationaalgeoregister.nl/tiles/service',"basemap 'standaard' lives on 'https://geodata.nationaalgeoregister.nl/tiles/service'");
  t.equal(config.WMS_PROVIDERS.foobar.url,'https://geodata.nationaalgeoregister.nl/bash/wms',"WMS 'foobar' lives on 'https://geodata.nationaalgeoregister.nl/bash/wms'");
  t.equal(typeof config.BASEMAP_PROVIDERS[config.MAP.style], 'object', "default background map exists in the config");
  t.end();
});

//test the main lib
test('main functions from lib',function(t){
  let nlmaps = require('../../lib/index.js');
  t.equal(nlmaps.getProvider('standaard').name,'standaard',"getProvider returns 'standaard'");
  t.equal(nlmaps.getWmsProvider('foobar').name, 'foobar', "getWmsProvider returns 'foobar'")
  t.notEqual(nlmaps.geolocator_icon,null,"there is a geolocator_icon")
  t.notEqual(nlmaps.marker_icon,null,"there is a marker_icon")
  t.notEqual(nlmaps.marker_icon,null,"there is a marker_icon")
  t.end()
})