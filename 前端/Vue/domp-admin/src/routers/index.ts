import { createRouter, createWebHashHistory } from "vue-router";

export const pages = []
export const modules = {}

const router = createRouter({
  history: createWebHashHistory(),
  routes: pages.concat(modules)
})

export default router