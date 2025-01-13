import L from 'leaflet'
import { bgLayer, geocoderControl } from 'nlmaps-leaflet'

import 'leaflet/dist/leaflet.css'

var map = L.map('map-div').setView([52, 5], 10)

/* eslint-disable no-unused-vars */
var layer = bgLayer().addTo(map)
var geocoder = geocoderControl(map)
/* eslint-enable no-unused-vars */
