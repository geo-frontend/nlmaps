import { Map } from 'leaflet'
import { bgLayer, geoLocatorControl } from '@geo-frontend/nlmaps-leaflet'
import geoLocator from '@geo-frontend/nlmaps-geolocator'

import 'leaflet/dist/leaflet.css'

var map = new Map('map-div').setView([52, 5], 10)
map.attributionControl.setPrefix('')

/* eslint-disable no-unused-vars */
var layer = bgLayer().addTo(map)
/* eslint-enable no-unused-vars */

var geo = geoLocator()
geoLocatorControl(geo).addTo(map)
