<template>
	<h1>我是demo组件</h1>
  <h2>当前求和为：{{ sum }}</h2>
  <button @click="sum++">点击+1</button>
	<br>
	<h2>鼠标当前点击页面的坐标为：X：{{ point.x }} Y：{{ point.y }}</h2>
	<div>
		<h1>自定义 hook 函数</h1>
		<ul>
			<li>什么是 hook ？ 本质是一个函数，把 setup 函数中使用的 Composition API 进行了封装。</li>
			<li>类似于 vue2 的 mixin。</li>
			<li>自定义 hook 的优势：复用代码，让 setup 中的逻辑更清楚易懂。</li>
		</ul>
	</div>
</template>

<script>
import { ref } from 'vue';
import usePoint from '../hooks/usePoint'
export default {
  name: 'Dome',
  setup(){
    let sum = ref(0)
		let point = usePoint()

    return{
      sum,
			point
    }
  },
}
</script>
