let test = require('tape');

const opts = {
  target: 'mapdiv',
  style: 'grijs'
}

//let Lbk = L;
//let Gbk = google;
//let olbk = ol;

//test('nlmaps.createMap configures leaflet if wrong number of libs', function(t) {;
  //t.throws(nlmaps.createMap.bind(this, opts), 'error if more than one lib defined');
  //L = 'foo'; google = 'foo'; ol = 'foo';
  //t.throws(nlmaps.createMap.bind(this, opts), 'error if no libs defined');
  //L = Lbk; google = Gbk; ol = olbk;
  //t.end();

//});

//test('nlmaps.createMap configures leaflet if its the only one defined',function(t){
  //google = 'foo'; ol = 'foo';
  //t.doesNotThrow(nlmaps.createMap.bind(this, opts), 'with only leaflet defined, no error thrown');
  //google = Gbk; ol = olbk;
  //t.end();
//});
//test('nlmaps.createMap configures openlayers if its the only one defined',function(t){
  //L = 'foo'; google = 'foo';
  //t.doesNotThrow(nlmaps.createMap.bind(this, opts), 'with only openlayers defined, no error thrown');
  //L = Lbk; google = Gbk;
  //t.end();
//});
test('make a map and geolocate it',function(t){
 // ol = 'foo'; L = 'foo';
  //t.doesNotThrow(nlmaps.createMap.bind(this, opts), 'with only googlemaps defined, no error thrown');
  let map = nlmaps.createMap(opts);
  t.assert(typeof map === 'object', 'returns an object');
 // L = Lbk; ol = olbk;
  let watchID = nlmaps.geoLocate(map, {follow: true})

  
  t.end();
});


//test('nlmaps informs if wrong layer style requested', function(t) {
////this test has no assertions.
 //ol = 'foo'; google = 'foo';
 //let opts2 = {style: 'groen', target: 'mapdiv2'};
 //let map = nlmaps.createMap(opts2);
 //t.end();

//});
