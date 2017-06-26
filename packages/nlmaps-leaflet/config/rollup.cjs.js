import config from './rollup.config';

export default config({
  format: 'cjs',
  dest: 'build/nlmaps-leaflet.cjs.js',
  browser: false
})
