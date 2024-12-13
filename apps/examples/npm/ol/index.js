import Map from 'ol/Map.js'
import View from 'ol/View.js'
import { fromLonLat } from 'ol/proj.js'
import { bgLayer, overlayLayer, markerLayer } from 'nlmaps-ol'

import 'ol/ol.css'

const map = new Map({
  target: 'map-div',
  view: new View({
    center: fromLonLat([5.5, 52.5]),
    zoom: 10
  })
})

let layer = bgLayer()
let overlay = overlayLayer('gemeenten')
let marker = markerLayer({ longitude: 5.5, latitude: 52.5 })

map.addLayer(layer)
map.addLayer(overlay)
map.addLayer(marker)
