<template>
    <van-overlay :show="showLogin" z-index="100">
        <div class="login_pop">
            <p class="login_title">{{ titleText }}</p>
            <div class="telephone">
                <span class="icon"></span>
                <input v-wx-blur v-model.trim="phone" type="text" placeholder="请输入手机号" maxlength="11">
            </div>
            <div class="code">
                <span class="icon"></span>
                <input v-wx-blur v-model.trim="code" type="text" placeholder="请输入验证码" maxlength="6">
                <button class="getcode" @click="getSmsCode" v-show="time === 0">发送验证码</button>
                <button class="getcode" v-show="time > 0">重新发送{{ time }}s</button>
            </div>
            <button class="ok" @click="login">{{ buttonText }}</button>
            <p class="letLogin-btn-container" v-if="showAutoLoginBtn && show4GBtn">
                <span @click="letLogin">一键登录</span>
            </p>
            <div class="close_btn" @click="commonStore.showLoginPop(false)">
                <van-icon name="cross" color="#ffffff" />
            </div>
        </div>
    </van-overlay>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import jsLogin from '@/common/js/login';
import commonApi from '@/api/common';
import utils from '@/common/js/utils';
import { useCountDown } from '@/hooks/common/countDown';
import logPoint from '@/common/js/logPoint';
import letLoginJs from '@/common/js/letlogin';
import { publicImport } from '@/hooks/common/publicImport';
const { commonStore, storeToRefs, proxy } = publicImport();
const props = withDefaults(defineProps<{
    pointName: string
    marketName?: string | null
    sourceid?: string | null
    show4GBtn?: boolean   //是否要显示一键登录（前提是showAutoLoginBtn的值也要为true）
    titleText?: string
    buttonText?: string
}>(),{
    titleText:'登录',
    buttonText:"登录"
})
const { checkPhone, errorMsg } = jsLogin;
const { showLogin, showAutoLoginBtn } = storeToRefs(commonStore);
const phone = ref('');
const code = ref('');
const time = ref(0);
async function getSmsCode() {
    if (!checkPhone(phone.value)) {
        proxy.$toast("请输入正确的手机号码");
        return;
    }
    let encryptTime = await jsLogin.getEncryptTime();
    let encryptData = utils.publicKeyEncrypt({
        userName: phone.value,
        encryptTime: encryptTime
    })
    commonApi.getSmsCode({
        encryptData: encryptData
    }).then(res => {
        let data = res.data;
        if (data === undefined) {
            proxy.$toast("系统繁忙，请稍后再试！");
            return;
        }
        if (String(data) !== "0") {
            let message = errorMsg[data];
            proxy.$toast(message || "系统繁忙，请稍后再试！");
            return;
        }
        time.value = 60;
        useCountDown(time)
    })
}
async function login() {
    if (!checkPhone(phone.value)) {
        proxy.$toast("请输入正确的手机号码");
        return;
    }
    let codeReg = new RegExp(/^\d{6}$/);
    if (!codeReg.test(code.value)) {
        proxy.$toast("请输入正确的验证码");
        return;
    }
    let encryptTime = await jsLogin.getEncryptTime();
    let data = {
        uname: phone.value, upwd: code.value, pType: 8, encryptTime: encryptTime
    }
    let encryptData = utils.publicKeyEncrypt(data);
    commonApi.login({
        encryptData: encryptData
    }).then(res => {
        let data = res.data;
        if (data === undefined) {
            proxy.$toast("系统繁忙，请稍后再试！");
            return;
        }
        var rescode = data.code;
        if (String(rescode) !== "0") {
            let message = errorMsg[rescode];
            proxy.$toast(message || "系统繁忙，请稍后再试！");
            return;
        }
        //賦值手机号
        commonStore.setPhone(phone.value);
        commonStore.setLoginState(true);
        //记录登录日志
        logPoint(`${props.pointName}_user_login`, props.sourceid, props.marketName);
        commonStore.showLoginPop(false);
        phone.value = '';
        code.value = '';
        time.value = 0;
    })

}
function letLogin() {
    commonStore.showLoginPop(false);
    letLoginJs.getNumber(5);
}

</script>
<style scoped lang="less">
</style>