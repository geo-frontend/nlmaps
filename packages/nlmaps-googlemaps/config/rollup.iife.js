import config from './rollup.config';

export default config({
  output: {
    format: 'iife',
    file: 'build/nlmaps-googlemaps.iife.js',
  },
  browser: true
})
