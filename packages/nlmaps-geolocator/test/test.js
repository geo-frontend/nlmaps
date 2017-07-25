let test = require('../../../node_modules/tap').test;
let geoLocator = require('../build/nlmaps-geolocator.cjs.js');


//makeMap should be default?
test('something interesting', function(t){
  let navigator = {};
  t.throws(geoLocator(), 'geolocation is not available in your browser.')
  t.end()

});
