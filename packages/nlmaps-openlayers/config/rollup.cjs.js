import config from './rollup.config';

export default config({
  output: {
    format: 'cjs',
    file: 'build/nlmaps-openlayers.cjs.js',
  },
  browser: false
})
