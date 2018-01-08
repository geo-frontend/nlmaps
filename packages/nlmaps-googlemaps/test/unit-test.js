let test = require('../../../node_modules/tap').test;
let GoogleMapsLoader = require('google-maps');

let URL = 'http://tiles.energielabelatlas.nl/v2/osm/{z}/{x}/{y}.png';
let ATTR = 'Kaartgegevens &copy; <a href="cbs.nl">CBS</a>, <a href="kadaster.nl">Kadaster</a>, <a href="openstreetmap.org">OpenStreetMap contributors</a>';


test('nlmaps can populate GM in two-line version', function(t){
  let bgLayer = require('../build/nlmaps-googlemaps.cjs.js')(L);
  t.end();


});

test('nlmaps can create a layer object', function(t) {
  let bgLayer = require('../build/nlmaps-googlemaps.cjs.js')(L);
  let map = L.map(document.createElement('div')).setView([52, 4], 10);
  let foo = bgLayer('osm');
  t.assert(typeof foo === 'object', 'foo layer has been created');
  t.assert(typeof foo.addTo === 'function', 'foo has the addTo method');
  t.doesNotThrow(foo.addTo(map), 'can add the foo layer to the map');
  t.equals(foo._url, URL, 'foos url matches what is expected');
  t.equals(foo.options.attribution, ATTR, 'attribution is correct');
  t.end();
})



