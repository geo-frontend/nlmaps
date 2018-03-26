// Rollup plugins
import babel from '../../../node_modules/rollup-plugin-babel/dist/rollup-plugin-babel.es.js';
import eslint from 'rollup-plugin-eslint';
import resolve from '../../../node_modules/rollup-plugin-node-resolve/dist/rollup-plugin-node-resolve.es.js';
import commonjs from '../../../node_modules/rollup-plugin-commonjs/dist/rollup-plugin-commonjs.es.js';
import replace from '../../../node_modules/rollup-plugin-replace/dist/rollup-plugin-replace.es.js';
import uglify from 'rollup-plugin-uglify-es';
import image from 'rollup-plugin-image';

export default config => {  
  return {
    input: config.output.format === 'iife' ? 'src/browser.js' : 'src/index.js',
    output: {
      file: config.output.file,
      format: config.output.format,
      name: config.output.format === 'iife' ? 'window' : 'nlmapsOL',
      extend: config.output.format === 'iife' ? true : false,
      sourcemap:true
    },
    external: config.external,
    plugins: [
      image(),
      commonjs(),
      resolve({
        jsnext: true,
        main: true,
        browser: true
      }),
      eslint({
        exclude: [
          '../../../node_modules/**'
        ],
        include: [
          '../../lib/**'
        ]
      }),
      babel({
        exclude: 'node_modules/**'
      }),
      replace({
        ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.browser': JSON.stringify(!!process.env.BROWSER)
      }),
      (process.env.NODE_ENV === 'production' && uglify())
    ]
  }
}
