import maplibregl from 'maplibre-gl'
import {
  bgLayer,
  overlayLayer,
  markerLayer,
  geocoderControl,
  geoLocatorControl,
} from '@geo-frontend/nlmaps-maplibre'

import 'maplibre-gl/dist/maplibre-gl.css'

const map = new maplibregl.Map({
  container: 'map-div',
  center: [5, 52],
  style: bgLayer('pastel'),
  zoom: 7,
})

map.addControl(
  new maplibregl.NavigationControl({
    showCompass: false,
  }),
  'top-left',
)

map.on('load', () => {
  const gemeentekaart = new overlayLayer('gemeenten').addTo(map)
  const marker = new markerLayer({
    longitude: 5.5,
    latitude: 51.5,
  }).addTo(map)

  map.addControl(new geocoderControl(), 'top-left')
  map.addControl(new geoLocatorControl())
})
