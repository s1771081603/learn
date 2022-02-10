<template>
  <van-overlay :show="$store.state.showLogin">
    <div class="common_pop login_pop">
      <p>登录</p>
      <span class="tips hide"></span>
      <div class="telephone">
        <input type="text" placeholder="请输入手机号" id="phoneNumber" maxlength="11">
      </div>
      <div class="code">
        <input type="text" placeholder="请输入验证码" id="codeNumber" maxlength="6">
        <button class="getcode" @click="getSmsCode">获取验证码</button>
      </div>
      <button class="ok" @click="toLogin">登录</button>
      <div class="close" @click="$store.commit('showLogin', false)"><van-icon name="cross" size="24"/></div>
    </div>
  </van-overlay>
</template>

<script>
export default {
  name: 'login',
  methods: {
    // 获取验证码
    getSmsCode() {
      caiYunLoginJs.getDynamicPassword()
    },
    // 手动登录
    toLogin() {
      let vm = this
      caiYunLoginJs.login().then((phone)=>{
        if (typeof limitedAccount !== String(undefined) && limitedAccount.length == 11) {
          vm.logPoint(vm.$parent.pointName + '_limited', vm.sourceid,vm.$parent.pointName?vm.$parent.pointName:"")
        } else {
          vm.logPoint(vm.$parent.pointName + '_user_login', vm.sourceid,vm.$parent.pointName?vm.$parent.pointName:"")
        }
        vm.$store.commit('loginServerNumber',phone)
        vm.$store.commit('isLogin',true)
        vm.$store.commit('showLogin',false)
        sensors.putPhoneNumberInfo(phone)
      })
    },
  }
}
</script>

<style lang='scss' scoped>
.hide{
  display: none!important;
}
.show{
  display: block!important;
}
.login_pop{
  p{
    text-align: center;
    font-size: .35rem;
    line-height: .45rem;
    margin: .2rem 0;
    font-weight: bolder;
  }
  .tips{
    font-size: .22rem;
    color:red;
    height: .3rem;
    display: block;
    margin: .1rem 0;
  }
  input{
    background: #FFFFFF;
    font-size: .25rem;
    line-height: .5rem;
    border-bottom:2px solid #ebebeb;
  }
  .telephone input{
    width:100%;
  }
  .code{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: .3rem;
    input{
      width: 2.94rem;
    }
    button{
      width: 1.72rem;
      background: #1680f6;
      border-radius: .1rem;
      font-size: .25rem;
      line-height: .5rem;
      color: #ffffff;
      text-align: center;
    }
  }
  .ok{
    width: 100%;
    background: #1680f6;
    color: #ffffff;
    border-radius: .1rem;
    font-weight: bolder;
    font-size: .35rem;
    line-height: .8rem;
    margin: .4rem auto 0;
  }
}
</style>