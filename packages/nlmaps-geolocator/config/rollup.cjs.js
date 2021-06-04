import config from './rollup.config';

export default config({
  output: {
    format: 'cjs',
    file: 'build/nlmaps-geolocator.cjs.js',
    exports: 'default'
  },
  browser: false
})
