import { createRouter, createWebHashHistory } from "vue-router";
import { commonStores } from '@/stores/index'
import http from "@/api";

// 可以在组件中的任意位置访问 `store` 变量 ✨
const commonStore = commonStores()

export const pageRoutes = [
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/pages/404.vue')
  }
]
export const moduleRoutes: any[] = [{

}]

const router = createRouter({
  history: createWebHashHistory(),
  routes: pageRoutes.concat(moduleRoutes)
})

router.beforeEach((to, from, next) => {
  if (window.SITE_CONFIG['dynamicMenuRoutesHasAdded'] || fnCurrentRouteIsPageRoute(to, pageRoutes)) {
    addRouterHis(to);

    if (to.meta.menuId) commonStore.state.sidebarMenuActiveName = to.meta.menuId;
    
    if (to.path === '/portrait/capability' && commonStore.state.user.userType  === 'OUT_TYPE') {
      if (from.path === '/portrait/detail') {
        return next({ name: 'overview', query: { tp: 'default' } })
      } else {
       return next( { name : 'portraitDetail', query: { id : commonStore.state.user.supplierId }, replace: true })
      }

    }
    return next();
  }
  if (to.path === '/auth/secure/aad') return next();

  // debugger
  if (to.redirectedFrom === '/' && window.location.search.includes('code')) return next();
  
  http
    .get('/sys/api/mds/user/permission')
    .then(res => {
      console.log(res);
    })
})

/**
 * 判断当前路由是否为页面路由
 * @param {*} route 当前路由
 * @param {*} pageRoutes 页面路由
 */
function fnCurrentRouteIsPageRoute(route: any, pageRoutes: any = []): any {
  let temp: any = [];
  for (let i = 0; i < pageRoutes.length; i++) {
    if (route.path === pageRoutes[i].path) return true;
    if (route.name === pageRoutes[i].name) return true;
    if (pageRoutes[i].children && pageRoutes[i].children.length >= 1) temp = temp.concat(pageRoutes[i].children);
  }
  return temp.length >= 1 ? fnCurrentRouteIsPageRoute(route, temp) : false;
}

/**
 * 新增路由历史
 * @param {*} route 路由
 */
function addRouterHis(route: any) {
  if (
    commonStore.state.routeList &&
    commonStore.state.routeList.length &&
    commonStore.state.routeList[commonStore.state.routeList.length - 1].name === route.name
  ) return;
  commonStore.state.routeList.push(route);
}

export default router