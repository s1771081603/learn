import { createRouter, createWebHashHistory } from "vue-router";

export const pages = [
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/pages/404.vue')
  }
]
export const modules = {}

const router = createRouter({
  history: createWebHashHistory(),
  routes: pages.concat(modules)
})

export default router