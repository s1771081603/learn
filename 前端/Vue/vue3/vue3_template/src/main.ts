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

//全局方法
cApp.config.globalProperties.$base64 = Base64; //base64 .encode  .decode
cApp.config.globalProperties.$wx = wx;

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
