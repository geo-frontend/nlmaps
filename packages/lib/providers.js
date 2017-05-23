/*parts copied from maps.stamen.com: https://github.com/stamen/maps.stamen.com/blob/master/js/tile.stamen.js
 * copyright (c) 2012, Stamen Design
 * under BSD 3-Clause license: https://github.com/stamen/maps.stamen.com/blob/master/LICENSE
 */
const baseurl = 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts/brtachtergrondkaart';
const servicecrs = '/EPSG:3857';
const attr = 'Kaartgegevens &copy; <a href="kadaster.nl">Kadaster</a>';
const SUBDOMAINS = "a. b. c. d.".split(" ");
let makeProvider = function(name, format, minZoom, maxZoom) {
  const urlname = mapLayerName(name);
  return {
    "bare_url":      [baseurl, urlname, servicecrs].join(""),
    "url":          [baseurl, urlname, servicecrs, "/{z}/{x}/{y}.", format].join(""),
    "format":         format,
    "subdomains":   SUBDOMAINS.slice(),
    "minZoom":      minZoom,
    "maxZoom":      maxZoom,
    "attribution":  attr,
    "name":         `BRT Achtergrondkaart ${name}`
  };
};
let PROVIDERS =  {
  "standaard":    makeProvider("standaard", "png", 6, 20),
  "pastel":       makeProvider("pastel", "png", 6, 20),
  "grijs":        makeProvider("grijs", "png", 6, 20)
};


function mapLayerName(layername){
  let name;
  switch (layername) {
    case 'standaard':
      name = '';
      break;
    case 'grijs':
      name = 'grijs';
      break;
    case 'pastel' :
      name = 'pastel';
      break;
    default:
      name = '';
  }
  return name;
}

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
    throw 'No such provider (' + name + ')';
  }
};
export default getProvider;
