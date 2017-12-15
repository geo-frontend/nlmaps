
import { bgLayer as bgL, 
         overlayLayer as overlayL, 
         markerLayer as markerL, 
         getMapCenter as centerL,
         geocoderControl as geocoderL,
         geoLocatorControl as glL } from '../../nlmaps-leaflet/build/nlmaps-leaflet.cjs.js';

import { bgLayer as bgOL, 
         overlayLayer as overlayOL, 
         markerLayer as markerOL, 
         getMapCenter as centerOL,
         geocoderControl as geocoderOL,
         geoLocatorControl as glO } from '../../nlmaps-openlayers/build/nlmaps-openlayers.cjs.js';

import { bgLayer as bgGM, 
         overlayLayer as overlayGM, 
         markerLayer as markerGM, 
         getMapCenter as centerGM,
         geoLocatorControl as glG } from '../../nlmaps-googlemaps/build/nlmaps-googlemaps.cjs.js';

// import { bgLayer as bgL, geoLocatorControl as glL } from 'nlmaps-leaflet';

// import { bgLayer as bgOL, 
//          geoLocatorControl as glO } from 'nlmaps-openlayers';

// import { bgLayer as bgGM, 
//          geoLocatorControl as glG } from 'nlmaps-googlemaps';

import { getProvider, geocoder } from '../../lib/index.js';
import geoLocator from '../../nlmaps-geolocator/src/index.js';

let nlmaps = {
  leaflet: {
    bgLayer: bgL,
    overlayLayer: overlayL,
    markerLayer: markerL,
    geocoderControl: geocoderL,
    geoLocatorControl: glL
  },
  openlayers: {
    bgLayer: bgOL,
    overlayLayer: overlayOL,
    markerLayer: markerOL,
    geocoderControl: geocoderOL,
    geoLocatorControl: glO
  },
  googlemaps: {
    bgLayer: bgGM,
    overlayLayer: overlayGM,
    markerLayer: markerGM,
    geoLocatorControl: glG
  }
};

let mapdefaults = {
  style: 'standaard',
  center: {
    latitude: 51.9984,
    longitude: 4.996
  },
  zoom: 8,
  attribution: true
};

//for future use
const geoLocateDefaultOpts = {
}

function testWhichLib() {
  let defined = [];
  if (typeof L === 'object') {
    defined.push('leaflet');
  }
  if (typeof google === 'object' && typeof google.maps === 'object'){
    defined.push('googlemaps');
  }
  if (typeof ol === 'object') {
    defined.push('openlayers');
  }
  if( defined.length > 1 ) {
    return 'too many libs';
  } else if ( defined.length === 0 ) {
    return 'too few libs';
  } else {
    return defined[0];
  }
};

function initMap(lib, opts){
  let map;
  switch (lib) {
    case 'leaflet':
      map = L.map(opts.target).setView([opts.center.latitude, opts.center.longitude], opts.zoom);
      break;
    case 'googlemaps':
      map = new google.maps.Map(document.getElementById(opts.target), {
        center: {lat: opts.center.latitude, lng: opts.center.longitude},
        zoom: opts.zoom
      });
      break;
    case 'openlayers':
      map = new ol.Map({
        view: new ol.View({
          center: ol.proj.fromLonLat([opts.center.longitude, opts.center.latitude]),
          zoom: opts.zoom
        }),
        target: opts.target
      });
  }
  return map;
};

//can set center, with optional zoom.
function setMapLoc(lib, opts, map) {
  switch (lib) {
    case 'leaflet':
      map.panTo([opts.lat,opts.lon]);
      if (opts.zoom){map.setZoom(opts.zoom)}
      break;
    case 'googlemaps':
      map.setCenter({lat: opts.lat,lng:opts.lon});
      if (opts.zoom) {map.setZoom(opts.zoom)}
      break;
    case 'openlayers':
      let oldZoom = map.getView().getZoom();
      let view = new ol.View({
          center: ol.proj.fromLonLat([opts.lon,opts.lat]),
          zoom: opts.zoom? opts.zoom: oldZoom
        });
      map.setView(view);
    }
}


function addGoogleLayer(layer, map, name) {
  // Markers are not considered to be a layer in google maps. Therefore, they must be added differently. 
  // It is important that a layer has the title 'marker' in order to be recognized as a layer.
  if (layer.title == 'marker') {
    layer.setMap(map);
    return;
  }
  let mapTypeIds = [layer.name, 'roadmap']
  map.setOptions({
    mapTypeControl: true,
    mapTypeControlOptions: {
      mapTypeIds: mapTypeIds
    }
  });

  map.mapTypes.set(layer.name, layer);
  map.setMapTypeId(layer.name);
}

