import config from './rollup.config';

export default config({
  output: {
    format: 'iife',
    file: 'build/nlmaps.iife.js',
  },
  browser: true,
  external: ''
})
