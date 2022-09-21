<template>
    <div class="test">
        <common-header :show-bg-color="true"></common-header>
        <button class="hh" v-if="!isWeiXin || isMp">
            哈哈
        </button>
        <button v-else class="hh" style="position:relative"><!-- relative给下面的wx-open参照 -->
            哈哈
            <wx-open path="https://caiyun.feixin.10086.cn:7071/portal/newsignin/index.html"></wx-open>
        </button>
        <login-pop id="test_login" :point-name="pointName" :market-name="marketName" :sourceid="sourceid">
        </login-pop>
        <let-login-pop class="letlogin_4G_pop" id="test_letlogin"></let-login-pop>
    </div>
</template>
<script lang="ts" setup>
import WxOpen from '@/components/common/WxOpen.vue';
import LoginPop from '@/components/common/LoginPop.vue'; // 登录弹窗组件
import LetLoginPop from '@/components/common/LetLoginPop.vue'; // 4G授权弹窗组件
import CommonHeader from '@/components/common/CommonHeader.vue'; //header組件
import caiyunLogin from '@/common/js/toLogin'; //单点、4G登录方法
import api from '@/api/test' //api接口
import { nextTick, onMounted, ref } from 'vue';
import { init } from '@/common/js/share'  //分享配置  内部也有复制方法可以用，自己引入
import { publicImport } from "@/hooks/common/publicImport";  //引入一些公关数据方法
import logPoint from '@/common/js/logPoint';
const { commonStore, globalStore, storeToRefs, proxy } = publicImport();//commonStore和globalStore是pinia公共数据，storeToRefs是pinia转换store数据为refs数据，proxy是全局实例
const { loginServerNumber, isLogin } = storeToRefs(commonStore);
const { sourceid, isMp, isWeiXin, isApp } = storeToRefs(globalStore);
const pointName = "national_test";
const marketName = "marketName_test";//随意写的值，方便全局替换，记得替换，没有就改成空字符串

onMounted(() => {
    if (!isLogin.value) {
        caiyunLogin({
            pointName,
            marketName,
            sourceid: sourceid.value
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
    let link = `${location.origin}/portal/vue3_template/index.html?path=test&sourceid=${sourceid.value}`;//记得改，写完整的链接
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
@import '~@/assets/test/less/letlogin.less';
@import '~@/assets/test/less/login.less';
@import '~@/assets/test/less/test.less';
</style>
