'use strict';

let baseurl = 'http://tiles.energielabelatlas.nl/v2/';
let attr = 'Kaartgegevens &copy; <a href="cbs.nl">CBS</a>, <a href="kadaster.nl">Kadaster</a>, <a href="openstreetmap.org">OpenStreetMap contributors</a>';
let SUBDOMAINS = "a. b. c. d.".split(" ");
let MAKE_PROVIDER = function (layer, type, minZoom, maxZoom) {
  return {
    "url": [baseurl, layer, "/{z}/{x}/{y}.", type].join(""),
    "type": type,
    "subdomains": SUBDOMAINS.slice(),
    "minZoom": minZoom,
    "maxZoom": maxZoom,
    "attribution": attr
  };
};
let PROVIDERS = {
  "osm": MAKE_PROVIDER("osm", "png", 0, 20)
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

function makeLeafletLayer() {
  {
    return function (L) {
      L.NlmapsBgLayer = L.TileLayer.extend({
        initialize: function initialize(name, options) {
          var provider = getProvider(name),
              url = provider.url.replace(/({[A-Z]})/g, function (s) {
            return s.toLowerCase();
          }),
              opts = L.Util.extend({}, options, {
            'minZoom': provider.minZoom,
            'maxZoom': provider.maxZoom,
            'subdomains': provider.subdomains,
            'scheme': 'xyz',
            'attribution': provider.attribution,
            sa_id: name
          });
          L.TileLayer.prototype.initialize.call(this, url, opts);
        }
      });

      /*
       *      * Factory function for consistency with Leaflet conventions
       *           */
      L.nlmapsBgLayer = function (options, source) {
        return new L.NlmapsBgLayer(options, source);
      };
      return L;
    };
  }
}

var index = makeLeafletLayer();

module.exports = index;
