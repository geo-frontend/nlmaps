import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import * as path from 'path'

export default defineConfig({
  root: import.meta.dirname,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      entry: 'src/index.js',
      name: 'window',
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
          src: path.resolve(import.meta.dirname, './src/assets') + '/**/[!.]*',
          dest: './assets/',
          rename: { stripBase: 2 },
        },
      ],
    }),
  ],
})
