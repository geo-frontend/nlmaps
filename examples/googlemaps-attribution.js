/*Example of adding an attribution control to a Google Maps map*/

//this part we saw in ../README.md
let map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 52.20936, lng: 5.970745},
  zoom: 8
});

let mylayer = nlmaps.openlayers.bgLayer('pastel');

//add your map to the available layers
map.mapTypes.set(mylayer.name, mylayer);
//set it as active layer
map.setMapTypeId(mylayer.name);

//add control for switching between layers
let mapTypeIds = [mylayer.name, 'roadmap']
map.setOptions({
  mapTypeControl: true,
  mapTypeControlOptions: {
    mapTypeIds: mapTypeIds
  }

});

//now add an attribution control.
//in real life you might add CSS classes instead of setting the style here.
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

let attrControllDiv = document.createElement('div');
let attrControl = new AttributionControl(attrControlDiv, map);

centerControlDiv.index = 1;
map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(attrControl);
