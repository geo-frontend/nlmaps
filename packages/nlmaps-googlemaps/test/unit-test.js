let tap = require('../../../node_modules/tap');

tap.test('nlmaps can create a layer object', function(t) {
  let bgLayer = require('../build/nlmaps-googlemaps.cjs.js').bgLayer;
  t.assert(typeof bgLayer === 'function')
  t.end();
})



