let test = require('../../../node_modules/tape-catch');

test('geolocator is cool', function(t){
  t.plan(2)
  const geo = require('../build/nlmaps-geolocator.cjs.js');
  t.assert(typeof geo === 'function');
  t.throws(geo,/geolocation is not available in your browser./,"geolocation isn't available");  
});
