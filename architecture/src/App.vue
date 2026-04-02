<script lang="ts" setup>
import { SystemInfo } from "@/config/systemInfo"
import { sidebarStore } from "@/stores/sidebar"
import Header from "@/views/warp/Header.vue"
import Sidebar from "@/views/warp/Sidebar.vue"
import AvatarSrc from "@/static/images/Avatar.jpg"

const { author, email, telephone } = SystemInfo.value
const sidebarStores = sidebarStore()

</script>

<template>
    <div class="wrap flex h-full">
        <div :class="sidebarStores.isCollapse ? 'w-20' : 'w-60'" class="sidebar overflow-hidden">
            <div class="title h-15 flex items-center justify-center">
                <a-avatar :size="40" :src="AvatarSrc" shape="square"></a-avatar>
                <span v-show="!sidebarStores.isCollapse" class="ml-4">我的全栈之路</span>
            </div>
            <Sidebar></Sidebar>
        </div>
        <div class="content flex-1 flex flex-col h-full">
            <div class="header h-15 overflow-hidden">
                <Header></Header>
            </div>
            <div class="router p-5 flex-1 bg-gray-50 overflow-x-hidden overflow-y-auto">
                <router-view></router-view>
            </div>
            <div class="footer h-10 p-4 overflow-hidden bg-white flex items-center justify-center text-xs">
                <span>作者：{{ author }}</span>
                <a-divider type="vertical" />
                <span>邮箱：{{ email }}</span>
                <a-divider type="vertical" />
                <span>手机：{{ telephone }}</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .sidebar {
        border-right: 1px solid #e8e8e8;

        .title {
            font-size: 24px;
            font-weight: 700;
            text-align: center;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
            background-clip: text;
            color: transparent;
            position: relative;
        }
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
