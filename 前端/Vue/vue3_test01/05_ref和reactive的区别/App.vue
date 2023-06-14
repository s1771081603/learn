<template>
  <div>
    <h1>reactive 对比 ref</h1>
    <ol>
      <li>从定义数据的角度对比
        <ul>
          <li>ref 用来定义基本类型数据。</li>
          <li>reactive 用来定义对象或者数组类型的数据。</li>
          <li>备注：ref 也可以用来定义对象或者数组类型数据，它内部会自动通过 reactive 转换为代理对象，。</li>
        </ul>
      </li>
      <li>从原理角度对比
        <ul>
          <li>ref 通过 Object.defineProperty() 的 get 和 set 来实现响应式（数据劫持）。</li>
          <li>reactive 通过使用 Proxy 来实现响应式（数据劫持），并通过 Reflect 操作源对象内部的数据。</li>
        </ul>
      </li>
      <li>从使用角度对比
        <ul>
          <li>ref 定义的数据：操作数据需要 .value ，读取数据时，模板中直接读取，不需要 .value。</li>
          <li>reactive 定义的数据：操作数据读取数据都不需要 .value 。</li>
        </ul>
      </li>
    </ol>
  </div>
  
  <div>
    <h1>{{ person.name ? person.name : 'XXX' }}的信息</h1>
    <h2 v-show="person.name">姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <h2>职业：{{ person.type }}</h2>
    <h2>薪资：{{ person.salary }}</h2>
    <h2 v-show="person.sex">性别：{{ person.sex }}</h2>
    <h2 >爱好：<span v-for="i in person.hobby">{{ i }} &nbsp;</span></h2>
    <button @click="changInfo">修改{{ person.name }}的信息</button>&nbsp;
    <button @click="addSex">添加性别</button>&nbsp;
    <button @click="deleteName">删除姓名</button>
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

    function addSex() {
      person.sex = '男'
    }
    function deleteName() {
      delete person.name
    }

    return{
      person,
      changInfo,
      addSex,
      deleteName
    }
  }
}
</script>
