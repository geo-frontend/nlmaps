import { nlmaps } from '@geo-frontend/nlmaps'

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

nlmaps.createMap(opts)
