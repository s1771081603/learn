import { defineStore } from "pinia"
import { computed, ref, toRefs } from "vue"
import { userInfoStore } from "./userInfo"

interface Tab {
    code: string
    title: string
    role: string[]
}

export const headerTabsStore = defineStore("headerTabs", () => {
    const tabs: Tab[] = [
        {
            code: "ui",
            title: "个人博客系统 (前后端分离)",
            role: ["user", "admin"]
        },
        {
            code: "apiDoc",
            title: "在线协作文档",
            role: ["admin"]
        },
        {
            code: "setting",
            title: "即时聊天应用",
            role: ["admin"]
        },
        {
            code: "log",
            title: "低代码平台",
            role: ["admin"]
        },
        {
            code: "user",
            title: "可视化数据大屏",
            role: ["admin"]
        },
        {
            code: "role",
            title: "SaaS 服务平台",
            role: ["admin"]
        }
    ]

    const {userInfo} = toRefs(userInfoStore())
    const headerTabs = computed(() => tabs.filter(item => item.code && item.role && item.role.some(role => userInfo.value.roles.includes(role))))
    const activeTab = ref('ui')

    const setActiveTab = (tab: string) => {
        activeTab.value = tab
    }

    return {
        headerTabs,
        activeTab,
        setActiveTab
    }
})
