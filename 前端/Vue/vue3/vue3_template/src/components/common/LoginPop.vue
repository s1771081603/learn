<template>
    <van-overlay :show="showLogin" z-index="100">
        <div class="login_pop">
            <p>登录</p>
            <div class="telephone">
                <input v-model.trim="phone" type="text" placeholder="请输入手机号" maxlength="11">
            </div>
            <div class="code">
                <input v-model.trim="code" type="text" placeholder="请输入验证码" maxlength="6">
                <button class="getcode" @click="getSmsCode" v-show="time === 0">发送验证码</button>
                <button class="getcode" v-show="time > 0">重新发送{{ time }}</button>
            </div>
            <button class="ok" @click="login">登录</button>

            <div class="close_btn" @click="commonStore.showLoginPop(false)">
                <van-icon name="cross" color="#ffffff" />
            </div>
        </div>
    </van-overlay>
</template>

<script setup lang="ts">
import { ref,defineProps } from 'vue';
import { storeToRefs } from 'pinia';
import jsLogin from '@/common/js/login';
import useCommonStore from '@/store/common';
import commonApi from '@/api/common';
import utils from '@/common/js/utils';
import { useCountDown } from '@/hooks/common/countDown';
import useCurrentInstance from "@/common/js/useCurrentInstance";
import logPoint from '@/common/js/logPoint';
const props = defineProps({ 
    pointName: {
        type:String,
        required:true
    },
    marketName: {
        type:String,
        required:true
    },
})
const { proxy } = useCurrentInstance(); // 获取当前实例
const { checkPhone, errorMsg } = jsLogin;
const commonStore = useCommonStore();
const { showLogin } = storeToRefs(commonStore);
const phone = ref('');
const code = ref('');
const time = ref(0);
async function getSmsCode() {
    if (!checkPhone(phone.value)) {
        proxy.$toast("请输入正确的手机号码");
        return;
    }
    time.value = 60;
    useCountDown(time)
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
        var code = data.code;
        if (String(code) !== "0") {
            let message = errorMsg[code];
            proxy.$toast(message || "系统繁忙，请稍后再试！");
            return;
        }
        //賦值手机号
        commonStore.setPhone(phone.value);
        commonStore.setLoginState(true);
        //记录登录日志
        logPoint(`${props.pointName}_user_login`, proxy.sourceid, props.marketName);
        commonStore.showLoginPop(false);
    })

}

</script>
<style scoped lang="less">
</style>