import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@axios': 'node_modules/axios',
    },
  },
});
