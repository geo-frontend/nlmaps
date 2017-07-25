import config from './rollup.config';

export default config({
  format: 'es',
  dest: 'build/nlmaps-geolocator.es.js',
  browser: false
})
