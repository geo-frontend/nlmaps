let test = require('../../../node_modules/tape-catch');

test('google maps functions', function(t) {
  t.plan(6)
  let gmaps = require('../build/nlmaps-googlemaps.cjs.js');
  t.equal(typeof gmaps.bgLayer, 'function', 'bgLayer is a function')
  t.equal(typeof gmaps.overlayLayer, 'function', 'overlayLayer is a function')
  t.equal(typeof gmaps.markerLayer, 'function', 'markerLayer is a function')
  t.equal(typeof gmaps.getMapCenter, 'function', 'getMapCenter is a function')
  t.equal(typeof gmaps.geoLocatorControl, 'function', 'geoLocatorControl is a function')
  t.equal(typeof gmaps.geocoderControl, 'function', 'geocoderControl is a function')  
  t.end();
})



