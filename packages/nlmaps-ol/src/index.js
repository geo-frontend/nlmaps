import { getProvider, getWmsProvider, geocoder, getMarker } from '@geo-frontend/lib'
import Control from 'ol/control/Control.js'
import { fromLonLat, toLonLat } from 'ol/proj.js'
import Feature from 'ol/Feature.js'
import Point from 'ol/geom/Point.js'
import { Icon, Style } from 'ol/style.js'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js'
import View from 'ol/View.js'
import { ImageTile as ImageTileSource, TileWMS as TileWMSSource, Vector as VectorSource } from 'ol/source.js'

function bgLayer(name = 'standaard') {
  const provider = getProvider(name)
  //replace leaflet style subdomain to OL style
  if (provider.subdomains) {
    let sub = provider.subdomains
    provider.url = provider.url.replace('{s}', '{' + sub.slice(0, 1) + '-' + sub.slice(-1) + '}')
  }
  return new TileLayer({
    source: new ImageTileSource({
      attributions: [provider.attribution],
      url: provider.url
    })
  })
}

function markerLayer(latLngObject) {
  let markerStyle = new Style({
    image: new Icon({
      anchor: getMarker().iconAnchor,
      anchorXUnits: 'pixels',
      anchorYUnits: 'pixels',
      src: getMarker().url
    })
  })
  let lat
  let lng
  // eslint-disable-next-line eqeqeq
  if (typeof latLngObject !== 'object') {
    const mapCenter = getMapCenter(map)
    lat = mapCenter.latitude
    lng = mapCenter.longitude
  } else {
    lat = latLngObject.latitude
    lng = latLngObject.longitude
  }

  const center = fromLonLat([lng, lat])

  var markerFeature = new Feature({
    geometry: new Point(center),
    name: 'marker'
  })
  markerFeature.setStyle(markerStyle)

  var markerSource = new VectorSource({
    features: [markerFeature]
  })
  return new VectorLayer({
    source: markerSource
  })
}

function overlayLayer(name, options) {
  const wmsProvider = getWmsProvider(name, options)
  return new TileLayer({
    source: new TileWMSSource({
      url: wmsProvider.url,
      params: {
        LAYERS: wmsProvider.layerName,
        VERSION: wmsProvider.version,
        STYLES: wmsProvider.styleName
      }
    })
  })
}

function geoLocatorControl(geolocator, map) {
  let img = document.createElement('img')
  let myControlEl = document.createElement('div')
  myControlEl.className = 'nlmaps-geolocator-control ol-control'
  myControlEl.appendChild(img)

  myControlEl.addEventListener('click', function () {
    geolocator.start()
  })

  function moveMap(d, map = map) {
    let oldZoom = map.getView().getZoom()
    let view = View({
      center: fromLonLat([d.coords.longitude, d.coords.latitude]),
      zoom: oldZoom
    })
    map.setView(view)
  }
  geolocator.on('position', function (d) {
    moveMap(d, map)
  })
  let control = new Control({ element: myControlEl })
  return control
}

function zoomTo(point, map) {
  const newCenter = fromLonLat(point.coordinates)
  map.getView().setCenter(newCenter)
  map.getView().setZoom(18)
}

function getMapCenter(map) {
  const EPSG3857Coords = map.getView().getCenter()
  const lngLatCoords = toLonLat(EPSG3857Coords)
  return {
    longitude: lngLatCoords[0],
    latitude: lngLatCoords[1]
  }
}

function geocoderControl(map) {
  let control = geocoder.createControl(zoomTo, map)
  control = new Control({ element: control })
  map.addControl(control)
}

export { bgLayer, overlayLayer, markerLayer, getMapCenter, geoLocatorControl, geocoderControl }
