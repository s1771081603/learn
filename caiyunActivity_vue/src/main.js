import "core-js/stable";
import "regenerator-runtime/runtime";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import '@/assets/scss/style.scss';
import '@/assets/js/login.js'
import '@/assets/js/letlogin.js'
import '@/assets/js/caiYunUpload.js'  //文件上传
import cyApp from '@/assets/js/CyApp.js'
import utils from "@/utils/utils.js";
import wx from "weixin-js-sdk";
import {logPoint} from '@/assets/js/logPoint.js'

// 引入 vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

/**
 * vue-awesome-swiper  start*/
 import {Swiper as SwiperClass, Pagination, Navigation, Mousewheel, Autoplay,EffectFade } from 'swiper/swiper.esm'
 import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
 SwiperClass.use([Pagination, Mousewheel, Navigation, Autoplay,EffectFade ])
 Vue.use(getAwesomeSwiper(SwiperClass))
 const {Swiper, SwiperSlide} = getAwesomeSwiper(SwiperClass)
 // 导入样式
 import 'swiper/swiper-bundle.min.css'
 /**
  * vue-awesome-swiper  end*/

import Vconsole from 'vconsole'
// 测试环境启用vconsole
if (location.host.includes('http://')) {
    new Vconsole();
}
Vue.prototype.wx = wx;
Vue.prototype.cyApp = cyApp;
Vue.prototype.logPoint = logPoint;
Vue.prototype.baseUrl = caiYunLoginJs.getBaseUrl()  //location.origin + 'portal'
Vue.prototype.sourceid = utils.getHashQueryString('sourceid')
Vue.prototype.isApp = caiYunLoginJs.isCaiYunApp()//true - false
Vue.prototype.isWeiXin = false;
Vue.prototype.isMiniProgram = false;
if (navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger") {
  Vue.prototype.isWeiXin = true;
  wx.miniProgram.getEnv((res) => {
    if (res.miniprogram) {
      Vue.prototype.isMiniProgram = true;
    }
  });
}

Vue.config.productionTip = false;
Vue.config.ignoredElements = ["wx-open-launch-weapp", "wx-open-launch-app"];

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");