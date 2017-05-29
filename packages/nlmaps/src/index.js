import { bgLayer as bgL } from '../../nlmaps-leaflet/src/index.js';
import { bgLayer as bgOL } from '../../nlmaps-openlayers/src/index.js';
import { bgLayer as bgGM } from '../../nlmaps-googlemaps/src/index.js';
import { DEFAULT_CLIENT_CONFIGS } from '../../lib/index.js';

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
  layer: 'standaard',
  center: {
    latitude: 52,
    longitude: 5
  },
  zoom: 10
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

nlmaps.createMap = function(useropts = {}) {
  const opts = Object.assign({}, mapdefaults, useropts);
  let lib = testWhichLib();
  if (lib === 'too many libs' || lib === 'too few libs') {
    throw({message:'one and only one map library can be defined.'});
    return;
  }
  let map = initMap(lib, opts);
  nlmaps[lib].bgLayer(opts.layer);
  return map;
};

export default nlmaps;
