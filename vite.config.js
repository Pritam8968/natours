/*eslint-disable */
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: 'public/js',
  build: {
    outDir: '.',
    emptyOutDir: false,
    rollupOptions: {
      input: path.resolve(__dirname, 'public/js/index.js'),
      output: {
        entryFileNames: 'bundle.js',
        format: 'iife',
        name: 'MyBundle'
      }
    }
  }
});
