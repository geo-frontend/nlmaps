let test = require('tape');


let URL = 'http://tiles.energielabelatlas.nl/v2/osm/{z}/{x}/{y}.png';
let ATTR = 'Kaartgegevens &copy; <a href="cbs.nl">CBS</a>, <a href="kadaster.nl">Kadaster</a>, <a href="openstreetmap.org">OpenStreetMap contributors</a>';

test('including nlmaps-leaflet creates a bgLayer function', function(t){
  t.assert(typeof bgLayer === 'function', 'bgLayer is a function');
  t.end()

});

test('nlmaps can create a layer object', function(t) {
  let map = L.map('map').setView([52, 5], 10);
  let foo = bgLayer('osm');
  t.assert(typeof foo === 'object', 'foo layer has been created');
  t.assert(typeof foo.addTo === 'function', 'foo has the addTo method');
  foo.addTo(map);
  t.assert(map.hasLayer(foo), 'map now has layer foo');
  t.equals(foo._url, URL, 'foos url matches what is expected');
  t.equals(foo.options.attribution, ATTR, 'attribution is correct');
  t.end();
})
