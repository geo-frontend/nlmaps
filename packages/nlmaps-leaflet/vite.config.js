import { defineConfig } from 'vite'

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
      name: 'nlmapsleaflet',
      fileName: (format) => `nlmaps-leaflet.${format}.js`,
      formats: ['es', 'cjs', 'iife'],
    },
    rollupOptions: {
      external: [],
    },
  },
})
