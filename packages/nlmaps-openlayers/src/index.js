import getProvider from '../../lib/providers.js';
let baseTileUrl = 'http://tiles.energielabelatlas.nl/v2/osm';
const BRTAkAttr = 'Kaartgegevens &copy; <a href="cbs.nl">CBS</a>, <a href="kadaster.nl">Kadaster</a>, <a href="openstreetmap.org">OpenStreetMap contributors</a>'; 

function makeOpenLayersLayer() {
  if (typeof ol === "object") {
    return new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: `${baseTileUrl}/{z}/{x}/{y}.png`,
        attributions: [
          new ol.Attribution({
            html: BRTAkAttr
          })
        ]
      })
    })

  }
}

export default makeOpenLayersLayer;
