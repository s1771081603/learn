import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'

import Home from '@/views/HomeView.vue'
const commonComponents = defineAsyncComponent(() => import('common-components/App.vue'))
const myResume = defineAsyncComponent(() => import('my-resume/App.vue'))
console.log(commonComponents, 'common')

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
