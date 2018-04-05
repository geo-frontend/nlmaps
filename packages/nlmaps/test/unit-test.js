let tap = require('../../../node_modules/tap');


//makeMap should be default?
tap.test('top-level nlmaps package exports makeMap, leaflet, googlemaps and openlayers', function(t){
  let nlmaps = require('../build/nlmaps.cjs.js').nlmaps;
  t.assert(typeof nlmaps.createMap === 'function');
  t.assert(typeof nlmaps.leaflet === 'object');
  t.assert(typeof nlmaps.googlemaps === 'object');
  t.assert(typeof nlmaps.openlayers === 'object');
  t.assert(typeof nlmaps.geoLocate === 'function');
  t.end();

});
