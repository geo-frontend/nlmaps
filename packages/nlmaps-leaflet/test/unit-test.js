let test = require('../../../node_modules/tape-catch');
const shell = require('shelljs');

test('nlmaps can populate Leaflet with bgLayer', function(t){ 
  t.plan(3);
  let L = require('leaflet-headless');
  require('../build/nlmaps-leaflet.cjs.js');  
  t.equal(typeof L.nlmapsBgLayer, 'function', 'nlmaps has populated nlmapsBgLayer property on L');
  t.equal(typeof L.NlmapsOverlayLayer, 'function', 'nlmaps has populated NlmapsOverlayLayer property on L');
  t.equal(typeof L.Control.GeoLocatorControl, 'function', 'nlmaps has populated Control.GeoLocatorControl property on L');
});

test('nlmaps can load config in Leaflet', function(t) {
  t.plan(3);
  const TEMPCONFDIR = 'packages/config/.tmp';
  if (!shell.test('-e', TEMPCONFDIR)) {
    shell.mkdir(TEMPCONFDIR);
  }
  shell.cp('packages/config/config.js', TEMPCONFDIR + '/config.js');
  let config = require('../../lib/configParser.js').CONFIG;     
  let nlmapsLeaflet = require('../build/nlmaps-leaflet.cjs.js');    
 
  t.equal(nlmapsLeaflet.bgLayer('standaard')._url,
    config.BASEMAP_PROVIDERS.standaard.url,
    'background layer can be loaded');
  t.equal(typeof nlmapsLeaflet.markerLayer,
    'function',
    'Marker layer can be loaded');
  t.equal(nlmapsLeaflet.overlayLayer('gebouwen')._url,
    config.WMS_PROVIDERS.gebouwen.url,
    'WMS layer can be loaded');  
})

test('nlmaps wrapper functions',function(t){
  t.plan(3);
  let L = require('leaflet-headless');
  let map = L.map(document.createElement('div')).setView([52, 4], 10);
  let nlmapsLeaflet = require('../build/nlmaps-leaflet.cjs.js');
  t.deepEqual(nlmapsLeaflet.getMapCenter(map), {latitude: 52, longitude: 4}, 'getMapCenter() returns correct latlon')
  t.equal(typeof nlmapsLeaflet.geocoderControl, 'function', 'geocoderControl exists');
  t.equal(typeof nlmapsLeaflet.geoLocatorControl, 'function', 'geoLocatorControl exists');  
});

