'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const baseurl = 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts/brtachtergrondkaart';
const servicecrs = '/EPSG:3857';
const attr = 'Kaartgegevens &copy; <a href="kadaster.nl">Kadaster</a>';
const SUBDOMAINS = "a. b. c. d.".split(" ");
let MAKE_PROVIDER = function (layer, format, minZoom, maxZoom) {
  return {
    "url": [baseurl, mapLayerName$1(layer), servicecrs, "/{z}/{x}/{y}.", format].join(""),
    "type": format,
    "subdomains": SUBDOMAINS.slice(),
    "minZoom": minZoom,
    "maxZoom": maxZoom,
    "attribution": attr
  };
};
let PROVIDERS = {
  "standaard": MAKE_PROVIDER("standaard", "png", 6, 20),
  "pastel": MAKE_PROVIDER("pastel", "png", 6, 20),
  "grijs": MAKE_PROVIDER("grijs", "png", 6, 20)
};

function mapLayerName$1(layername) {
  let name;
  switch (layername) {
    case 'standaard':
      name = '';
      break;
    case 'grijs':
      name = 'grijs';
      break;
    case 'pastel':
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
}

function baseUrl(layername) {
  return `https://geodata.nationaalgeoregister.nl/tiles/service/wmts/brtachtergrondkaart${mapLayerName(layername)}/EPSG:3857/`;
}

const config = {
  a: 'a',
  b: 'b'
};

L.NlmapsBgLayer = L.TileLayer.extend({
  initialize: function initialize() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'standaard';
    var options = arguments[1];

    var provider = getProvider(name);
    var opts = L.Util.extend({}, options, {
      'minZoom': provider.minZoom,
      'maxZoom': provider.maxZoom,
      'subdomains': provider.subdomains,
      'scheme': 'xyz',
      'attribution': provider.attribution,
      sa_id: name
    });
    L.TileLayer.prototype.initialize.call(this, provider.url, opts);
  }
});
/*
 *      * Factory function for consistency with Leaflet conventions
 *           */
L.nlmapsBgLayer = function (options, source) {
  return new L.NlmapsBgLayer(options, source);
};

function bgLayer(name) {
  return L.nlmapsBgLayer(name);
}

exports.bgLayer = bgLayer;
