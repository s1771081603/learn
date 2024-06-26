import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router';
import i18n from '@/i18n';
import '@/styles/element/index.scss'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus, { locale: i18n.locale })
app.use(i18n)
app.use(pinia)
app.use(router)
app.mount('#app')
