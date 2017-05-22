import config from './rollup.config';

export default config({
  format: 'iife',
  dest: 'build/nlmaps.iife.js',
  browser: true
})
