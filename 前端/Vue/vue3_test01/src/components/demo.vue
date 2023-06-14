<template>
  <h2>{{ person }}</h2>
	<h2>姓名：{{ person.name }}</h2>
	<h2>年龄：{{ person.age }}</h2>
	<h2>薪资：{{ person.job.a.salary }}</h2>
	<button @click="person.name += '~'">修改姓名</button>&nbsp;
	<button @click="person.age ++">修改年龄</button>&nbsp;
	<button @click="person.job.a.salary ++">修改薪资</button>

	<div>
		<h1>shallowReactive 与 shallowRef</h1>
		<ul>
			<li>shallowReactive：只处理对象最外层属性的响应式（浅层响应式）。</li>
			<li>shallowRef：只处理基本数据类型的响应式，不进行对象的响应式处理。</li>
			<li>什么时候用？
				<ul>
					<li>如果有一个对象数据，结构比较深，但变化时只是外层属性变化 ==> shallowReactive 。</li>
					<li>如果有一个对象数据，后续功能不会修改该对象中的属性，而是生成新对象来替换 ==> shallowRef 。</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { reactive, shallowReactive, shallowRef } from 'vue';
export default {
  name: 'Dome',
  setup(){
    let person = reactive({
		name: '宋利生',
		age: 26,
		job: {
			a: {
				salary: 20
			}
		}
	})

	// let person = shallowReactive({
	// 	name: '宋利生',
	// 	age: 26,
	// 	job: {
	// 		a: {
	// 			salary: 20
	// 		}
	// 	}
	// })
	
	// let person = shallowRef({
	// 	name: '宋利生',
	// 	age: 26,
	// 	job: {
	// 		a: {
	// 			salary: 20
	// 		}
	// 	}
	// })

    return{
      person
    }
  },
}
</script>
