let test = require('tape');

let nlmGm = require('../build/nlmaps-googlemaps.cjs.js');
module.exports = function  browserTest(){
  test('<script>-included nlmaps-googlemaps can access google.maps', function(t){
    t.assert(typeof nlmGm === 'function', 'imported thing is a function');
    t.assert(typeof google === 'object', 'can access google object from test scope');
    nlmGm();
    t.assert(map.mapTypeId === 'Energielabelatlas', 'google map has Energielabelatlas layer');
    t.end();
  });
}  

