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
      name: 'my-resume',
      filename: 'remoteEntry.js',
      exposes: {
        './App': resolve(__dirname, 'src/App.vue')
      },
      remotes: {
        main: `${process.env.VITE_MAIN_URL || 'http://localhost:3000'}/remoteEntry.js`,
        'common-components': `${process.env.VITE_COMMON_COMPONENTS_URL || 'http://localhost:3001'}/remoteEntry.js`
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
    port: 3002,
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
