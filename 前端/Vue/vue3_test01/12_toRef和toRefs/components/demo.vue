<template>
  <h2>{{ person }}</h2>
	<h2>姓名：{{ name }}</h2>
	<h2>年龄：{{ age }}</h2>
	<h2>薪资：{{ job.a.salary }}</h2>
	<button @click="name += '~'">修改姓名</button>&nbsp;
	<button @click="age ++">修改年龄</button>&nbsp;
	<button @click="job.a.salary ++">修改薪资</button>
	<div>
		<h1>toRef</h1>
		<ul>
			<li>作用：创建一个 ref 对象，其 value 值指向另一个对象中的某个属性。</li>
			<li>语法 let *** = toRef(target, propName)</li>
			<li>应用：要将响应式对象中的某个属性单独提供给外部使用。</li>
			<li>扩展：toRefs 与 toRef 功能更一致，但可以批量创建多个 ref 对象，语法 toRefs(person)</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { reactive, toRef, toRefs } from 'vue';
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

    return{
      person,
		  // name: toRef(person,'name'),
      // age: toRef(person,'age'),
      // salary: toRef(person.job.a,'salary')
      ...toRefs(person)
    }
  },
}
</script>
