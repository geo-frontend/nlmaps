import { Map } from 'leaflet'
import { bgLayer, geocoderControl } from 'nlmaps-leaflet'

import 'leaflet/dist/leaflet.css'

var map = new Map('map-div').setView([52, 5], 10)
map.attributionControl.setPrefix('')

/* eslint-disable no-unused-vars */
var layer = bgLayer().addTo(map)
var geocoder = geocoderControl(map)
/* eslint-enable no-unused-vars */
