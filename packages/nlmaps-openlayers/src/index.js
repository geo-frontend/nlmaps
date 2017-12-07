import { getProvider, getWmsProvider, geolocator_icon } from '../../lib';

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
function markerLayer(lat, lng) {
  var markerStyle = new ol.style.Style({
    image: new ol.style.Icon(
      ({
        anchor: [0.5, 0.5],
        src: 'marker_icon.png',
        scale: 0.3
      })
    )
  });

  let center; 
  if (lat != undefined && lng != undefined) {
    center = ol.proj.fromLonLat([lng, lat]);
  } else {
    center = map.getView().getCenter()
  }

  var markerFeature = new ol.Feature({
    geometry: new ol.geom.Point(center),
    name: 'marker'
  });

  markerFeature.setStyle(markerStyle);

  var markerSource = new ol.source.Vector({
    features: [markerFeature]
  });
  return new ol.layer.Vector({
    source: markerSource
  });
}

function overlayLayer(name) {
  const wmsProvider = getWmsProvider(name);
  if (typeof ol === "object") {
    return new ol.layer.Tile({
      source: new ol.source.TileWMS({
        url: wmsProvider.url,
        serverType: 'geoserver',
        params: {
          LAYERS: wmsProvider.layers,
          VERSION: wmsProvider.version,
          STYLES: wmsProvider.styles,
          TILED: true
        }
      })
    })

  } else {
    throw 'openlayers is not defined';
  }
}


function geoLocatorControl(geolocator, map){
  let myControlEl = document.createElement('div');
  myControlEl.id = 'nlmaps-geolocator-control';
  myControlEl.style.backgroundColor = '#fff';
  myControlEl.style.cursor = 'pointer';
  myControlEl.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.65)';
  myControlEl.style.height = '26px';
  myControlEl.style.width = '26px';
  myControlEl.style.borderRadius = '26px 26px';
  myControlEl.innerHTML = geolocator_icon;
  myControlEl.className = 'ol-control';
  myControlEl.style.right = '.5em';
  myControlEl.style.top = '.5em';

  myControlEl.addEventListener('click',function(e){
    geolocator.start();
  })
  function moveMap(d, map=map){
    let oldZoom = map.getView().getZoom();
    let view = new ol.View({
      center: ol.proj.fromLonLat([d.coords.longitude,d.coords.latitude]),
      zoom: oldZoom
    });
    map.setView(view);
  }
  geolocator.on('position', function(d) { moveMap(d, map)});
  let control = new ol.control.Control({element: myControlEl});
  return control;
}

/// Until the building works properly, this is here. Should be in browser-test.js ///
// let map = new ol.Map({
//   view: new ol.View({
//     center: [664197,6838137],
//     zoom: 10
//   }),
//   target: 'map'
// });

// let layer = bgLayer();
// map.addLayer(layer);
// let overlay = overlayLayer('gebouwen')
// map.addLayer(overlay);
// let marker = markerLayer(52,5);
// map.addLayer(marker);

export { bgLayer, overlayLayer, markerLayer, geoLocatorControl };
