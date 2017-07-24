let test = require('tape');
let URL = 'http://tiles.energielabelatlas.nl/v2/osm/{z}/{x}/{y}.png';
let ATTR = 'Kaartgegevens &copy; <a href="kadaster.nl">Kadaster</a>';

module.exports = function  browserTest(){
  test('including nlmGm initializes and provides a function to create bglayer', function(t){
    t.assert(typeof bgLayer === 'function', 'imported thing is a function');
    t.assert(typeof google === 'object', 'can access google object from test scope');
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 52, lng: 5},
      zoom: 8
    });
    let ElaMap = bgLayer();


    let mapTypeIds = ['Brt Achtergrondkaart', 'roadmap']
    map.mapTypes.set('Brt Achtergrondkaart', ElaMap);
    map.setOptions({
      mapTypeControl: true,
      mapTypeControlOptions: {
        mapTypeIds: mapTypeIds
      }

    });
    map.setMapTypeId('Brt Achtergrondkaart');
    bgLayer.makeGoogleAttrControl('Kaart van Nederland', map)

    t.end();
  });

  test('error handling if google is not loaded', function(t){
//    google = {};
//    google.maps = 'a string';
//    let errorstring = 'google is not defined';
//    t.throws(bgLayer, errorstring, 'if google has no maps prop bgLayer throws exception');
//    t.end();
  });
}  



