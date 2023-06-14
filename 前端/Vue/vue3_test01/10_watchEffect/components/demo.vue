<template>
  <h2>当前求和为：{{ sum }}</h2>
  <button @click="sum++">点击+1</button>
  <hr>
  <h2>当前信息为：{{ msg }}</h2>
  <button @click="msg+='!'">修改信息</button>
  <hr>
  <h2>个人信息</h2>
  <h3>姓名：{{ person.name }}</h3>
  <h3>年龄：{{ person.age }}</h3>
  <button @click="person.name += '~'">修改姓名</button>&nbsp;
  <button @click="person.age++">修改年龄</button>

	<div>
		<h1>watchEffect 函数</h1>
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
import { ref, watch, watchEffect } from 'vue';

export default {
  name: 'Dome',
  setup(){
    let sum = ref(0)
    let msg = ref('你好')
    let person = ref({
      name: '宋利生',
      age: 26
    })
    // 监听ref定义的基本数据不需要加value
		// watch(sum,(newValue,oldValue)=>console.log(newValue,oldValue))
		// 监听 ref 定义的数组或者对象的数据需要加 .value 或者开启深度监听
		// watch(person.value,(newValue,oldValue)=>console.log(newValue,oldValue))
		// watch(person,(newValue,oldValue)=>console.log(newValue,oldValue),{deep:true})
		watchEffect(()=>{
			const test01 = sum.value
			console.log('watchEffect 所指定的回调执行了');
		})
    return{
      sum,
      msg,
      person
    }
  }
}
</script>
