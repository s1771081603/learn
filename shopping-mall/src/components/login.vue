<template>
  <van-overlay :show="$store.state.showLogin">
    <div class="commomPop login">
      <h2 class="title">登&nbsp;录</h2>
      <span class="close" @click="$store.commit('showLogin', false)"><van-icon name="cross" size="28"/></span>
      <div class="input">
        <label for="loginEmail">邮箱：</label>
        <input type="text" id="loginEmail" placeholder="请输入邮箱" v-model="loginEmail">
      </div>
      <div class="input">
        <label for="loginPassword">密码：</label>
        <input type="password" id="loginPassword" placeholder="请输入密码" v-model="loginPassword">
      </div>
      <button class="btn" @click="clickSubmit">登录</button>
      <p class="tips">如果您还未注册，请先注册！<span @click="clickRegister">去注册</span></p>
    </div>
  </van-overlay>
</template>

<script>
export default {
  name: 'login',
  data(){
    return{
      loginEmail: '',
      loginPassword: '',
    }
  },
  methods: {
    clickSubmit(){

    },
    clickRegister(){
      this.$store.commit('showLogin',false)
      this.$store.commit('showRegister',true)
    }
  }
}
</script>