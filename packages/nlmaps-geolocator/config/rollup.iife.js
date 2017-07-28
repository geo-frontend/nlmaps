import config from './rollup.config';

export default config({
  format: 'iife',
  dest: 'build/nlmaps-geolocator.iife.js',
  browser: true
})
