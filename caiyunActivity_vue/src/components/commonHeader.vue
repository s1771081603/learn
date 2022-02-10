<template>
  <div class="header_wrap" :style="wrapStyle">
    <img :src="logoUrl" :style="logoStyle" alt="logo" class="logo">
    <span class="login" :style="loginStyle" v-if="!$store.state.isLogin" @click="$store.commit('showLogin', true)" >登录</span>
    <span class="login" :style="loginStyle" v-else>{{$store.state.loginServerNumber.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")}}</span>
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
      type: Object,
      default: {
        width: '2rem'
      }
    },
    wrapStyle: {
      type: Object,
      default: {
        
      }
    },
    loginStyle: {
      type: Object,
      default: {
        
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .header_wrap{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .12rem .2rem;
    width: 100%;
    .login{
      font-size: .25rem;
      line-height: .45rem;
    }
  }
</style>