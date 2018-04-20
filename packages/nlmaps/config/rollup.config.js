// Rollup plugins
import babel from '../../../node_modules/rollup-plugin-babel/dist/rollup-plugin-babel.es.js';
import eslint from 'rollup-plugin-eslint';
import resolve from '../../../node_modules/rollup-plugin-node-resolve/dist/rollup-plugin-node-resolve.es.js';
import commonjs from '../../../node_modules/rollup-plugin-commonjs/dist/rollup-plugin-commonjs.es.js';
import replace from '../../../node_modules/rollup-plugin-replace/dist/rollup-plugin-replace.es.js';
import json from '../../../node_modules/rollup-plugin-json/dist/rollup-plugin-json.es.js';
import uglify from 'rollup-plugin-uglify-es';


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
          'node_modules/**'
        ],
        include: [
          '../../lib/**'
        ],
        throwOnError: true
      }),
      babel({
        exclude: 'node_modules/**',
        babelrc: false,
        presets: [['env',{modules:false}]],
        plugins: [
          "external-helpers"
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
