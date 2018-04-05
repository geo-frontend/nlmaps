let tap = require('../../../node_modules/tap')

let URL = 'http://tiles.energielabelatlas.nl/v2/osm/{z}/{x}/{y}.png';
let ATTR = 'Kaartgegevens &copy; <a href="cbs.nl">CBS</a>, <a href="kadaster.nl">Kadaster</a>, <a href="openstreetmap.org">OpenStreetMap contributors</a>';

tap.test('openlayers subpackage can be loaded', function(t) {
  let bgLayer = require('../build/nlmaps-openlayers.cjs.js').bgLayer;
  t.assert(typeof bgLayer === 'function');
  t.end();
})
