import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCollapseSidebarStore = defineStore('collapseSidebar', () => {
  const isCollapsed = ref<boolean>(false)

  function toggleCollapsed() {
    isCollapsed.value = !isCollapsed.value
  }

  return {
    isCollapsed,
    toggleCollapsed
  }
})
