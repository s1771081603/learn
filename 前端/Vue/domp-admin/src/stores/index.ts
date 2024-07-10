import { defineStore } from "pinia";
import { reactive } from "vue";
import { cloneDeep } from "lodash";

export const commonStores = defineStore('commonStores', () => {
  let user: any = reactive({
    id: 0,
    name: '',
    realName: '',
    superAdmin: 0,
    superTenant: 0,
    tenantName: '',
    count: 0
  })

  const updateUser = (users: any) => {
    user = {
      ...user,
      ...users
    }
  }

  const state: any = reactive({
    // 导航条, 布局风格, defalut(白色) / colorful(鲜艳)
    navbarLayoutType: 'colorful',
    // 侧边栏, 布局皮肤, default(白色) / dark(黑色)
    sidebarLayoutSkin: 'dark',
    // 侧边栏, 折叠状态
    sidebarFold: false,
    // 侧边栏, 菜单
    sidebarMenuList: [],
    sidebarMenuActiveName: '',
    // 内容, 是否需要刷新
    contentIsNeedRefresh: false,
    // 内容, 标签页(默认添加首页)
    contentTabs: [
      {
        ...window.SITE_CONFIG['contentTabDefault'],
        'name': 'home',
        'title': 'home'
      }
    ],
    contentTabsActiveName: 'home'
  })

  const resetStore = () => {
    Object.keys(state).forEach((key) => {
      state[key] = cloneDeep (window.SITE_CONFIG['storeState'][key])
    })
  }

  return {
    user,
    updateUser,
    state,
    resetStore
  }
})
