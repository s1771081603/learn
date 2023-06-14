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
  <button @click="person.age++">修改年龄</button>&nbsp;
  <button @click="person.job.a.b++">修改job</button>
</template>

<script>
import { reactive, ref, watch } from 'vue';

export default {
  name: 'Dome',
  setup(){
    let sum = ref(0)
    let msg = ref('你好')
    let person = reactive({
      name: '宋利生',
      age: 26,
      job:{
        a:{
          b: 10
        }
      }
    })
    // 监听 ref 定义一个的响应式数据
    // watch(sum,(newValue,oldValue)=>{
    //   console.log('sum 的值发生改变',newValue,oldValue);
    // },{
    //   immediate: true,
    //   deep: true
    // })
      
    // 监听 ref 定义多个的响应式数据
    // watch(sum,(newValue,oldValue)=>{
    //   console.log('sum 的值发生改变',newValue,oldValue);
    // })
    // watch(msg,(newValue,oldValue)=>{
    //   console.log('msg 的值发生改变',newValue,oldValue);
    // })
    // watch([sum,msg],(newValue,oldValue)=>{
    //   console.log('msg 的值发生改变',newValue,oldValue);
    // })

    // 监听 reactive 所定义的响应式数据，
    // 此处无法正确的获取 oldvalue
    // 强制开启了深度监视（deep配置无效）
    // watch(person,(newValue,oldValue)=>{
    //   console.log('person 的值发生改变',newValue,oldValue);
    // },{deep:false})// 此处的 deep 配置无效

    // 监听 reactive 所定义的响应式数据中某一个属性
    // watch(()=>person.age,(newValue,oldValue)=>{
    //   console.log('person 中的 age 发生改变',newValue,oldValue);
    // })

    // 监听 reactive 所定义的响应式数据中某些属性
    // watch([()=>person.age,()=>person.name],(newValue,oldValue)=>{
    //   console.log('person 中的 age 发生改变',newValue,oldValue);
    // })

		// 监听 reactive 所定义的响应式数据中某个属性，并且该属性是对象时
    // watch(()=>person.job,(newValue,oldValue)=>{
    //   console.log('person 中的 age 发生改变',newValue,oldValue);
    // },{deep:true})

    return{
      sum,
      msg,
      person,
    }
  }
}
</script>
