import config from './rollup.config';

export default config({
  format: 'iife',
  dest: 'build/nlmaps-openlayers.iife.js',
  browser: true
})
