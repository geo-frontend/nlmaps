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
      fileName: (format) => `nlmaps-maplibre.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [],
    },
  },
})
