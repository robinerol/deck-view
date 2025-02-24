import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
  },
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  base: '/deck-view/',
});
