import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';
import router from './router';
import store from './store';
import '@/assets/scss/index.scss';
import App from './App.vue';

Vue.use(Vant);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
