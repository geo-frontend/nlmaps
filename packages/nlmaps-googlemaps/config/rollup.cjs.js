import config from './rollup.config';

export default config({
  format: 'cjs',
  dest: 'build/nlmaps-googlemaps.cjs.js',
  browser: false
})
