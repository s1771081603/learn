<template>
	<div id="app">
		<router-view />
		<van-tabbar route fixed z-index="99" border >
			<van-tabbar-item to="/home" icon="wap-home">首页</van-tabbar-item>
			<van-tabbar-item to="/commodity" icon="bag">商品</van-tabbar-item>
			<van-tabbar-item to="/shopping_cart" icon="shopping-cart" badge="10">购物车</van-tabbar-item>
			<van-tabbar-item to="/personal_center" icon="manager" badge="15">个人中心</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
import Vue from 'vue';
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar);
Vue.use(TabbarItem)

export default {
	name: "app",
	data(){
		return{
			
		}
	},
}
</script>
<style lang="scss" scoped>
	
</style>