<script setup lang="ts">
import HeaderView from '@/views/HeaderView.vue'
import SiderView from '@/views/SiderView.vue'
import FooterView from '@/views/FooterView.vue'
import { useCollapseSidebarStore } from '@/stores/collapseSidebar'

const collapseSidebarStore = useCollapseSidebarStore()
</script>

<template>
  <div class="w-full h-full flex">
    <div class="sider" :class="collapseSidebarStore.isCollapsed ? 'w-20' : 'w-50'">
      <SiderView />
    </div>
    <div class="right flex-1 flex flex-col">
      <div class="header h-15 bg-amber-200">
        <HeaderView />
      </div>
      <div class="main p-5 flex-1 bg-amber-100">
        <router-view />
      </div>
      <div class="footer h-10 bg-amber-200">
        <FooterView />
      </div>
    </div>
  </div>
</template>
