<template>
  <div>
    <h1>拉开序幕的 setup</h1>
    <ol>
      <li>理解：Vue3 中一个新的配置项，值为一个函数。</li>
      <li>setup 是所有的 composition API （组合式API）。</li>
      <li>组件中所用到的：数据，方法等，都要配置在 setup 中。</li>
      <li>setup 的两种返回值
        <ol>
          <li>若返回一个对象，则对象中的属性、方法都可以在模板中直接使用。</li>
          <li>若返回一个渲染函数，则可以自定义渲染函数中的内容。</li>
        </ol>
      </li>
      <li>注意点：
        <ol>
          <li>尽量不要与 vue2 配置混用
            <ul>
              <li>vue2 的配置（data、methods、computed）中可以访问到 setup 中的属性、方法。</li>
              <li>但是在 setup 中不能访问到 vue2 配置（data、methods、computed）。</li>
              <li>如果有重名 setup 优先</li>
            </ul>
          </li>
          <li>setup 不能是一个 async 函数，因为返回值不再是 return 的对象，而是 promise 对象，模板看不到 return 的对象中的属性。</li>
        </ol>
      </li>
    </ol>
  </div>
  
  <div>
    <h1>{{ name }}的信息</h1>
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <h2>性别：{{ sex }}</h2>
    <button @click="sayHello">Vue3 配置的 sayHello</button>&nbsp;
    <button @click="sayWelcome">Vue2 配置的 sayWelcome</button>
  </div>
</template>

<script>
export default {
  name: 'APP',
  data(){
    return {
      sex: '男'
    }
  },
  methods: {
    sayWelcome(){
      console.log('Vue2 的方法');
    }
  },
  setup(){
    let name = '宋利生'
    let age = 26

    function sayHello() {
      console.log(`我叫${ name }，今年${ age }岁。`);
    }

    return{
      name,
      age,
      sayHello,
    }
  }
}
</script>
