import { getProvider, getWmsProvider, geocoder, getMarker } from '../../lib/src'

function bgLayer(name = 'standaard') {
  const provider = getProvider(name)
  //replace leaflet style subdomain to OL style
  if (provider.subdomains) {
    let sub = provider.subdomains
    provider.url = provider.url.replace('{s}', '{' + sub.slice(0, 1) + '-' + sub.slice(-1) + '}')
  }
  if (typeof ol === 'object') {
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
    throw 'openlayers is not defined'
  }
}
function markerLayer(latLngObject) {
  let markerStyle = new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [32, 63],
      anchorXUnits: 'pixels',
      anchorYUnits: 'pixels',
      src: getMarker().url,
      scale: 1
    })
  })
  let lat
  let lng

  // eslint-disable-next-line eqeqeq
  if (typeof latLngObject == 'undefined') {
    const mapCenter = getMapCenter(map)
    lat = mapCenter.latitude
    lng = mapCenter.longitude
  } else {
    lat = latLngObject.latitude
    lng = latLngObject.longitude
  }

  const center = ol.proj.fromLonLat([lng, lat])

  var markerFeature = new ol.Feature({
    geometry: new ol.geom.Point(center),
    name: 'marker'
  })

  markerFeature.setStyle(markerStyle)

  var markerSource = new ol.source.Vector({
    features: [markerFeature]
  })
  return new ol.layer.Vector({
    source: markerSource
  })
}

function overlayLayer(name, options) {
  const wmsProvider = getWmsProvider(name, options)
  if (typeof ol === 'object') {
    return new ol.layer.Tile({
      source: new ol.source.TileWMS({
        url: wmsProvider.url,
        serverType: 'geoserver',
        params: {
          LAYERS: wmsProvider.layerName,
          VERSION: wmsProvider.version,
          STYLES: wmsProvider.styleName
        }
      })
    })
  } else {
    throw 'openlayers is not defined'
  }
}

function geoLocatorControl(geolocator, map) {
  let myControlEl = document.createElement('div')
  myControlEl.className = 'nlmaps-geolocator-control ol-control'

  myControlEl.addEventListener('click', function () {
    geolocator.start()
  })

  function moveMap(d, map = map) {
    let oldZoom = map.getView().getZoom()
    let view = new ol.View({
      center: ol.proj.fromLonLat([d.coords.longitude, d.coords.latitude]),
      zoom: oldZoom
    })
    map.setView(view)
  }
  geolocator.on('position', function (d) {
    moveMap(d, map)
  })
  let control = new ol.control.Control({ element: myControlEl })
  return control
}

function zoomTo(point, map) {
  const newCenter = ol.proj.fromLonLat(point.coordinates)
  map.getView().setCenter(newCenter)
  map.getView().setZoom(18)
}

function getMapCenter(map) {
  const EPSG3857Coords = map.getView().getCenter()
  const lngLatCoords = ol.proj.toLonLat(EPSG3857Coords)
  return {
    longitude: lngLatCoords[0],
    latitude: lngLatCoords[1]
  }
}

function geocoderControl(map, nlmaps) {
  let control = geocoder.createControl(zoomTo, map, nlmaps)
  control = new ol.control.Control({ element: control })
  map.addControl(control)
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
// // let overlay = overlayLayer('gebouwen')
// // map.addLayer(overlay);
// // let marker = markerLayer();
// // map.addLayer(marker);

// const control = geocoder.createControl(zoomTo, map);

// geocoderControl(map);

export { bgLayer, overlayLayer, markerLayer, getMapCenter, geoLocatorControl, geocoderControl }
