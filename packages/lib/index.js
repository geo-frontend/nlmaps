import getProvider from './providers.js';


//default client configurations that top-level module can use to configure sub-modules.
const DEFAULT_CLIENT_CONFIGS = {
  layername: 'standaard',
  view: {
    zoom: 11,
    coords: {
      lat: 52,
      lon: 5
    }
  },
  map: {
    target: 'map'
  },
  L: {},
  OL: {},
  GM: {}
};

export {DEFAULT_CLIENT_CONFIGS, getProvider};
