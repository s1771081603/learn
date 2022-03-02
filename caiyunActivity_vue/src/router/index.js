import Vue from 'vue'
import Router from 'vue-router'
import routesMap from './map/' // 路由映射
Vue.use(Router)

const router = new Router({
  mode: 'hash', //生产环境使用history模式
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'index'
    },
    {
      path: '/index',
      name: 'index',
      component: ()=> import('@/views/index')
    },
    {
      path: "*",
      redirect: "index"
    },
    ...routesMap
  ]
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router;
