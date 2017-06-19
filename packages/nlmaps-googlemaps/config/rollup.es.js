import config from './rollup.config';

export default config({
  format: 'es',
  dest: 'build/nlmaps-googlemaps.es.js',
  browser: false
})
