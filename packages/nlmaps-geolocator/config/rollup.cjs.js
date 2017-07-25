import config from './rollup.config';

export default config({
  format: 'cjs',
  dest: 'build/nlmaps-geolocator.cjs.js',
  browser: false
})
