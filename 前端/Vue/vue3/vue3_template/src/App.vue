<template>
    <van-popup v-model="showLoading" :overlay="false" duration="0">
        <van-loading vertical color="#fff" type="spinner">{{ loadingText || "加载中..." }}</van-loading>
    </van-popup>
    <router-view />
</template>
<script lang="ts" setup>
    import { storeToRefs } from 'pinia';
    import useCommonStore from './store/common';
    import weiXin from './common/js/weiXin';
    const commonStore = useCommonStore();
    let { showLoading, loadingText } = storeToRefs(commonStore);
    
    weiXin.init();
</script>
<style scoped lang="less">
#app {
    width: 100%;
    max-width: 7.5rem;
    height: 100%;
    margin: auto;
    position: relative;
}

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
