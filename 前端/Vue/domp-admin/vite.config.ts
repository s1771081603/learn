import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  //解决“vite use `--host` to expose”
  base: './',
  server: {
    port: 8003,
    host: true,
    open: true
  },
  resolve: {
    alias: [
      {
        find:'@',
        replacement:resolve(__dirname, 'src')
      }
    ]
  }
})
