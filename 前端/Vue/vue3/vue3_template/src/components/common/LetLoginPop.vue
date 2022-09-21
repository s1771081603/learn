<template>
    <div v-show="letLoginPop || agreeModel">
        <transition name="mask-ani">
            <div class="letlogin-mask" v-show="letLoginPop" id="letlogin-pop">
                <div class="letlogin-pop">
                    <div class="letlogin-title">登录</div>
                    <h2 class="letlogin-phone">{{ letLoginPhone }}</h2>
                    <p class="letlogin-tips">请勿连接热点登录,并确认该号码为您本机号码</p>
                    <button class="login-4g-btn" @click="tokenValidate">一键登录</button>
                    <p class="clause">
                        <input type="checkbox" :value="isAgree" @click="changeIsAgreeContract" />
                        我已阅并同意
                        <span>
                            <a href="https://wap.cmpassport.com/resources/html/contract.html">《中国移动认证服务条款》</a>
                        </span>
                    </p>
                    <p class="message-login-btn">
                        <span @click="msgLogin">短信登录</span>
                    </p>
                    <div class="close" @click="showLetLoginPop(false)"></div>
                </div>
            </div>
        </transition>

        <transition name="mask-ani">
            <div class="letlogin-mask" v-show="agreeModel" id="agreeModel">
                <div class="agree-pop">
                    <p class="clause">
                        请阅读并同意<span><a
                                href="https://wap.cmpassport.com/resources/html/contract.html">《中国移动认证服务条款》</a></span>
                    </p>

                    <div class="accept-btn">
                        <button class="no-accept" @click="showAgreeModel()">取消</button>
                        <button class="is-accept" @click="agreeAndtokenValidate">同意并登录</button>
                    </div>

                    <div class="close" @click="showAgreeModel()"></div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import useCommonStore from "@/store/common";
import letLoginJs from "@/common/js/letlogin";

const commonStore = useCommonStore();
let { isLogin, letLoginPop, letLoginPhone } = storeToRefs(commonStore);
let agreeModel = ref(false); //未勾选时同意协议的弹窗
let isAgree = ref(false); //是否统一协议

function tokenValidate() {
    if (!isAgree.value) {
        showLetLoginPop(false);
        agreeModel.value = true;
    } else {
        const letLoginToken = sessionStorage.getItem("letLoginToken");
        const letLoginUserInformation = sessionStorage.getItem("letLoginUserInformation");
        letLoginJs.tokenValidate(letLoginToken, letLoginUserInformation);
        showLetLoginPop(false);
        agreeModel.value = false;
    }
}
function agreeAndtokenValidate() {
    isAgree.value = true;
    tokenValidate();
}
function showAgreeModel() {
    agreeModel.value = !agreeModel.value;
}
function changeIsAgreeContract() {
    isAgree.value = !isAgree.value;
}
function showLetLoginPop(value) {
    commonStore.showLetLoginPop(value);
}
function msgLogin() {
    if (isLogin.value) {
        return;
    }
    showLetLoginPop(false);
    commonStore.showLoginPop(true);
}

</script>

