import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  base: '/',
  server: {
    host: true,
    port: 8080,
    open: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
