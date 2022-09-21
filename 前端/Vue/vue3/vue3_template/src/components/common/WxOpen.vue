
<!--使用时： tomini是absolute，所以包裹组件的容器需要relative -->
<template>
    <div class="tomini" @click="tipError">
        <wx-open-launch-weapp id="launch-btn" username="gh_caaed54c718e" :path="truePath" ref="launchBtn">
            <div v-is="'script'" type="text/wxtag-template">
                <div v-is="'style'">
                    .openbtn{ display: flex;align-items: center;width: 1000px;height: 1000px; }
                </div>
                <div class="openbtn">跳转小程序</div>
            </div>
        </wx-open-launch-weapp>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import { publicImport } from '@/hooks/common/publicImport'
const { proxy,commonStore } = publicImport();
let props = defineProps({
    path: { //跳转活动页的时候可以直接传未编码的活动页地址
        type: String,
        default: ''
    },
    isErrorTip:{
        type: Boolean,
        default: true
    }
})
let truePath = computed(() => {
    if(props.path.includes("caiyun.feixin.10086.cn") && !props.path.includes("pages/home/main")){
        return `pages/home/main.html?urlsrc=webview_common&adlink=${encodeURIComponent(props.path)}`
    }else{
        return props.path
    }
})

function tipError(){
    if(!commonStore.openTag && props.isErrorTip){
        proxy.$toast("微信版本过低，请升级微信使用");
    }
}
</script>
<style scoped lang="less">
.tomini {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
}

#launch-btn {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
}
</style>