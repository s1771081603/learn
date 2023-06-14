<template>
  <div>
    <h1>ref 函数</h1>
    <ol>
      <li>作用：定义一个响应式的数据。</li>
      <li>语法：const xxx = ref(initValue)。
        <ol>
          <li>创建一个包含响应式数据的引用对象（ reference 对象，简称 ref 对象）。</li>
          <li>JS 中操作数据：xxx.value</li>
          <li>模板中读取数据，不需要 .value 直接引用。</li>
        </ol>
      </li>
      <li>备注：
        <ol>
          <li>接收的数据可以是基本类型，也可以是对象类型。</li>
          <li>基本类型的数据：响应式依然是靠 Object.defineProperty() 的 get 和 set 完成的。</li>
          <li>对象类型的数据：内部求助了 Vue3 中的一个新函数 reactive 函数。</li>
        </ol>
      </li>
    </ol>
  </div>
  
  <div>
    <h1>{{ name }}的信息</h1>
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <h2>职业：{{ obj.type }}</h2>
    <h2>薪资：{{ obj.salary }}</h2>
    <button @click="changInfo">修改{{ name }}的信息</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'APP',
  
  setup(){
    let name = ref('宋利生')
    let age = ref(26)
    let obj = ref({
      type: '前端工程师',
      salary: '15K'
    })

    function changInfo() {
      if (name.value == '宋利生') {
        name.value = '蔡露'
        obj.value.type = 'UI设计师'
        obj.value.salary = '13K'
      } else {
        name.value = '宋利生'
        obj.value.type = '前端工程师'
        obj.value.salary = '15K'
      }
    }

    return{
      name,
      age,
      obj,
      changInfo
    }
  }
}
</script>
