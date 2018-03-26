import config from './rollup.config';

export default config({
  output: {
    format: 'iife',
    file: 'build/nlmaps-openlayers.iife.js',
  },
  fileser: true
})  
