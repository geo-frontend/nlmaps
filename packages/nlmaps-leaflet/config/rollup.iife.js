import config from './rollup.config';

export default config({
  output: {
    format: 'iife',
    file: 'build/nlmaps-leaflet.iife.js',
  },
  browser: true
})
