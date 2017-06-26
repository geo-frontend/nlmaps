import { getProvider } from '../../lib';
let baseTileUrl = 'http://tiles.energielabelatlas.nl/v2/osm';
const BRTAkAttr = 'Kaartgegevens &copy; <a href="cbs.nl">CBS</a>, <a href="kadaster.nl">Kadaster</a>, <a href="openstreetmap.org">OpenStreetMap contributors</a>'; 

function bgLayer(name='standaard') {
  const provider = getProvider(name);
  if (typeof ol === "object") {
    return new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: provider.url,
        attributions: [
          new ol.Attribution({
            html: provider.attribution
          })
        ]
      })
    })

  } else {
    throw 'openlayers is not defined';
  }
}

export { bgLayer };
