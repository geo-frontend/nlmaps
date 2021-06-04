// Rollup plugins
import babel from '../../../node_modules/@rollup/plugin-babel/dist/index.es.js';
import eslint from 'rollup-plugin-eslint';
import resolve from '../../../node_modules/@rollup/plugin-node-resolve/dist/es/index.js';
import commonjs from '../../../node_modules/@rollup/plugin-commonjs/dist/index.es.js';
import replace from '../../../node_modules/@rollup/plugin-replace/dist/rollup-plugin-replace.es.js';
import uglify from 'rollup-plugin-uglify';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import babelrc from 'babelrc-rollup';

export default {
  input: 'test/browser-test.js',
  output: { 
    format: 'iife',
    name: 'testing',
    file: 'build/browser-test.js',
    extend: true,
  },
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
    babel(babelrc()),
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.browser': JSON.stringify(!!process.env.BROWSER)
    }),
    (process.env.NODE_ENV === 'production' && uglify()),
  ]
}
