<template>
    <div>
      <h1>个人信息</h1>
      姓：<input type="text" v-model="person.firstName"><br>
      名：<input type="text" v-model="person.lastName"><br>
      <h2>全名：{{ person.fullName }}</h2>
      <h2>全名：<input type="text" v-model="person.fullName"></h2>
    </div>
  </template>
  
  <script>
  import { reactive,computed } from 'vue';
  
  export default {
    name: 'Dome',
    setup(){
      let person = reactive({
        firstName: '宋',
        lastName: '利生'
      })
      // computed 简写
			// person.fullName = computed( ()=> person.firstName + '-' + person.lastName )
      // computed 完整写法
			person.fullName = computed({
        get(){
         return person.firstName + '-' + person.lastName
        },
        set(value){
          let nameArr = value.split('-');
          person.firstName = nameArr[0]
          person.lastName = nameArr[1]
        }
      })
      
      return{
        person
      }
    }
  }
  </script>
  