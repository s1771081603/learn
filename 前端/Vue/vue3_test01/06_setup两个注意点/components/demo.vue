<template>
    <div>
      <h1>setup 的两个注意点</h1>
      <ol>
        <li>setup 的执行时机
          <ul>
            <li>在 beforeCreate 之前执行一次，this 是 undefined</li>
          </ul>
        </li>
        <li>setup 的参数
          <ul>
            <li>props：值为对象，组件外部传递过来，且组件内部声明了接收的属性。</li>
            <li>context：上下文
              <ul>
                <li>attrs：值为对象，包含：组件外部传递过来，但没有在 props 配置中声明的属性，相当于 this.$attrs。</li>
                <li>slots：收到的插槽内容，相当于 this.$slots。</li>
                <li>emit：分发自定义事件的函数，相当于this.$emit。</li>
              </ul>
            </li>
          </ul>
        </li>
      </ol>
    </div>
    
    <div>
      <h1>{{ person.name ? person.name : 'XXX' }}的信息</h1>
      <h2 v-show="person.name">姓名：{{ person.name }}</h2>
      <h2>年龄：{{ person.age }}</h2>
			<button @click="test">helloMsg</button>
    </div>
  </template>
  
  <script>
  import { reactive } from 'vue';
  
  export default {
    name: 'Dome',
    beforeCreate(){
			// console.log('---beforeCreate---', this);
		},
		props: ['msg','school'],
		emits: ['helloMsg'],
    setup(props,context){
    	// console.log('---setup---', this);
    	// console.log('---setup---', props); // 相当于 vue2 里的 props
    	// console.log('---setup---', context.attrs); // 相当于 vue2 里的 $attrs
    	// console.log('---setup---', context.emit('helloMsg','123')); // 相当于 vue2 里的 emit
    	// console.log('---setup---', context.slots); // 相当于 vue2 里的 $slots

      let person = reactive({
        name: '宋利生',
        age: 26
      })
			
			function test() {
				context.emit('helloMsg',123)
			}
      return{
        person,
				test
      }
    }
  }
  </script>
  