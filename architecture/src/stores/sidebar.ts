import { defineStore } from "pinia"
import { ref } from "vue"

export const sidebarStore = defineStore("sidebar", () => {
    const isCollapse = ref(true)

    const toggleCollapse = () => {
        isCollapse.value = !isCollapse.value
    }
    return {
        isCollapse,
        toggleCollapse
    }
})
