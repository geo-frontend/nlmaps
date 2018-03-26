import config from './rollup.config';

export default config({
  output: {
    format: 'iife',
    file: 'build/nlmaps-geolocator.iife.js',
  },
  browser: true
})
