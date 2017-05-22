import getProvider from '../../lib/providers.js';

L.NlmapsBgLayer = L.TileLayer.extend({
  initialize: function(name, options) {
    var provider = getProvider(name),
    url = provider.url.replace(/({[A-Z]})/g, function(s) {
      return s.toLowerCase();
    }),
    opts = L.Util.extend({}, options, {
      'minZoom':      provider.minZoom,
      'maxZoom':      provider.maxZoom,
      'subdomains':   provider.subdomains,
      'scheme':       'xyz',
      'attribution':  provider.attribution,
      sa_id:          name
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

function bgLayer(name) {
  return L.nlmapsBgLayer(name)
}


export { bgLayer };
