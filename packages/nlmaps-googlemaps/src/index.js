import { getProvider, geolocator_icon } from '../../lib/index.js';

function AttributionControl(controlDiv, attrControlText) {
  if (typeof google === 'object' && typeof google.maps === 'object') {
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
    controlText.innerHTML = attrControlText;
    controlUI.appendChild(controlText);

    controlDiv.index = 1;
    return controlDiv;
  } else {
    const error = 'google is not defined'; 
    throw error;
  }
}

function geoLocatorControl (geolocator, map){
    let controlUI = document.createElement('div');
    controlUI.id = 'nlmaps-geolocator-control';
    controlUI.innerHTML = geolocator_icon;
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.cursor = 'pointer';
    controlUI.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.65)';
    controlUI.style.height = '26px';
    controlUI.style.width = '26px';
    controlUI.style.borderRadius = '26px 26px';
    controlUI.style.margin = '.5em';
    controlUI.addEventListener( 'click', function(e){
      geolocator.start();
    }, this);
    geolocator.on('position', function(position) {
      map.setCenter({lat:position.coords.latitude,lng:position.coords.longitude});
    })
    return controlUI;
}

function indexOfMapControl(controlArray, control){
  return controlArray.getArray().indexOf(control);
}

function toggleAttrControl(attrControl, map) {
  let currentMapId = map.getMapTypeId();
    let controlArray = map.controls[google.maps.ControlPosition.BOTTOM_RIGHT];
    let indexToRemove = indexOfMapControl(controlArray, attrControl);
    if (currentMapId === 'roadmap' ||currentMapId === 'hybrid' ||currentMapId === 'sattelite'  ) {
      if ( indexToRemove > -1) {
        controlArray.removeAt(indexToRemove);
      }
    } else {
      if ( indexToRemove === -1) {
        controlArray.push(attrControl);
      }
    }
}

function makeGoogleAttrControl(map=map, attr){
    let attrControlDiv = document.createElement('div');
    let attrControlText =  attr ;
    let attrControl = new AttributionControl(attrControlDiv, attrControlText);
    map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(attrControl);
    map.addListener('maptypeid_changed', () => toggleAttrControl(attrControl, map));
}

function makeGoogleLayerOpts(provider){
  return {
    getTileUrl: function (coord, zoom) {
      let url = `${provider.bare_url}/${zoom}/${coord.x}/${coord.y}.png`;
      return url;
    },
    tileSize: new google.maps.Size(256, 256),
    isPng: true,
    name: provider.name,
    maxZoom: provider.maxZoom,
    minZoom: provider.minZoom
  }
}


function bgLayer (map=map, name='standaard') {
  if (typeof google === 'object' && typeof google.maps === 'object') {
    const provider = getProvider(name);
    const GoogleLayerOpts = makeGoogleLayerOpts(provider);
    let layer = new google.maps.ImageMapType(GoogleLayerOpts);
    //warning: tight coupling with nlmaps.createMap
    let ourmap =  map || this.map || undefined;
    if (typeof ourmap !== 'undefined') {
      makeGoogleAttrControl(ourmap, provider.attribution)
    }
    return layer;
  } else {
    const error = 'google is not defined'; 
    throw error;
  }

}

export { bgLayer, geoLocatorControl };
