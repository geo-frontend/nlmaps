import config from './rollup.config';

export default config({
  output: {
    format: 'cjs',
    file: 'build/nlmaps-googlemaps.cjs.js',
  },
  browser: false
})
