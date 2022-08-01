<template>
    <div class="test">
        <common-header :show-bg-color="true"></common-header>
       
        <login-pop id="test_login" :point-name="pointName" :market-name="marketName"></login-pop>
    </div>
</template>
<script lang="ts" setup>
import LoginPop from '@/components/common/LoginPop.vue'; // 登录弹窗组件
import CommonHeader from '@/components/common/CommonHeader.vue'; //header組件
import caiyunLogin from '@/common/js/toLogin'; //单点、4G登录方法
import { nextTick, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import useCommonStore from '@/store/common';
import api from '@/api/test' //api接口
import useCurrentInstance from "@/common/js/useCurrentInstance";
import { init } from '@/common/js/share'  //分享配置  内部也有复制方法可以用，自己引入
let commonStore = useCommonStore();
const { loginServerNumber, isLogin } = storeToRefs(commonStore);
const { proxy } = useCurrentInstance(); // 获取当前实例
const pointName = "national_test";
const marketName = "marketName_test";//随意写的值，方便全局替换，记得替换，没有就改成空字符串

onMounted(() => {
    if (!isLogin.value) {
        caiyunLogin({
            pointName,
            marketName,
            sourceid: proxy.sourceid
        }).then(res => { }).catch(err => { })
    }
    nextTick(() => {
        initShare();
    })
})

function initShare() {
    let title = "sss";
    let miniTitle = "kkk";
    let desc = "iii";
    let imgUrl = `${location.origin}/portal/vue3_template/${require("@/common/img/wx_share.jpg")}`;//记得改，写完整的链接
    let miniImgUrl = `${location.origin}/portal/vue3_template/${require("@/common/img/wx_share.jpg")}`;//记得改，写完整的链接
    let link = `${location.origin}/portal/vue3_template/index.html?path=test&sourceid=${proxy.sourceid}`;//记得改，写完整的链接
    let wxOptions = {
        title,
        desc,
        imgUrl,
        link
    }
    let miniOptions = {
        title: miniTitle,
        desc,
        imgUrl: miniImgUrl,
        link: link + '"&tokenType=ssoToken&targetSourceId=001005"'
    }
    init({ wxOptions, miniOptions, appOptions: wxOptions });
}

</script>
<style lang="less" scoped>
    @import '~@/assets/test/less/login.less';
    @import '~@/assets/test/less/test.less';
</style>