function addLayerToMap(lib, layer, map, name) {
  switch (lib) {
    case 'leaflet':
      map.addLayer(layer);
      break;
    case 'googlemaps':
      addGoogleLayer(layer, map, name);
      break;
    case 'openlayers':
      map.addLayer(layer);
      break;
  }
}
function createBackgroundLayer(lib,  map, name) {
  switch (lib) {
    case 'leaflet':
      return nlmaps.leaflet.bgLayer(name);
      break;
    case 'googlemaps':
      return nlmaps.googlemaps.bgLayer(map, name)
      break;
    case 'openlayers':
      return nlmaps.openlayers.bgLayer(name);
      break;
  }
}

function createOverlayLayer(lib, map, name) {
  switch (lib) {
    case 'leaflet':
      return nlmaps.leaflet.overlayLayer(name);
      break;
    case 'googlemaps':
      return nlmaps.googlemaps.overlayLayer(map, name);
      break;
    case 'openlayers':
      return nlmaps.openlayers.overlayLayer(name);
      break;
  }
}

function createMarkerLayer(lib, map, latLngArray) {
  const lat = latLngArray[0];
  const lng = latLngArray[1];
  
  switch (lib) {
    case 'leaflet': 
      return nlmaps.leaflet.markerLayer(lat, lng);
      break;
    case 'googlemaps': 
      return nlmaps.googlemaps.markerLayer(lat, lng);
      break;
    case 'openlayers':
      return nlmaps.openlayers.markerLayer(lat, lng);
      break;
  }
}

function getMapCenter(lib, map) {
  switch (lib) {
    case 'leaflet': 
      return centerL(map);
      break;
    case 'googlemaps': 
      return centerGM(map);
      break;
    case 'openlayers':
      return centerOL(map);
      break;
  }
}

function mergeOpts(defaultopts, useropts){
   return Object.assign({}, defaultopts, useropts);
}

nlmaps.lib = testWhichLib();

nlmaps.createMap = function(useropts = {}) {
  const opts = mergeOpts(mapdefaults, useropts);
  try {
  if (nlmaps.lib === 'too many libs' || nlmaps.lib === 'too few libs') {
    throw({message:'one and only one map library can be defined. Please Refer to the documentation to see which map libraries are supported.'});
  }
  } catch (e) {
    console.error(e.message)
  }
  const map = initMap(nlmaps.lib, opts);
  // Background layer
  const backgroundLayer = createBackgroundLayer(nlmaps.lib, map, opts.style);
  addLayerToMap(nlmaps.lib, backgroundLayer, map, opts.style);

  // Overlay layer
  if (opts.overlay) {
    const overlayLayer = createOverlayLayer(nlmaps.lib, map, opts.overlay);
    addLayerToMap(nlmaps.lib, overlayLayer, map);
  }

  // Marker layer
  if (opts.marker) {
    let markerLocation = opts.marker;
    if (typeof opts.marker === "boolean") {
      markerLocation = getMapCenter(nlmaps.lib, map);
    }
    const markerLayer = createMarkerLayer(nlmaps.lib, map, markerLocation);
    addLayerToMap(nlmaps.lib, markerLayer, map);
  }

  // Geocoder
  addGeocoderControlToMap(nlmaps.lib, geocoder, map);
  return map;
};

function addGeoLocControlToMap(lib, geolocator, map){
  let control;
  switch (lib) {
    case 'leaflet':
      nlmaps[lib].geoLocatorControl(geolocator).addTo(map);  
      break;
    case 'googlemaps':
      control = nlmaps[lib].geoLocatorControl(geolocator, map)
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(control);
      break;
    case 'openlayers':
      control = nlmaps[lib].geoLocatorControl(geolocator,map);
      map.addControl(control);
      break;
  }
}

function addGeocoderControlToMap(lib, geocoder, map){
  switch (lib) {
    case 'leaflet':
      nlmaps[lib].geocoderControl(geocoder).addTo(map);  
      break;
    case 'googlemaps':
      throw Error('not yet implemented googlemaps');
      break;
    case 'openlayers':
      const control = nlmaps[lib].geocoderControl(geocoder, map);
      map.addControl(control);
      break;
  }
}

nlmaps.geoLocate = function(map, useropts = {}){
  const opts = mergeOpts(geoLocateDefaultOpts, useropts);
  const geolocator = geoLocator(opts);
  addGeoLocControlToMap(nlmaps.lib, geolocator, map);
}

export default nlmaps;
