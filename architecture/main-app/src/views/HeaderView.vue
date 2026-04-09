<script setup lang="js">
import { useCollapseSidebarStore } from '@/stores/collapseSidebar'

const collapseSidebarStore = useCollapseSidebarStore()
</script>

<template>
  <div>
    <el-button type="primary" @click="collapseSidebarStore.toggleCollapsed">切换</el-button>
    <h1>Header View</h1>
  </div>
</template>
