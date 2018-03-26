import config from './rollup.config';

export default config({
  output: {
    format: 'cjs',
    file: 'build/nlmaps-leaflet.cjs.js',
  },
  browser: false
})
