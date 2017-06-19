import config from './rollup.config';

export default config({
  format: 'cjs',
  dest: 'build/nlmaps.cjs.js',
  browser: false,
  external: [
    'nlmaps-googlemaps',
    'nlmaps-leaflet',
    'nlmaps-openlayers'
  ]
})
