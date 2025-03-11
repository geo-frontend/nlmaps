import { defineConfig } from 'vite'

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
      fileName: (format) => `nlmaps-maplibre.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [],
    },
  },
})
