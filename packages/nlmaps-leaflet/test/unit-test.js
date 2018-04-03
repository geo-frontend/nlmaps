let tap = require('../../../node_modules/tap');

let URL = 'http://tiles.energielabelatlas.nl/v2/osm/{z}/{x}/{y}.png';
let ATTR = 'Kaartgegevens &copy; <a href="cbs.nl">CBS</a>, <a href="kadaster.nl">Kadaster</a>, <a href="openstreetmap.org">OpenStreetMap contributors</a>';


tap.test('nlmaps can populate Leaflet in two-line version', function(t){
  let L = require('leaflet-headless');
  let bgLayer = require('../build/nlmaps-leaflet.cjs.js');
  t.assert(typeof L.nlmapsBgLayer === 'function', 'nlmaps has populated property on L');
  t.end()


});
tap.test('nlmaps can populate leaflet in one-line version', function(t){
  let L = require('leaflet-headless');
  let bgLayer = require('../build/nlmaps-leaflet.cjs.js').bgLayer;
  t.assert(typeof bgLayer === 'function', 'bgLayer function created');
  t.assert(typeof L.nlmapsBgLayer === 'function', 'nlmaps has populated property on L');
  t.end()

});

//tap.test('nlmaps can create a layer object', function(t) {
  //let map = L.map(document.createElement('div')).setView([52, 4], 10);
  //let foo = bgLayer('osm');
  //t.assert(typeof foo === 'object', 'foo layer has been created');
  //t.assert(typeof foo.addTo === 'function', 'foo has the addTo method');
  //t.doesNotThrow(foo.addTo(map), 'can add the foo layer to the map');
  //t.equals(foo._url, URL, 'foos url matches what is expected');
  //t.equals(foo.options.attribution, ATTR, 'attribution is correct');
  //t.end();
//})

