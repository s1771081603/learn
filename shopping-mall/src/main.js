import "core-js/stable"
import "regenerator-runtime/runtime"
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/scss/index.scss'

// 引入 vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
