let baseurl = 'http://tiles.energielabelatlas.nl/v2/';
let attr = 'Kaartgegevens &copy; <a href="cbs.nl">CBS</a>, <a href="kadaster.nl">Kadaster</a>, <a href="openstreetmap.org">OpenStreetMap contributors</a>';
let SUBDOMAINS = "a. b. c. d.".split(" ");
let MAKE_PROVIDER = function(layer, type, minZoom, maxZoom) {
  return {
    "url":          [baseurl, layer, "/{z}/{x}/{y}.", type].join(""),
    "type":         type,
    "subdomains":   SUBDOMAINS.slice(),
    "minZoom":      minZoom,
    "maxZoom":      maxZoom,
    "attribution":    attr
  };
};
let PROVIDERS =  {
  "osm":        MAKE_PROVIDER("osm", "png", 0, 20)
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
};
export default getProvider;
