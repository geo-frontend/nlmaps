import config from './rollup.config';

export default config({
  format: 'es',
  dest: 'build/nlmaps-openlayers.es.js',
  browser: false
})
