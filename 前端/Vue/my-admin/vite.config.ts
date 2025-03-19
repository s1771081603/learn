import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    open: true,
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://domp-api-dev.digitalvolvo.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: { api: 'modern-compiler' },
    }
  },
  resolve: {
    alias: {
      '@': '/src',
    }
  }
})