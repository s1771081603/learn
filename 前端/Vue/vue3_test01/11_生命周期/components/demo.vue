<template>
  <h2>当前求和为：{{ sum }}</h2>
  <button @click="sum++">点击+1</button>
  <hr>

	<div>
		<h1>vue3 生命周期</h1>
		<ul>
			<li>watch 的套路是：既要指明监听的属性，也要指明监听的回调。</li>
			<li>warchEffect 的套路是：不用指明监听的属性，监听中用到哪个属性，那监听的就是哪个属性。</li>
			<li>watchEffect 有点想 computed ：
				<ul>
					<li>但是 computed 注重的是计算出来的值（回调函数的返回值），所以必须写返回值。</li>
					<li>而 watchEffect 更注重的是过程（回调函数的函数体），所以不用写返回值。</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
import { onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref } from 'vue';

export default {
  name: 'Dome',
  setup(){
    let sum = ref(0)

		// 通过组合式API的形式使用生命周期钩子
		onBeforeMount(()=>{
			console.log('---onBeforeMount---');
		})
		onMounted(()=>{
			console.log('---onMounted---');
		})
		onBeforeUpdate(()=>{
			console.log('---onBeforeUpdate---');
		})
		onUpdated(()=>{
			console.log('---onUpdated---');
		})
		onBeforeUnmount(()=>{
			console.log('---onBeforeUnmount---');
		})
		onUnmounted(()=>{
			console.log('---onUnmounted---');
		})

    return{
      sum
    }
  },
	//#region 
	// beforeCreate(){
	// 	console.log('---beforeCreate---');
	// },
	// created(){
	// 	console.log('---created---');
	// },
	// beforeMount(){
	// 	console.log('---beforeMount---');
	// },
	// mounted(){
	// 	console.log('---mounted---');
	// },
	// beforeUpdate(){
	// 	console.log('---beforeUpdate---');
	// },
	// updated(){
	// 	console.log('---beforeCreate---');
	// },
	// beforeUnmount(){
	// 	console.log('---beforeUnmount---');
	// },
	// unmounted(){
	// 	console.log('---unmounted---');
	// }
	//#endregion

}
</script>
