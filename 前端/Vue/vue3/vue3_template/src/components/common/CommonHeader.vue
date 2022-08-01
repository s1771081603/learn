<!-- 通用header,有样式要改自己在父组件用/deep/ 样式穿透  不行就自己的项目中写一个header不要用这个了 -->
<template>
    <div :class="['header',showBgColor?'showBgColor':'']">
        <img class="logo" :src="logoUrl" alt="" />
        <button class="not_phoneNum" v-if="!loginServerNumber" @click="showLogin">
            登录
        </button>
        <button class="phoneNum" v-else>
            {{ loginServerNumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') }}
        </button>
        <slot></slot>
    </div>
</template>

<script setup>
import useCommonStore from '@/store/common';
import { storeToRefs } from 'pinia';
const commonStore = useCommonStore();
const { loginServerNumber } = storeToRefs(commonStore);
defineProps({
    logoUrl: {
        type: String,
        default: require('@/common/img/logo.png')
    },
    showBgColor: {
        type: Boolean,
        default: false
    }
})
function showLogin() {
    commonStore.showLoginPop(true);
}
</script>

<style lang="less" scoped>
.header{
    display: flex;
    justify-content: space-between;
    padding:16px 20px;
    &.showBgColor{
        background: rgba(0,0,0,0.3);
    }
    .logo{
        width: 290px;
    }
    .not_phoneNum,.phoneNum{
        font-size:0.28rem;
        color:#fff;
    }
}
</style>
