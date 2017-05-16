import config from './rollup.config';

export default config({
  format: 'iife',
  dest: 'build/nlmaps-leaflet.iife.js',
  browser: true
})
