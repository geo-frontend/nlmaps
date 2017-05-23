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

};


function mapLibDefined() {
  if (typeof L === 'object') {
    return 'L';
  
  };
  if (typeof google === 'object' && typeof google.maps === 'object'){
    return 'google.maps';
  }
  if (typeof ol === 'object') {
    return 'ol';
  }
};


function optsForLib(opts, lib) {

};

nlmaps.createMap = function(options) {
  


};

export default nlmaps;
