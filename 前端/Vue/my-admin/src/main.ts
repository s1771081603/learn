// 导入 Vue 的 createApp 函数用于创建 Vue 应用
import { createApp } from 'vue';
// 导入 Vue 应用的根组件
import App from './App.vue';
import './assets/css/index.scss';
// 导入 ElementPlus UI 库
import ElementPlus from 'element-plus';
// 导入 ElementPlus 的样式文件
import 'element-plus/dist/index.css';
// 导入 ElementPlus 的所有图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
// 导入国际化插件
import vueI18n from './i18n/index';
// 导入路由
import router from './router'

// 创建 Vue 应用实例
const app = createApp(App);

// 使用 ElementPlus UI 库
app.use(ElementPlus);

// 遍历所有图标组件并注册为全局组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 使用国际化插件
app.use(vueI18n);

// 使用路由
app.use(router);

// 将 Vue 应用挂载到 HTML 中的 #app 元素上
app.mount('#app');