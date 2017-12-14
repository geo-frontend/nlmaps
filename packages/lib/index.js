/*parts copied from maps.stamen.com: https://github.com/stamen/maps.stamen.com/blob/master/js/tile.stamen.js
 * copyright (c) 2012, Stamen Design
 * under BSD 3-Clause license: https://github.com/stamen/maps.stamen.com/blob/master/LICENSE
 */
//https://geodata.nationaalgeoregister.nl/tiles/service/wmts/
//https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wmts/
import { geocoder } from './geocoder.js';
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


const geolocator_icon = '<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" height="7.0556mm" width="7.0556mm" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" viewBox="0 0 24.999999 24.999999"> <metadata>  <rdf:RDF>   <cc:Work rdf:about="">    <dc:format>image/svg+xml</dc:format>    <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>    <dc:title/>   </cc:Work>  </rdf:RDF> </metadata> <g transform="translate(-151.39 -117.97)">  <g transform="translate(.39250 .85750)">   <path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m163.5 123.27c-3.4931 0-6.3379 2.8448-6.3379 6.3379s2.8448 6.3398 6.3379 6.3398 6.3379-2.8467 6.3379-6.3398-2.8448-6.3379-6.3379-6.3379zm0 1.3008c2.7905 0 5.0391 2.2466 5.0391 5.0371s-2.2485 5.0391-5.0391 5.0391c-2.7905 0-5.0391-2.2485-5.0391-5.0391 0-2.7905 2.2485-5.0371 5.0391-5.0371z"/>   <circle cx="163.5" cy="129.61" r="1.9312" style="fill:#191919"/>   <path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m162.85 120.57v3.3555h1.3008v-3.3555h-1.3008z"/>   <path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m162.85 135.3v3.3555h1.3008v-3.3555h-1.3008z"/>   <path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m154.46 128.96v1.2988h3.3535v-1.2988h-3.3535z"/>   <path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;shape-rendering:auto;solid-color:#000000;text-decoration-line:none;fill:#191919;fill-rule:evenodd;mix-blend-mode:normal;block-progression:tb;text-indent:0;image-rendering:auto;white-space:normal;text-decoration-style:solid;isolation:auto;text-transform:none" d="m169.19 128.96v1.2988h3.3535v-1.2988h-3.3535z"/>  </g> </g></svg>'
const search_icon = `<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 15.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="2437.799px" height="6122.84px" viewBox="0 0 2437.799 6122.84" enable-background="new 0 0 2437.799 6122.84"
	 xml:space="preserve">
<path d="M2379.715,4202.398l-683.896-711.236c174.438-174.943,282.506-416.118,282.506-682.102
	c0-532.978-433.563-966.541-966.541-966.541c-532.978,0-966.54,433.563-966.54,966.541c0,532.979,433.563,966.541,966.54,966.541
	c233.949,0,448.659-83.629,616.009-222.396l685.554,712.984c9.021,9.436,21.08,14.131,33.185,14.131
	c11.507,0,22.967-4.281,31.896-12.842C2396.744,4249.851,2397.297,4220.717,2379.715,4202.398z M1011.783,3683.55
	c-482.211,0-874.488-392.277-874.488-874.489s392.277-874.489,874.488-874.489c482.212,0,874.49,392.277,874.49,874.489
	S1493.949,3683.55,1011.783,3683.55z"/>
</svg>`

//use named export instead of default because we might want
//more exports from 'lib' in the future
export { getProvider, getWmsProvider, geolocator_icon, search_icon, cross_icon, geocoder};
