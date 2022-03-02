import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
	{
		path: "/",
		redirect: () => ({path: "/home"})
	},{
		path: "/home",
		name: "home",
		component: () => import("@/views/home")
	},{
		path: "/commodity",
		name: "commodity",
		component: () => import("@/views/commodity")
	},{
		path: "/shopping_cart",
		name: "shopping_cart",
		component: () => import("@/views/shopping_cart")
	},{
		path: "/personal_center",
		name: "personal_center",
		component: () => import("@/views/personal_center")
	},
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
