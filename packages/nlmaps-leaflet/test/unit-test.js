let tap = require('../../../node_modules/tap');

let URL = 'http://tiles.energielabelatlas.nl/v2/osm/{z}/{x}/{y}.png';
let ATTR = 'Kaartgegevens &copy; <a href="cbs.nl">CBS</a>, <a href="kadaster.nl">Kadaster</a>, <a href="openstreetmap.org">OpenStreetMap contributors</a>';


tap.test('nlmaps can populate Leaflet with bgLayer', function(t){
  let L = require('leaflet-headless');
  let bgLayer = require('../build/nlmaps-leaflet.cjs.js');
  t.assert(typeof L.nlmapsBgLayer === 'function', 'nlmaps has populated property on L');
  t.end()


});

tap.test('nlmaps can create a layer object', function(t) {
  let L = require('leaflet-headless');
  let bgLayer = require('../build/nlmaps-leaflet.cjs.js').bgLayer;
  let map = L.map(document.createElement('div')).setView([52, 4], 10);
  let foo = bgLayer('pastel');
  //the created object has expected properties
  t.assert(typeof foo.options.minZoom === 'number');
  t.end();
})

