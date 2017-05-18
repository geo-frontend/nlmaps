import getProvider from '../../lib/providers.js';
let URL = 'http://tiles.energielabelatlas.nl/v2/osm';
let ATTR = 'Kaartgegevens &copy; <a href="cbs.nl">CBS</a>, <a href="kadaster.nl">Kadaster</a>, <a href="openstreetmap.org">OpenStreetMap contributors</a>';

function nlmGM(){
map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 52, lng: 5},
  zoom: 8
});
let ElaMap = new google.maps.ImageMapType({
  getTileUrl: function (coord, zoom) {
    let url = `${URL}/${zoom}/${coord.x}/${coord.y}.png`;
    return url;
  },
  tileSize: new google.maps.Size(256, 256),
  isPng: true,
  name: 'ELA',
  maxZoom: 22,
  minZoom: 8
});

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
}
export default nlmGM;
