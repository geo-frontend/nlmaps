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

    function AttributionControl(controlDiv) {
      // Set CSS for the control border.
      let controlUI = document.createElement('div');
      controlUI.style.backgroundColor = '#fff';
      controlUI.style.opacity = '0.7';
      controlUI.style.border = '2px solid #fff';
      controlUI.style.cursor = 'pointer';
      controlDiv.appendChild(controlUI);

      // Set CSS for the control interior.
      let controlText = document.createElement('div');
      controlText.style.color = 'rgb(25,25,25)';
      controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
      controlText.style.fontSize = '10px';
      controlText.innerHTML = ATTR;
      controlUI.appendChild(controlText);
      return controlDiv;
    }

    let mapTypeIds = ['Energielabelatlas', 'roadmap']
    map.mapTypes.set('Energielabelatlas', ElaMap);
    map.setOptions({
      mapTypeControl: true,
      mapTypeControlOptions: {
        mapTypeIds: mapTypeIds
      }

    });
    map.setMapTypeId('Energielabelatlas');
    // Create the DIV to hold the control and call the CenterControl()
    // constructor passing in this DIV.
    let centerControlDiv = document.createElement('div');
    let centerControl = new AttributionControl(centerControlDiv, map);

    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(centerControl);

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



