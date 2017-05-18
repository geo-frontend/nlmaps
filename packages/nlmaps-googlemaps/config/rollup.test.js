// Rollup plugins
import babel from '../../../node_modules/rollup-plugin-babel/dist/rollup-plugin-babel.es.js';
import eslint from '../../../node_modules/rollup-plugin-eslint/dist/rollup-plugin-eslint.es.js';
import resolve from '../../../node_modules/rollup-plugin-node-resolve/dist/rollup-plugin-node-resolve.es.js';
import commonjs from '../../../node_modules/rollup-plugin-commonjs/dist/rollup-plugin-commonjs.es.js';
import replace from '../../../node_modules/rollup-plugin-replace/dist/rollup-plugin-replace.es.js';
import uglify from '../../../node_modules/rollup-plugin-uglify/dist/rollup-plugin-uglify.es.js';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

export default {
  entry: 'test/browser-test.js',
  format: 'iife',
  moduleName: 'browserTest',
  dest: 'build/browser-test.js',
  plugins: [
    commonjs(),
    globals(),
    builtins(),
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    eslint({
      exclude: [
        '../../../node_modules/**'
      ]
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.browser': JSON.stringify(!!process.env.BROWSER)
    }),
    (process.env.NODE_ENV === 'production' && uglify()),
  ]
}
