<script lang="ts" setup>
import { h, reactive, watch } from "vue"
import { sidebarStore } from "@/stores/sidebar.ts"
import { CalendarOutlined, MailOutlined } from "@ant-design/icons-vue"
import { headerTabsStore } from "@/stores/headerTabs"

const sidebarStores= sidebarStore()
const sidebar = reactive({
    isCollapse: sidebarStores.isCollapse,
    openKeys: [],
    selectedKeys: [],
    items: [
        {
            key: "1",
            icon: () => h(MailOutlined),
            label: "Navigation One",
            title: "Navigation One"
        },
        {
            key: "2",
            icon: () => h(CalendarOutlined),
            label: "Navigation Two",
            title: "Navigation Two"
        }
    ]
})

const headerTabs = headerTabsStore()
watch(() => headerTabs.activeTab, (activeTab) => {
    console.log(activeTab, 'headerTabs.activeTab');
})

</script>

<template>
    <a-menu
        v-model:openKeys="sidebar.openKeys"
        v-model:selectedKeys="sidebar.selectedKeys"
        :inline-collapsed="sidebar.isCollapse"
        :items="sidebar.items"
        mode="inline"
    ></a-menu>
</template>

<style scoped></style>
