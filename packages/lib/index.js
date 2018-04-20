/*parts copied from maps.stamen.com: https://github.com/stamen/maps.stamen.com/blob/master/js/tile.stamen.js
 * copyright (c) 2012, Stamen Design
 * under BSD 3-Clause license: https://github.com/stamen/maps.stamen.com/blob/master/LICENSE
 */
//https://geodata.nationaalgeoregister.nl/tiles/service/wmts/
//https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wmts/
import { CONFIG } from './configParser';
import { geocoder } from './geocoder.js';
import { geolocator_icon, marker_icon, search_icon, markerUrl } from './icons.js';


/*
 * Get the named provider, or throw an exception if it doesn't exist.
 **/
function getProvider(name) {
  if (name in CONFIG.BASEMAP_PROVIDERS) {
    var provider = CONFIG.BASEMAP_PROVIDERS[name];

    // eslint-disable-next-line no-console
    if (provider.deprecated && console && console.warn) {
      // eslint-disable-next-line no-console
      console.warn(name + " is a deprecated style; it will be redirected to its replacement. For performance improvements, please change your reference.");
    }

    return provider;
  } else {
     // eslint-disable-next-line no-console
    console.error('NL Maps error: You asked for a style which does not exist! Available styles: ' +  Object.keys(PROVIDERS).join(', '));
  }
}

/*
 * Get the named wmsProvider, or throw an exception if it doesn't exist.
 **/
function getWmsProvider(name, options) {
  let wmsProvider;
  if (name in CONFIG.WMS_PROVIDERS) {
    wmsProvider = CONFIG.WMS_PROVIDERS[name];

    // eslint-disable-next-line no-console
    if (wmsProvider.deprecated && console && console.warn) {
       // eslint-disable-next-line no-console
      console.warn(name + " is a deprecated wms; it will be redirected to its replacement. For performance improvements, please change your reference.");
    }

  } else {
    wmsProvider = Object.assign({},CONFIG.WMS_DEFAULTS, options);
    // eslint-disable-next-line no-console
    console.log('NL Maps: You asked for a wms which does not exist! Available wmses: ' +  
    Object.keys(CONFIG.WMS_PROVIDERS).join(', ') +  '. Provide an options object to make your own WMS.');
    
  }
  return wmsProvider;  
}

//use featurequery and markers in a chain to create a subscribable marker stream
function markersWithQueryResults() {

}
//use named export instead of default because we might want
//more exports from 'lib' in the future
export { markersWithQueryResults, getProvider, getWmsProvider, geolocator_icon, search_icon, marker_icon, geocoder, markerUrl};
