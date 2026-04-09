import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
  plugins: [
    vue(),
    tailwindcss(),
    federation({
      name: 'my-resume',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/views/HomeView.vue'
      },
      remotes: {
        'main': `${env.VITE_MAIN_URL}/remoteEntry.js`,
      },
      shared: ['vue', 'vue-router']
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3002,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  build: { 
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
}
})
