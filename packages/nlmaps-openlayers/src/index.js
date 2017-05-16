import getProvider from '../../lib/providers.js';

function makeOpenLayersLayer() {
  if (typeof ol === "object") {

    // based on http://www.bostongis.com/PrinterFriendly.aspx?content_name=using_custom_osm_tiles
    ol.Layer.nlmapsBgLayer = ol.Class(ol.Layer.OSM, {
      initialize: function(name, options) {
        var provider = getProvider(name),
        url = provider.url,
        subdomains = provider.subdomains,
        hosts = [];
        hosts.push(url);
        var options = OpenLayers.Util.extend({
        "numZoomLevels":        provider.maxZoom,
        "buffer":               0,
        "transitionEffect":     "resize",
        // see: <http://dev.openlayers.org/apidocs/files/OpenLayers/Layer/OSM-js.html#OpenLayers.Layer.OSM.tileOptions>
        // and: <http://dev.openlayers.org/apidocs/files/OpenLayers/Tile/Image-js.html#OpenLayers.Tile.Image.crossOriginKeyword>
        "tileOptions": {
          "crossOriginKeyword": null
        },
        "attribution": provider.attribution
      }, options);
      return ol.Layer.OSM.prototype.initialize.call(this, name, hosts, options);
    }
  });
}
}


export default makeOpenLayersLayer;
