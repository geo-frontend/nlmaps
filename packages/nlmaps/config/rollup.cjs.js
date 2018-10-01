import config from './rollup.config';

export default config({
  output: {
    format: 'cjs',
    file: 'build/nlmaps.cjs.js',
  },
  browser: false,
  external: [
    'nlmaps-googlemaps',
    'nlmaps-leaflet',
    'nlmaps-openlayers'
  ]
})
