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


function isMapDef(name) {

};

nlmaps.createMap = function(options) {
  

};

export default nlmaps;
