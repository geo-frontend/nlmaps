import config from './rollup.config';

export default config({
  output: {
    format: 'es',
    file: 'build/nlmaps-googlemaps.es.js',
  },
  browser: false
})
