let test = require('tape');


let URL = 'http://tiles.energielabelatlas.nl/v2/osm/{z}/{x}/{y}.png';
let ATTR = 'Kaartgegevens &copy; <a href="cbs.nl">CBS</a>, <a href="kadaster.nl">Kadaster</a>, <a href="openstreetmap.org">OpenStreetMap contributors</a>';


test('nlmaps can populate Leaflet in two-line version', function(t){
  require('../build/nlmaps-leaflet.cjs.js')(L);
  t.assert(typeof L.nlmapsBgLayer === 'function', 'nlmaps has populated property on L');
  t.end()


});
test('nlmaps can populate leaflet in one-line version', function(t){
  t.assert(typeof L === 'object', 'L object created this way');
  t.assert(typeof L.nlmapsBgLayer === 'function', 'nlmaps has populated property on L');
  t.end()

});

test('nlmaps can create a layer object', function(t) {
  let map = L.map('map').setView([52, 5], 10);
  let foo = L.nlmapsBgLayer('osm');
  t.assert(typeof foo === 'object', 'foo layer has been created');
  t.assert(typeof foo.addTo === 'function', 'foo has the addTo method');
  foo.addTo(map);
  t.assert(map.hasLayer(foo), 'map now has layer foo');
  t.equals(foo._url, URL, 'foos url matches what is expected');
  t.equals(foo.options.attribution, ATTR, 'attribution is correct');
  t.end();
})
