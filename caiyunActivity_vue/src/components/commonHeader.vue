<template>
  <div class="header_wrap" :style="wrapStyle">
    <img :src="logoUrl" :style="logoStyle" alt="logo" class="logo">
    <span class="login" :style="loginStyle" v-show="isShowLoginText" v-if="!$store.state.isLogin" @click="$store.commit('showLogin', true)" >登录</span>
    <span class="login" :style="loginStyle" v-show="isShowLoginText" v-else>{{$store.state.loginServerNumber.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")}}</span>
  </div>
</template>

<script>
export default {
  name:'header_login',
  props:{
    logoUrl: {
      type: String,
      default: `${require('@/assets/images/logo_01.png')}`
    },
    logoStyle: {
      type: Object
    },
    wrapStyle: {
      type: Object
    },
    loginStyle: {
      type: Object
    },
  },
  data(){
    return{
      isShowLoginText: false
    }
  },
  created() {
    if (this.isApp || this.isMiniProgram){
      this.isShowLoginText = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .header_wrap{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .15rem .2rem 0;
    width: 100%;
    .login{
      font-size: .2rem;
    }
  }
</style>