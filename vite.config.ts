import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

import tailwindcss from '@tailwindcss/vite';
import Icons from 'unplugin-icons/vite';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 3001,
    open: true,
  },
  build: {
    chunkSizeWarningLimit: 512,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-skinview': ['skinview3d'],
        },
      },
    },
  },
  plugins: [vue(), vueDevTools(), tailwindcss(), Icons({ compiler: 'vue3' })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
