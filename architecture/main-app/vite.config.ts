import { defineConfig ,loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig(({ mode })=> {
  const env = loadEnv(mode, process.cwd(), '')

  return {
  plugins: [
    vue(),
    tailwindcss(),
    federation({
      name: 'main-app',
      filename: 'remoteEntry.js',
      remotes: {
        'common-components': `${env.VITE_COMMON_COMPONENTS_URL}/remoteEntry.js`,
        'my-resume': `${env.VITE_MY_RESUME_URL}/remoteEntry.js`
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
    port: 3000,
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
}
  )
