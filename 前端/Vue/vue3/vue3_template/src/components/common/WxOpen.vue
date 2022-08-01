
<!--使用时： 如果slot部分是行内样式必须设置inline-block 和 高度 ，并且整个组件需要用容器包裹，容器为inline-block -->
<template>
    <div class="tomini">
        <div class="tomini-con">
            <slot></slot>
            <wx-open-launch-weapp id="launch-btn"
                username="gh_caaed54c718e" :path="path" ref="launchBtn">
                <div v-is="'script'" type="text/wxtag-template">
                    <div v-is="'style'">
                        .openbtn{ display: flex;align-items: center;width: 1000px;height: 1000px; }
                    </div>
                    <div class="openbtn">跳转小程序</div>
                </div>
            </wx-open-launch-weapp>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WxOpen',
    props: ["path"]
}
</script>
<style scoped lang="less">
.tomini {
    text-align: center;
    line-height: 0;
}

.tomini-con {
    display: inline-block;
    position: relative;
    height: 100%;
}

#launch-btn {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
    z-index: 10;
    overflow: hidden;
}
</style>