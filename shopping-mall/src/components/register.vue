<template>
 <van-overlay :show="$store.state.showRegister">
   <div class="commomPop register">
      <h2 class="title">注&nbsp;册</h2>
      <span class="close" @click="$store.commit('showRegister', false)"><van-icon name="cross" size="28"/></span>
      <div class="input">
        <label for="name">昵称：</label>
        <input type="text" id="name" placeholder="请输入昵称" v-model="name">
      </div>
      <div class="input">
        <label for="regEmail">邮箱：</label>
        <input type="text" id="regEmail" placeholder="请输入邮箱" v-model="regEmail">
      </div>
      <div class="input">
        <label for="regPassword">密码：</label>
        <input type="password" id="regPassword" placeholder="请输入密码" v-model="regPassword">
      </div>
      <div class="input">
        <label for="password_confirmation">确认密码：</label>
        <input type="password" id="password_confirmation" placeholder="请重新输入密码" v-model="password_confirmation">
      </div>
      <div class="input">
        <label for="file">上传头像：</label>
        <van-uploader id="file" max-count="1" v-model="fileList" />
      </div>
      <button class="btn" @click="clickSubmit">登录</button>
      <p class="tips">如果您已经注册，请登录账号！<span @click="clickLogin">去登录</span></p>
   </div>
 </van-overlay>
</template>

<script>
export default {
  name: 'register',
  data(){
    return{
      name: '',
      regEmail: '',
      regPassword: '',
      password_confirmation: '',
      avatar: '',
      fileList: [],
    }
  },
  methods: {
    clickSubmit(){
      // console.log(this.fileList);
    },
    clickLogin(){
      this.$store.commit('showRegister',false)
      this.$store.commit('showLogin',true)
    },
  }
}
</script>

<style lang="scss" scoped>
</style>