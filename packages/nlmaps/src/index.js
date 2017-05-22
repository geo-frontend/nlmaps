import { bgLayer as bgL } from '../../nlmaps-leaflet/src/index.js';
import { bgLayer as bgOL } from '../../nlmaps-openlayers/src/index.js';
import { bgLayer as bgGM } from '../../nlmaps-googlemaps/src/index.js';

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

let opts = {

};


function isMapDef(name) {

};

nlmaps.createMap = function(opts) {
  

};

export default nlmaps;
