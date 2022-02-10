import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: 'home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home')
    },
    {
      path: '/bag',
      name: 'bag',
      component: () => import('@/views/bag/index')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/cart/index')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/user/index')
    },
  ]
})

export default router
