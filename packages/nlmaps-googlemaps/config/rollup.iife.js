import config from './rollup.config';

export default config({
  format: 'iife',
  dest: 'build/nlmaps-googlemaps.iife.js',
  browser: true
})
