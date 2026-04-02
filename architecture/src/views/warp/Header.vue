<script lang="ts" setup>
    import { h, reactive, toRefs } from "vue"
    import {
        CompressOutlined,
        ExpandOutlined,
        FormOutlined,
        LogoutOutlined,
        MailOutlined,
        MenuFoldOutlined,
        MenuUnfoldOutlined,
    } from "@ant-design/icons-vue"
    import { sidebarStore } from "@/stores/sidebar.ts"
    import { userInfoStore } from "@/stores/userInfo.ts"
    import { fullScreenStore } from "@/stores/fullScreen.ts"
    import {headerTabsStore} from "@/stores/headerTabs.ts"
    import { useRouter } from "vue-router"

    const router = useRouter()

    const { isCollapse, toggleCollapse } = toRefs(sidebarStore())
    const { userInfo } = toRefs(userInfoStore())
    const { isFullscreen, toggleFullscreen } = toRefs(fullScreenStore())
    const { headerTabs,activeTab,setActiveTab } = toRefs(headerTabsStore())

    const iconStyle = {
        fontSize: "20px",
        color: "#333"
    }

    const logout = () => {
        localStorage.removeItem("userInfo")
        router.push("/login")
    }

    const openEditUserInfoModal = () => {
        console.log("openEditUserInfoModal")
    }

    const usrInfoMenu = reactive([
        {
            key: "Personal Center",
            icon: () => h(FormOutlined),
            label: "编辑资料",
            onClick: () => openEditUserInfoModal()
        },
        {
            key: "Log out",
            icon: () => h(LogoutOutlined),
            label: "退出登录",
            onClick: () => logout()
        }
    ])

    /**
     * mail 相关
     * */
    const goToMail = () => {
        router.push("/mail")
    }

</script>

<template>
    <div class="wrap flex items-center justify-between px-4 py-3">
        <div class="flex-1 flex items-center min-w-0 mr-4">
            <div :style="iconStyle" class="mr-4 cursor-pointer shrink-0" @click="toggleCollapse">
                <MenuUnfoldOutlined v-show="isCollapse" />
                <MenuFoldOutlined v-show="!isCollapse" />
            </div>

            <div class="title">
                <a-button
                    class="mr-4!"
                    v-for="item in headerTabs"
                    :key="item.code"
                    :type="item.code === activeTab ? 'primary' : 'default'"
                    @click="() => setActiveTab(item.code)"
                >
                    {{ item.title }}
                </a-button>
            </div>
        </div>

        <div class="user flex items-center shrink-0">
            <a-badge :count="1" :offset="[-10, -1]" :overflowCount="99" class="cursor-pointer" @click="goToMail">
                <MailOutlined :style="iconStyle" class="mr-5" />
            </a-badge>
            <a-divider type="vertical" />

            <div :style="iconStyle" class="cursor-pointer" @click="toggleFullscreen">
                <CompressOutlined v-if="isFullscreen" />
                <ExpandOutlined v-else />
            </div>
            <a-divider type="vertical" />

            <span class="text-xs mt-1">欢迎您，{{ userInfo.userName }}</span>
            <a-divider type="vertical" />

            <a-dropdown :trigger="['click', 'hover']">
                <a-avatar :size="32" :src="userInfo.avatar" class="cursor-pointer" />
                <template #overlay>
                    <a-menu>
                        <a-menu-item v-for="item in usrInfoMenu" :key="item.key" @click="item.onClick">
                            <div class="flex items-center">
                                <component :is="item.icon" class="mr-2" />
                                <div>{{ item.label }}</div>
                            </div>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
    </div>
</template>

<style scoped>
.role-buttons {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}

/* 隐藏滚动条但保留滚动功能 */
.role-buttons::-webkit-scrollbar {
    height: 4px;
}

.role-buttons::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
}

.role-buttons::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 2px;
}

.role-buttons::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>
