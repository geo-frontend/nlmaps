import { Map } from 'leaflet'
import { bgLayer, geocoderControl } from '@geo-frontend/nlmaps-leaflet'

import 'leaflet/dist/leaflet.css'

const map = new Map('map-div').setView([52, 5], 10)
map.attributionControl.setPrefix('')

const layer = bgLayer().addTo(map)
const geocoder = geocoderControl(map)
