import { Map } from 'leaflet'
import { bgLayer, geoLocatorControl } from '@geo-frontend/nlmaps-leaflet'
import geoLocator from '@geo-frontend/nlmaps-geolocator'

import 'leaflet/dist/leaflet.css'

const map = new Map('map-div').setView([52, 5], 10)
map.attributionControl.setPrefix('')

bgLayer().addTo(map)

const geo = geoLocator()
geoLocatorControl(geo).addTo(map)
