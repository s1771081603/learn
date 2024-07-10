import App from "@/App.vue"
import { createApp } from 'vue'
import { createPinia } from "pinia";
import router from "@/routers/index";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css"
import zhCN from "element-plus/es/locale/lang/zh-cn";
import * as ElementPlusIconsVue from "@element-plus/icons-vue"

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus, { locale: zhCN })
app.use(router)
app.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}