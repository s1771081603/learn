<template>
    <van-popup :style="{ background: 'none' }" v-model:show="showLoading" :overlay="false" duration="0">
        <van-loading vertical color="#fff" type="spinner">{{ loadingText || "加载中..." }}</van-loading>
    </van-popup>
    <router-view />
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import useCommonStore from './store/common';
import useGlobalStore from './store/global';
import weiXin from './common/js/weiXin';
import utils from './common/js/utils';
import wx from "weixin-js-sdk";
const commonStore = useCommonStore();
const globalStore = useGlobalStore();
let { showLoading, loadingText } = storeToRefs(commonStore);
//微信分享config配置 
weiXin.init();
//设置全局变量
globalStore.setSourceid(utils.getHashQueryString("sourceid"));
const ua = navigator.userAgent.toLowerCase();
if (ua.match(/MicroMessenger/i) as any == "micromessenger") {
    globalStore.setIsWeiXin(true);
    wx.miniProgram.getEnv((res) => {
        if (res.miniprogram) {
            globalStore.setIsMp(true);
        }
    });
}
let isApp = ua.indexOf("MCloudApp".toLowerCase()) > -1 || ua.indexOf("iOSAmber".toLowerCase()) > -1;
globalStore.setIsApp(isApp);

//以下功能未使用过，不清楚是否可用
document.addEventListener('WeixinOpenTagsError', function (event:any) {
    console.log(event.detail.errMsg,"无法使用wx-open-launch-weapp的原因"); // 无法使用开放标签的错误原因，需回退兼容。仅无法使用开放标签，JS-SDK其他功能不受影响
    commonStore.setOpenTag(false);
});
</script>
<style>
#app {
    width: 100%;
    max-width: 7.5rem;
    height: 100%;
    margin: auto;
    position: relative;
}
</style>
<style scoped lang="less">
.van-popup {
    background: none;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.van-loading {
    width: 1.76rem;
    height: 1.76rem;
    padding: 0.32rem;
    color: #fff;
    font-size: 0.28rem;
    line-height: 0.4rem;
    background-color: rgba(0, 0, 0, .7);
    border-radius: 0.16rem;
    transition: all .3s;
}
</style>
