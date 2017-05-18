let test = require('tape');
let mkoll = require('../build/nlmaps-openlayers.cjs.js');


let URL = 'http://tiles.energielabelatlas.nl/v2/osm/{z}/{x}/{y}.png';
let ATTR = 'Kaartgegevens &copy; <a href="cbs.nl">CBS</a>, <a href="kadaster.nl">Kadaster</a>, <a href="openstreetmap.org">OpenStreetMap contributors</a>';

test('create layer and add it to the map', function(t){
  let map = new ol.Map({
    view: new ol.View({
      center: [664197,6838137],
      zoom: 10
    }),
    target: 'map'
  });
  let layer = mkoll();
  map.addLayer(layer);
  t.assert(typeof layer === 'object' && map.getLayers().a[0] === layer, 'layer is first entry in map layers list');
  //t.test('can add the returned layer to an openlayers map')
  t.end();

});
