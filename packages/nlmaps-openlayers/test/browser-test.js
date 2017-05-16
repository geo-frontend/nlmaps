let test = require('tape');


let URL = 'http://tiles.energielabelatlas.nl/v2/osm/{z}/{x}/{y}.png';
let ATTR = 'Kaartgegevens &copy; <a href="cbs.nl">CBS</a>, <a href="kadaster.nl">Kadaster</a>, <a href="openstreetmap.org">OpenStreetMap contributors</a>';

test('openlayers creation!', function(t){
  let mkoll = require('../build/nlmaps-openlayers.cjs.js');
  mkoll();
  t.end();

});
