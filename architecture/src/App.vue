<script lang="ts" setup>
import {systemInfo} from '@/config/systemInfo.ts'
import {toRefs} from "vue";

const {author, email, telephone} = toRefs(systemInfo)
</script>

<template>
    <div class="wrap flex">
        <div class="sidebar overflow-hidden"></div>
        <div class="content flex-1">
            <div class="header h-15 overflow-hidden"></div>
            <div class="router p-5">
                <router-view></router-view>
            </div>
            <div class="footer h-15 p-4 overflow-hidden">
                <div>作者：{{ author }}</div>
                <div>邮箱：{{ email }}</div>
                <div>手机：{{ telephone }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.sidebar {
    border-right: 1px solid #e8e8e8;
}

.content {
    .header {
        box-shadow: 0 3px 12px -2px rgba(0, 0, 0, 0.06);
    }

    .footer {
        box-shadow: 0 -3px 12px -2px rgba(0, 0, 0, 0.06);
    }
}
</style>
