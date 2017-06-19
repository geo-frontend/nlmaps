import config from './rollup.config';

export default config({
  format: 'es',
  dest: 'build/nlmaps-leaflet.es.js',
  browser: false
})
