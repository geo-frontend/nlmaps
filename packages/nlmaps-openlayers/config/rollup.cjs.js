import config from './rollup.config';

export default config({
  format: 'cjs',
  dest: 'build/nlmaps-openlayers.cjs.js',
  browser: false
})
