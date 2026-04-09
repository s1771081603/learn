import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    federation({
      name: 'main-app',
      filename: 'remoteEntry.js',
      remotes: {
        'common-components': `${process.env.VITE_COMMON_COMPONENTS_URL || 'http://localhost:3001'}/remoteEntry.js`,
        'my-resume': `${process.env.VITE_MY_RESUME_URL || 'http://localhost:3002'}/remoteEntry.js`
      },
      shared: {
        vue: {
          requiredVersion: '^3.5.0'
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: { target: 'esnext' }
})
