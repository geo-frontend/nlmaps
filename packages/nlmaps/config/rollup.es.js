import config from './rollup.config';

export default config({
  format: 'es',
  dest: 'build/nlmaps.es.js',
  browser: false,
  external: ['nlmaps-googlemaps',
  'nlmaps-leaflet',
  'nlmaps-openlayers'
  ]
})
