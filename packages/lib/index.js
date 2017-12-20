/*parts copied from maps.stamen.com: https://github.com/stamen/maps.stamen.com/blob/master/js/tile.stamen.js
 * copyright (c) 2012, Stamen Design
 * under BSD 3-Clause license: https://github.com/stamen/maps.stamen.com/blob/master/LICENSE
 */
//https://geodata.nationaalgeoregister.nl/tiles/service/wmts/
//https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wmts/
import { geocoder } from './geocoder.js';
import { WMS_PROVIDERS } from './wms.js';
import { BASEMAP_PROVIDERS } from './basemap.js';
import { geolocator_icon, marker_icon, search_icon } from './icons.js';


/*
 * Get the named provider, or throw an exception if it doesn't exist.
 **/
function getProvider(name) {
  if (name in BASEMAP_PROVIDERS) {
    var provider = BASEMAP_PROVIDERS[name];

    if (provider.deprecated && console && console.warn) {
      console.warn(name + " is a deprecated style; it will be redirected to its replacement. For performance improvements, please change your reference.");
    }

    return provider;
  } else {
    console.error('NL Maps error: You asked for a style which does not exist! Available styles: ' +  Object.keys(PROVIDERS).join(', '));
  }
};

/*
 * Get the named wmsProvider, or throw an exception if it doesn't exist.
 **/
function getWmsProvider(name) {
  if (name in WMS_PROVIDERS) {
    let wmsProvider = WMS_PROVIDERS[name];

    if (wmsProvider.deprecated && console && console.warn) {
      console.warn(name + " is a deprecated style; it will be redirected to its replacement. For performance improvements, please change your reference.");
    }

    return wmsProvider;
  } else {
    console.error('NL Maps error: You asked for a style which does not exist! Available styles: ' +  Object.keys(WMS_PROVIDERS).join(', '));
  }
};


//use named export instead of default because we might want
//more exports from 'lib' in the future
export { getProvider, getWmsProvider, geolocator_icon, search_icon, marker_icon, geocoder};
