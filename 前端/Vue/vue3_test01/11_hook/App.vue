<template>
  <div>
    <button @click="isShowDemo = !isShowDemo">{{isShowDemo ? '隐藏' : '显示'}}Demo</button>
    <Demo v-if="isShowDemo"/>
    <hr>
    <Test/>
  </div>
</template>

<script>
import { ref } from "vue";
import Demo from "./components/demo.vue";
import Test from "./components/test.vue";
export default {
  name: 'APP',
  components: { Demo,Test },
  setup(){
    let isShowDemo = ref(true)
    return{
      isShowDemo
    }
  }
}
</script>
