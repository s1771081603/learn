import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'

import Home from '@/views/HomeView.vue'
// Module Federation 远程模块导入
// 格式：import('remoteName/exposedModule')
const commonComponents = defineAsyncComponent(() => import('common-components/App'))
const myResume = defineAsyncComponent(() => import('my-resume/App'))

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/common-components',
      name: 'common-components',
      component: commonComponents
    },
    {
      path: '/my-resume',
      name: 'my-resume',
      component: myResume
    }
  ]
})
export default router
