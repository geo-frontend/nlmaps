// Rollup plugins
import babel from '../../../node_modules/@rollup/plugin-babel/dist/index.es.js';
import { eslint } from "rollup-plugin-eslint";
import resolve from '../../../node_modules/@rollup/plugin-node-resolve/dist/es/index.js';
import commonjs from '../../../node_modules/@rollup/plugin-commonjs/dist/index.es.js';
import replace from '../../../node_modules/@rollup/plugin-replace/dist/rollup-plugin-replace.es.js';
import json from '../../../node_modules/@rollup/plugin-json/dist/index.es.js';
import uglify from 'rollup-plugin-uglify-es';
const polyfill = require('../../../node_modules/rollup-plugin-polyfill/index.js');


export default config => {
  return {
    input: 'src/index.js',
    output: {
      file: config.output.file,
      format: config.output.format,
      name: config.output.format === 'iife' ? 'window' : 'nlmaps',
      extend: config.output.format === 'iife' ? true : false,
      sourcemap:true
    },
    external: config.external,

    plugins: [
      (process.env.STANDALONE === undefined && polyfill('src/index.js', ['babel-polyfill'])),
      commonjs(),
      resolve({
        jsnext: true,
        main: true,
        browser: true
      }),
      json(),
      eslint({
        exclude: [
          '../../../node_modules/**',
          'node_modules/**',
          '../node_modules/**'
        ],
        include: [
          '../../lib/**'
        ],
        throwOnError: true
      }),
      babel({
        exclude: 'node_modules/**',
        babelrc: false,
        presets: [
          ["@babel/preset-env", {modules:false}]
        ],
        babelHelpers: 'bundled',
        plugins: [
          "@babel/plugin-transform-object-assign"
        ]
      }),
      replace({
        ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.browser': JSON.stringify(!!process.env.BROWSER)
      }),
      (process.env.NODE_ENV === 'production' && uglify())
    ]
  }
}
