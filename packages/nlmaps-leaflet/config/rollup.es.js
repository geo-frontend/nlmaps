import config from './rollup.config';

export default config({
  output: {
    format: 'es',
    file: 'build/nlmaps-leaflet.es.js',
  },
  browser: false
})
