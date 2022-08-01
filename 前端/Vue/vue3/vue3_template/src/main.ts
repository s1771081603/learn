import "core-js/stable";
import "regenerator-runtime/runtime";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/";
import store from "./store/index";
import directives from "@/directives/index";
import "vant/lib/index.css";
import "@/common/less/style.less";
import utils from "@/common/js/utils";
import wx from "weixin-js-sdk";
import { Base64 } from 'js-base64'
let { getHashQueryString } = utils;
const cApp = createApp(App);

/**
 * 开调试*/
if (location.href.indexOf("http://wap1") === 0 || process.env.NODE_ENV === "development" || getHashQueryString('vconsole') === 'waphecaiyun') {
    let vConsole = require("vconsole");
    const vc = new vConsole();
}

cApp.config.compilerOptions.isCustomElement = (tag) => {
    return tag.indexOf("wx-open-launch-") === 0;
};
//全局变量
cApp.config.globalProperties.$base64 = Base64; //base64 .encode  .decode
cApp.config.globalProperties.$wx = wx;
cApp.config.globalProperties.sourceid = utils.getHashQueryString("sourceid");
const ua = navigator.userAgent.toLowerCase();
let isMp=false,isWeiXin=false;
cApp.config.globalProperties.isMp = isMp;
if (ua.match(/MicroMessenger/i) as any == "micromessenger") {
  isWeiXin = true;
  wx.miniProgram.getEnv((res) => {
    if (res.miniprogram) {
      //true 小程序环境
      isMp = true;
      cApp.config.globalProperties.isMp = isMp;
      // alert("mp");
    }
  });
}
cApp.config.globalProperties.isWeiXin = isWeiXin;
let isApp = ua.indexOf("MCloudApp".toLowerCase()) > -1 || ua.indexOf("iOSAmber".toLowerCase()) > -1;
cApp.config.globalProperties.isApp = isApp;

// 注册全局指令
Object.keys(directives).forEach((key) => {
    cApp.directive(key, directives[key]);
});

/**
 * vant start*/
import { Popup, Toast, Loading, Icon, Overlay, Picker, Switch, List, Checkbox, Lazyload, DropdownMenu, DropdownItem } from "vant";
let vantObj: any = {
    Popup,
    Toast,
    Loading,
    Icon,
    Overlay,
    Picker,
    Switch,
    List,
    Checkbox,
    Lazyload,
    DropdownMenu,
    DropdownItem,
};
for (let i in vantObj) {
    cApp.use(vantObj[i]);
}
/**
 * vant end*/
cApp.use(store);
cApp.use(router);
cApp.mount("#app");
