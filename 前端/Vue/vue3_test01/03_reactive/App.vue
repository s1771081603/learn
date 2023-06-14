<template>
  <div>
    <h1>reactive 函数</h1>
    <ol>
      <li>作用： 定义一个对象类型的响应式数据，基本类型用 ref 。</li>
      <li>语法： const xxx = reactive(源对象)，接收一个对象或者数组，返回一个代理对象（ Proxy 实例对象）。</li>
      <li>reactive 定义的响应式数据是“深层次的”。</li>
      <li>内部基于 ES6 的 Proxy 实现的，通过代理对象操作对象内部数据进行操作。</li>
    </ol>
  </div>
  
  <div>
    <h1>{{ person.name }}的信息</h1>
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <h2>职业：{{ person.type }}</h2>
    <h2>薪资：{{ person.salary }}</h2>
    <h2 >爱好：<span v-for="i in person.hobby">{{ i }} &nbsp;</span></h2>
    <button @click="changInfo">修改{{ person.name }}的信息</button>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  name: 'APP',
  
  setup(){

    let person = reactive({
      name: '宋利生',
      age: 26,
      type:'前端工程师',
      salary: '15K',
      hobby: ['打游戏','睡觉']
    })

    function changInfo() {
      if (person.name == '宋利生') {
        person.name = '蔡露'
        person.type = 'UI设计师'
        person.salary = '13K'
        person.hobby[0] = '旅游'
      } else {
        person.name = '宋利生'
        person.type = '前端工程师'
        person.salary = '15K'
        person.hobby[0] = '打游戏'
      }
    }

    return{
      person,
      changInfo
    }
  }
}
</script>
