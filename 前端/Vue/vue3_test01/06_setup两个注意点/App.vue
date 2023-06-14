<template>
  <div>
    <Demo @helloMsg="helloMsg" msg="你好" school="尚硅谷">
      <span>学习学习</span>
    </Demo>
  </div>
</template>

<script>
import Demo from "./components/demo.vue";
export default {
  name: 'APP',
  components: { Demo },
  setup(){
    function helloMsg(value) {
      console.log('helloMsg：', value);
    }

    return{
      helloMsg
    }
  }
}
</script>
