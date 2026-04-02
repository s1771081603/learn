import { createRouter, createWebHistory } from "vue-router"

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("@/views/Home.vue"),
        meta: {
            title: "首页",
            keepAlive: true // 需要缓存
        }
    },
    {
        path: "/seo",
        name: "SEO",
        component: () => import("@/views/01_day/SEO.vue"),
        meta: {
            title: "SEO 优化",
            keepAlive: true // 需要缓存
        }
    },
    {
        path: "/404",
        name: "NotFound",
        component: () => import("@/views/NotFound.vue"),
        meta: {
            title: "页面未找到 - 404"
        }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
})

// 路由守卫
router.beforeEach((to, from) => {
    // 设置页面标题
    if (to.meta.title) {
        document.title = to.meta.title as string
    }

    // 如果已经是 404 页面，直接放行
    if (to.name === "NotFound") return true

    // 检查路由是否存在
    const matchedRoute = router.getRoutes().find((route) => route.name === to.name)

    // 如果路由不存在，跳转到 404 页面
    if (!matchedRoute && to.path !== "/") {
        return "/404"
    }
    return true
})

export default router
