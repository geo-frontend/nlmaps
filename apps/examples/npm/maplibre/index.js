import maplibregl from 'maplibre-gl'
import { bgLayer, overlayLayer, markerLayer, geocoderControl, geoLocatorControl } from 'nlmaps-maplibre'

import 'maplibre-gl/dist/maplibre-gl.css'

var map = new maplibregl.Map({
  container: 'map-div',
  center: [5, 52],
  style: bgLayer('pastel'),
  zoom: 7
})

map.addControl(
  new maplibregl.NavigationControl({
    showCompass: false
  }),
  'top-left'
)

map.on('load', () => {
  /* eslint-disable no-unused-vars */
  let gemeentekaart = new overlayLayer('gemeenten').addTo(map)
  let marker = new markerLayer({
    longitude: 5.5,
    latitude: 51.5
  }).addTo(map)
  /* eslint-enable no-unused-vars */
  map.addControl(new geocoderControl(), 'top-left')
  map.addControl(new geoLocatorControl())
})
