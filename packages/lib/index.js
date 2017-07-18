/*parts copied from maps.stamen.com: https://github.com/stamen/maps.stamen.com/blob/master/js/tile.stamen.js
 * copyright (c) 2012, Stamen Design
 * under BSD 3-Clause license: https://github.com/stamen/maps.stamen.com/blob/master/LICENSE
 */
//https://geodata.nationaalgeoregister.nl/tiles/service/wmts/
//https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wmts/

const lufostring = 'luchtfoto/rgb';
const brtstring = 'tiles/service';
const baseurl = '';
const servicecrs = '/EPSG:3857';
const attr = 'Kaartgegevens &copy; <a href="kadaster.nl">Kadaster</a>';
const verbeterDeKaartStr = '<a href="http://www.verbeterdekaart.nl">verbeter de kaart</a>';
function baseUrl(name) {
  return `https://geodata.nationaalgeoregister.nl/${name === 'luchtfoto' ? lufostring : brtstring}/wmts/`

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


/*
 *  * Get the named provider, or throw an exception if it doesn't exist.
 *   */
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

//use named export instead of default because we might want
//more exports from 'lib' in the future
export { getProvider, verbeterDeKaartStr };
