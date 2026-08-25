import maplibregl from 'maplibre-gl'

import { nlmaps } from '@geo-frontend/nlmaps'
import 'maplibre-gl/dist/maplibre-gl.css'

const opts = {
  style: 'standaard',
  target: 'map-div',
  center: {
    longitude: 5.9699,
    latitude: 52.2112,
  },
  overlay: 'false',
  marker: false,
  search: false,
  zoom: 10,
}

const map = nlmaps.createMap(opts)
