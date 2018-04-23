import config from './rollup.config';

export default config({
  output: {
    format: 'es',
    file: 'build/nlmaps-geolocator.es.js',
  },
  browser: false
})
