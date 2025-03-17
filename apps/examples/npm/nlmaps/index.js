/* eslint-disable no-unused-vars */
import maplibregl from 'maplibre-gl'
/* eslint-enable no-unused-vars */
import { nlmaps } from '@geo-frontend/nlmaps'
import 'maplibre-gl/dist/maplibre-gl.css'

var opts = {
  style: 'standaard',
  target: 'map-div',
  center: {
    longitude: 5.9699,
    latitude: 52.2112
  },
  overlay: 'false',
  marker: false,
  search: false,
  zoom: 10
}

/* eslint-disable no-unused-vars */
var map = nlmaps.createMap(opts)
/* eslint-enable no-unused-vars */
