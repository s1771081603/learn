import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import routesMap from './map';
import Index from '@/views/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: 'index'
  },
  {
    path: '/index',
    name: 'index',
    component: Index
  },
  ...routesMap
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  next()
})

export default router
