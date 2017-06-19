var bgLayer = (function () {
'use strict';

/*parts copied from maps.stamen.com: https://github.com/stamen/maps.stamen.com/blob/master/js/tile.stamen.js
 * copyright (c) 2012, Stamen Design
 * under BSD 3-Clause license: https://github.com/stamen/maps.stamen.com/blob/master/LICENSE
 */
//https://geodata.nationaalgeoregister.nl/tiles/service/wmts/
//https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wmts/

const lufostring = 'luchtfoto/rgb';
const brtstring = 'tiles/service';
const servicecrs = '/EPSG:3857';
const attr = 'Kaartgegevens &copy; <a href="kadaster.nl">Kadaster</a>';

function baseUrl(name) {
  return `https://geodata.nationaalgeoregister.nl/${name === 'luchtfoto' ? lufostring : brtstring}/wmts/`;
}

function mapLayerName(layername) {
  let name;
  switch (layername) {
    case 'standaard':
      name = 'brtachtergrondkaart';
      break;
    case 'grijs':
      name = 'brtachtergrondkaartgrijs';
      break;
    case 'pastel':
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
  const baseurl = baseUrl(name);
  const urlname = mapLayerName(name);
  return {
    "bare_url": [baseurl, urlname, servicecrs].join(""),
    "url": [baseurl, urlname, servicecrs, "/{z}/{x}/{y}.", format].join(""),
    "format": format,
    "minZoom": minZoom,
    "maxZoom": maxZoom,
    "attribution": attr,
    "name": `${name === 'luchtfoto' ? '' : 'NLMaps '} ${name}`
  };
}

const PROVIDERS = {
  "standaard": makeProvider("standaard", "png", 6, 20),
  "pastel": makeProvider("pastel", "png", 6, 20),
  "grijs": makeProvider("grijs", "png", 6, 20),
  "luchtfoto": makeProvider("luchtfoto", "png", 6, 20)
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
    throw 'No such provider (' + name + ')';
  }
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

if (typeof L !== 'undefined' && (typeof L === 'undefined' ? 'undefined' : _typeof(L)) === 'object') {
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
}

function bgLayer$1(name) {
  if (typeof L !== 'undefined' && (typeof L === 'undefined' ? 'undefined' : _typeof(L)) === 'object') {
    return L.nlmapsBgLayer(name);
  }
}

return bgLayer$1;

}());
