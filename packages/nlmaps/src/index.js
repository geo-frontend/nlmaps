import { bgLayer as bgL } from 'nlmaps-leaflet';
import { bgLayer as bgOL } from 'nlmaps-openlayers';
import { bgLayer as bgGM } from 'nlmaps-googlemaps';
import { getProvider} from '../../lib/index.js';

let nlmaps = {
  leaflet: {
    bgLayer: bgL
  },
  openlayers: {
    bgLayer: bgOL
  },
  googlemaps: {
    bgLayer: bgGM
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

//partial application with map added to this
const partialApply = (fn, mapProxy, name) => {
  let foo = {
    map: mapProxy
  }
  return function () {
      return fn.call(foo, name);
    };
};

nlmaps.createMap = function(useropts = {}) {
  const opts = Object.assign({}, mapdefaults, useropts);
  let lib = testWhichLib();
  try {
  if (lib === 'too many libs' || lib === 'too few libs') {
    throw({message:'one and only one map library can be defined. Please Refer to the documentation to see which map libraries are supported.'});
    return;
  }
  } catch (e) {
    console.error(e.message)
  
  }
  let map = initMap(lib, opts);
  let addLayer = partialApply(nlmaps[lib].bgLayer, map, opts.style);
  let layer = addLayer();
  addLayerToMap(lib, layer, map, opts.style);
  return map;
};

export default nlmaps;
