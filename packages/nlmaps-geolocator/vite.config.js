import { defineConfig } from 'vite'

export default defineConfig({
  root: __dirname,
  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: '../../dist',
    emptyOutDir: false,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.js',
      name: 'nlmapsgeolocator',
      fileName: (format) => `nlmaps-geolocator.${format}.js`,
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es', 'cjs', 'iife']
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: []
    }
  }
})
