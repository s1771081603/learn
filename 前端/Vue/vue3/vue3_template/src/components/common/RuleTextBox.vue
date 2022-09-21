<!-- 引入了运营平台编辑器的样式 -->
<template>
    <div id="rule_text_box">
        <div class="ql-container ql-snow">
            <div class="ql-editor ql-blank" v-html="content">
            </div>
        </div>
    </div>
    

</template>

<script setup>
defineProps({
    content: {
        type: String,
        default: ''
    }
})

</script>
<style lang="less">
    @import "~@/common/less/quill.snow.less";
</style>