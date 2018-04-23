import config from './rollup.config';

export default config({
  output: { 
    format: 'es',
    file: 'build/nlmaps-openlayers.es.js',
  },
  browser: false
})
