import { getProvider } from '../../lib/index.js';


if (typeof L !== 'undefined' && typeof L === 'object'){
L.NlmapsBgLayer = L.TileLayer.extend({
  initialize: function(name='standaard', options) {
    const provider = getProvider(name);
    const opts = L.Util.extend({}, options, {
      'minZoom':      provider.minZoom,
      'maxZoom':      provider.maxZoom,
      'scheme':       'xyz',
      'attribution':  provider.attribution,
      sa_id:          name
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

function bgLayer(name) {
  if (typeof L !== 'undefined' && typeof L === 'object') {
    return L.nlmapsBgLayer(name)
  }
}

export { bgLayer };
