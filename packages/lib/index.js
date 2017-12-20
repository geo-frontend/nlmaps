/*parts copied from maps.stamen.com: https://github.com/stamen/maps.stamen.com/blob/master/js/tile.stamen.js
 * copyright (c) 2012, Stamen Design
 * under BSD 3-Clause license: https://github.com/stamen/maps.stamen.com/blob/master/LICENSE
 */
//https://geodata.nationaalgeoregister.nl/tiles/service/wmts/
//https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wmts/
import { geocoder } from './geocoder.js';
import { geolocator_icon, marker_icon, search_icon } from './icons.js';

const lufostring = 'luchtfoto/rgb';
const brtstring = 'tiles/service';
const baseurl = '';
const servicecrs = '/EPSG:3857';
const attr = 'Kaartgegevens &copy; <a href="kadaster.nl">Kadaster</a> | <a href="http://www.verbeterdekaart.nl">verbeter de kaart</a>';
function baseUrl(name) {
  return `https://geodata.nationaalgeoregister.nl/${name === 'luchtfoto' ? lufostring : brtstring}/wmts/`
}

function wmsBaseUrl(workSpaceName) {
  return 'https://geodata.nationaalgeoregister.nl/' + workSpaceName + '/wms?';
}

function mapLayerName(layername){
  let name;
  switch (layername) {
    case 'standaard':
      name = 'brtachtergrondkaart';
      break;
    case 'grijs':
      name = 'brtachtergrondkaartgrijs';
      break;
    case 'pastel' :
      name = 'brtachtergrondkaartpastel';
      break;
    case 'luchtfoto':
      name = '2016_ortho25';
      break;
    default:
      name = 'brtachtergrondkaart';
  }
  return name;
}

function makeProvider(name, format, minZoom, maxZoom) {
  const baseurl =  baseUrl(name);
  const urlname = mapLayerName(name);
  return {
    "bare_url":      [baseurl, urlname, servicecrs].join(""),
    "url":          [baseurl, urlname, servicecrs, "/{z}/{x}/{y}.", format].join(""),
    "format":         format,
    "minZoom":      minZoom,
    "maxZoom":      maxZoom,
    "attribution":  attr,
    "name":         `${name === 'luchtfoto' ? '' : 'NLMaps '} ${name}`
  };
};

const PROVIDERS =  {
  "standaard":    makeProvider("standaard", "png", 6, 19),
  "pastel":       makeProvider("pastel", "png", 6, 19),
  "grijs":        makeProvider("grijs", "png", 6, 19),
  "luchtfoto":    makeProvider("luchtfoto", "jpeg", 6, 19)
};

function mapWmsProvider(name){
  const wmsParameters = {
    workSpaceName: '',
    layerName: '',
    styleName: '',
    url: '',
    minZoom: 0,
    maxZoom: 24,
  };

  switch (name) {
    case 'gebouwen':
      wmsParameters.workSpaceName = 'bag';
      wmsParameters.layerName = 'bag';
      wmsParameters.styleName = '';
      break;
    case 'kadastrale-kaart':
      wmsParameters.workSpaceName = 'kadastralekaartv3';
      wmsParameters.layerName = 'kadastralekaart';
      wmsParameters.styleName = '';
      break;
    case 'drone-no-fly-zone':
      wmsParameters.workSpaceName = 'dronenoflyzones';
      wmsParameters.layerName = 'luchtvaartgebieden';
      wmsParameters.styleName = '';
      break;
    case 'hoogtebestand-nederland':
      wmsParameters.workSpaceName = 'ahn2';
      wmsParameters.layerName = 'ahn2_05m_int';
      wmsParameters.styleName = 'ahn2:ahn2_05m_detail';
      break;
    case 'gemeente-grenzen':
      wmsParameters.workSpaceName = 'bestuurlijkegrenzen';
      wmsParameters.layerName = 'gemeenten';
      wmsParameters.styleName = 'bestuurlijkegrenzen:bestuurlijkegrenzen_gemeentegrenzen';
      break;
    case 'provincie-grenzen':
      wmsParameters.workSpaceName = 'bestuurlijkegrenzen';
      wmsParameters.layerName = 'provincies';
      wmsParameters.styleName = 'bestuurlijkegrenzen:bestuurlijkegrenzen_provinciegrenzen';
      break;
  }

  wmsParameters.url = wmsBaseUrl(wmsParameters.workSpaceName);

  return wmsParameters;
}

function makeWmsProvider(name) {
  const wmsParameters = mapWmsProvider(name);

  return {
    url: wmsParameters.url,
    service: 'WMS',
    version: '1.1.1',
    request: 'GetMap',
    layers: wmsParameters.layerName,
    styles: wmsParameters.styleName,
    transparent: true,
    format: 'image/png',
  }
}

const WMS_PROVIDERS = {
  "gebouwen": makeWmsProvider('gebouwen'),
  "kadastrale-kaart": makeWmsProvider('kadastrale-kaart'),
  "drone-no-fly-zone": makeWmsProvider('drone-no-fly-zone'),
  "hoogtebestand-nederland": makeWmsProvider('hoogtebestand-nederland'),
  "gemeente-grenzen": makeWmsProvider('gemeente-grenzen'),
  "provincie-grenzen": makeWmsProvider('provincie-grenzen')
};

/*
 * Get the named provider, or throw an exception if it doesn't exist.
 **/
function getProvider(name) {
  if (name in PROVIDERS) {
    var provider = PROVIDERS[name];

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
