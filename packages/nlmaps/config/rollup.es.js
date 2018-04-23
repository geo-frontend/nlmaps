import config from './rollup.config';

export default config({
  output: {
    format: 'es',
    file: 'build/nlmaps.es.js',
  },
  browser: false,
  external: [
    'nlmaps-googlemaps',
    'nlmaps-leaflet',
    'nlmaps-openlayers'
  ]
})
