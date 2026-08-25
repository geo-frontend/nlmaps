import Map from 'ol/Map.js'
import View from 'ol/View.js'
import { fromLonLat } from 'ol/proj.js'
import {
  bgLayer,
  geocoderControl,
  geoLocatorControl,
  markerLayer,
  overlayLayer,
} from '@geo-frontend/nlmaps-ol'
import geoLocator from '@geo-frontend/nlmaps-geolocator'

import 'ol/ol.css'

const map = new Map({
  target: 'map-div',
  view: new View({
    center: fromLonLat([5.5, 52.5]),
    zoom: 10,
  }),
})

const layer = bgLayer()
const overlay = overlayLayer('gemeenten')
const marker = markerLayer({ longitude: 5.5, latitude: 52.5 })
const geo = geoLocator()
const geolocator = geoLocatorControl(geo, map)

geocoderControl(map)

map.addLayer(layer)
map.addLayer(overlay)
map.addLayer(marker)
map.addControl(geolocator)
