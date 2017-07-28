import { bgLayer as bgL, geoLocatorControl as glL } from 'nlmaps-leaflet';
import { bgLayer as bgOL, geoLocatorControl as glO } from 'nlmaps-openlayers';
import { bgLayer as bgGM, geoLocatorControl as glG } from 'nlmaps-googlemaps';
import { getProvider} from '../../lib/index.js';
import geoLocator from '../../nlmaps-geolocator/src/index.js';

let nlmaps = {
  leaflet: {
    bgLayer: bgL,
    geoLocatorControl: glL
  },
  openlayers: {
    bgLayer: bgOL,
    geoLocatorControl: glO
  },
  googlemaps: {
    bgLayer: bgGM,
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

function createLayer(lib,  map, name) {
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


function mergeOpts(defaultopts, useropts){
   return Object.assign({}, defaultopts, useropts);

}

nlmaps.lib = testWhichLib();

nlmaps.createMap = function(useropts = {}) {
  const opts = mergeOpts(mapdefaults, useropts);
  try {
  if (nlmaps.lib === 'too many libs' || nlmaps.lib === 'too few libs') {
    throw({message:'one and only one map library can be defined. Please Refer to the documentation to see which map libraries are supported.'});
    return;
  }
  } catch (e) {
    console.error(e.message)
  
  }
  let map = initMap(nlmaps.lib, opts);
  let layer = createLayer(nlmaps.lib, map, opts.style);
  addLayerToMap(nlmaps.lib, layer, map, opts.style);
  return map;
};

const geoLocateDefaultOpts = {
  follow: false
}

function addGeoLocControlToMap(lib, geolocator, map){
  let control;
  switch (lib) {
    case 'leaflet':
      nlmaps[lib].geoLocatorControl(geolocator).addTo(map);  
      break;
    case 'googlemaps':
      control = nlmaps[lib].geoLocatorControl(geolocator, map)
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(control);
      break;
    case 'openlayers':
      control = nlmaps[lib].geoLocatorControl(geolocator,map);
      map.addControl(control)

      break;

  }

}


nlmaps.geoLocate = function(map, useropts = {}){
  const opts = mergeOpts(geoLocateDefaultOpts, useropts);
  const geolocator = geoLocator(opts);
  console.log('oh hai')
  addGeoLocControlToMap(nlmaps.lib, geolocator, map);
  //
}

export default nlmaps;
