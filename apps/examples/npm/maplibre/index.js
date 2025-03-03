/* eslint-disable no-unused-vars */
import maplibregl from 'maplibre-gl'
/* eslint-enable no-unused-vars */
import { bgLayer, overlayLayer } from 'nlmaps-maplibre'

import 'maplibre-gl/dist/maplibre-gl.css'

var map = new maplibregl.Map({
  container: 'map-div',
  center: [5, 52],
  style: bgLayer('pastel'),
  zoom: 10
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
  /* eslint-enable no-unused-vars */
})
