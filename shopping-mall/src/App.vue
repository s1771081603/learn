<template>
  <div class="wrap">
    <van-overlay :show="$store.state.showLoading"><van-loading type="spinner" color="#1989fa" size="32" /></van-overlay>
    <div class="content">
      <router-view />
    </div>
    <div class="tabbar">
      <router-link to="/home"><van-icon name="home-o" size="26"/><br>首页</router-link>
      <router-link to="/bag"><van-icon name="bag-o" size="26"/><br>购物中心</router-link>
      <router-link to="/cart"><van-icon name="cart-o" size="26" :badge="$store.state.cartNum?$store.state.cartNum:''"/><br>购物车</router-link>
      <router-link to="/user"><van-icon name="user-o" size="26"/><br>个人中心</router-link>
    </div>
    <LoginPop/>
    <RegisterPop/>
  </div>
</template>
<script>
import LoginPop from '@/components/login'
import RegisterPop from '@/components/register'
export default {
  components: {
    LoginPop,
    RegisterPop
  }
}
</script>
<style lang="scss" scoped>
.wrap{
  width: 7.5rem;
  height: 100vh;
  position: relative;
  left: 0;
  top: 0;
  .van-overlay{
    .van-loading{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
  }
  .content{
    height: calc(100% - 1.2rem);
  }
  .tabbar{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1.2rem;
    display: flex;
    background: rgba($color: #ccc, $alpha: .2);
    a{
      width: 25%;
      height: 100%;
      text-align: center;
      font-size: .23rem;
      padding: .2rem;
      letter-spacing: .03rem;
      color: #000;
      i{
        margin-bottom: .1rem;
      }
      &.router-link-exact-active{
        color: #1989fa;
      }
    }
  }
}
</style>
