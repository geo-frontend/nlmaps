let test = require('../../../node_modules/tape-catch');

test('OpenLayers subpackage functions are defined', function(t) {
  t.plan(6);
  let nlmapsOL = require('../build/nlmaps-openlayers.cjs.js');
  t.equal(typeof nlmapsOL.bgLayer , 'function');
  t.equal(typeof nlmapsOL.overlayLayer , 'function');
  t.equal(typeof nlmapsOL.markerLayer , 'function');
  t.equal(typeof nlmapsOL.getMapCenter , 'function');
  t.equal(typeof nlmapsOL.geoLocatorControl , 'function');
  t.equal(typeof nlmapsOL.geocoderControl , 'function');
});