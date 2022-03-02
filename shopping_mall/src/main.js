import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/js/rem.js'
import '@/assets/scss'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
