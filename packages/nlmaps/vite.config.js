import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import * as path from 'path'

export default defineConfig({
  root: __dirname,
  build: {
    outDir: '../../dist',
    emptyOutDir: false,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      entry: 'src/index.js',
      name: 'nlmaps',
      fileName: (format) => `nlmaps.${format}.js`,
      formats: ['es', 'cjs', 'iife'],
    },
    rollupOptions: {
      external: [],
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, './src/assets') + '/[!.]*',
          dest: './assets/',
        },
      ],
    }),
  ],
})
