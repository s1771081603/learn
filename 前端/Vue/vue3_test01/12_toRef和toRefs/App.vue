<template>
  <div>
    <button @click="isShowDemo = !isShowDemo">{{isShowDemo ? '隐藏' : '显示'}}Demo</button>
    <Demo v-if="isShowDemo"/>
  </div>
</template>

<script>
import { ref } from "vue";
import Demo from "./components/demo.vue";
export default {
  name: 'APP',
  components: { Demo },
  setup(){
    let isShowDemo = ref(true)
    return{
      isShowDemo
    }
  }
}
</script>
