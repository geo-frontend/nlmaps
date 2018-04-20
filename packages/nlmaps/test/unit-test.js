let test = require('../../../node_modules/tape-catch');
const shell = require('shelljs');

//makeMap should be default?
test('top-level nlmaps package exports makeMap, leaflet, googlemaps and openlayers', function(t){
  t.plan(11);
  let nlmaps = require('../build/nlmaps.cjs.js').nlmaps;  
  t.equal(typeof nlmaps.createMap, 'function','created map');
  t.equal(typeof nlmaps.leaflet , 'object', 'leaflet object exists');
  t.equal(typeof nlmaps.leaflet.bgLayer , 'function', 'leaflet bgLayer exists');
  t.equal(typeof nlmaps.googlemaps, 'object', 'googlemaps object exists');
  t.equal(typeof nlmaps.googlemaps.bgLayer, 'function', 'googlemaps bgLayer exists');  
  t.equal(typeof nlmaps.openlayers , 'object', 'openlayers object exists');
  t.equal(typeof nlmaps.openlayers.bgLayer , 'function', 'openlayers bgLayer exists');
  t.equal(typeof nlmaps.geoLocate , 'function', 'geoLocate object exists');
  t.equal(nlmaps.lib,'too few libs', 'no map libraries are loaded');
  t.equal(nlmaps.createMap(), undefined, 'since no libraries are loaded there is no map');
  t.throws(nlmaps.geoLocate,/geolocation is not available in your browser./,"geolocation isn't available");  
});

//test configParser
test('parse testconfig.js and create config object',function(t){  
  t.plan(6);
  const TEMPCONFDIR = 'packages/config/.tmp';
  if (!shell.test('-e', TEMPCONFDIR)) {
    shell.mkdir(TEMPCONFDIR);
  }
  shell.cp('packages/nlmaps/test/testconfig.js', TEMPCONFDIR + '/config.js');
  let config = require('../../lib/configParser.js').CONFIG;      
  t.equal(typeof config, 'object',"config is an object");  
  t.equal(config.BASE_DEFAULTS.crs,'EPSG:3857',"default crs = EPSG:3857");
  t.equal(config.WMS_DEFAULTS.version,'1.1.1', "default WMS version is 1.1.0");
  t.equal(config.BASEMAP_PROVIDERS.standaard.url,
    'https://geodata.nationaalgeoregister.nl/tiles/service/wmts/brtachtergrondkaart/EPSG:3857/{z}/{x}/{y}.png',
    "basemap 'standaard' lives on '  https://geodata.nationaalgeoregister.nl/tiles/service/wmts/brtachtergrondkaart/EPSG:3857/{z}/{x}/{y}.png'");
  t.equal(config.WMS_PROVIDERS.foobar.url,
    'https://geodata.nationaalgeoregister.nl/bash/wms',"WMS 'foobar' lives on 'https://geodata.nationaalgeoregister.nl/bash/wms'");
  t.equal(typeof config.BASEMAP_PROVIDERS[config.MAP.style], 'object', "default background map exists in the config");
  
});

//test the main lib
test('main functions from lib',function(t){
  t.plan(5);
  let nlmaps = require('../../lib/index.js');
  t.equal(nlmaps.getProvider('standaard').name,'standaard',"getProvider returns 'standaard'");
  t.equal(nlmaps.getWmsProvider('foobar').name, 'foobar', "getWmsProvider returns 'foobar'")
  t.notEqual(nlmaps.geolocator_icon,null,"there is a geolocator_icon")
  t.notEqual(nlmaps.marker_icon,null,"there is a marker_icon")
  t.notEqual(nlmaps.search_icon,null,"there is a search_icon")
  
})

//test the click event bus
test('clicks passed through', function(t) {
  let L = require('leaflet-headless');
  let nlmaps = require('../../nlmaps/build/nlmaps.cjs.js').nlmaps;
  t.equal(typeof nlmaps.clickprovider, 'function', 'clickprovider is a function');
  t.end();
})


//test featurequery
test('featurequery functions', function(t){
  let query = require ('../../nlmaps/build/nlmaps.cjs.js').nlmaps.queryFeatures;
  t.equal(typeof query, 'function', 'featurequery module exports a function');
  let nlmaps = require('../../lib/index.js');
  t.equal(typeof nlmaps.markersWithQueryResults, 'function', 'lib exports markersWithQueryResults and its a function');
  t.end();

})

//test('generating clicks', function(t){
  //let L = require('leaflet-headless');
  //let { singleClick } = require('../../lib/markers.js');
  //t.equal(singleClick({lat: 52, lng: 5}), {latlng: {lat: 52, lng: 5}}, 'marker returns the same object it received');
  //t.end();
//});

