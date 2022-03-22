<template>
  <div id="app">
    <div class="mask showLoading" v-if="$store.state.showLoading">
      <van-loading type="spinner" size=".6rem" />
    </div>
    <header class="f34 text_center cfff">懒人购物</header>
    <div class="centent"><router-view/></div>
    <van-tabbar v-model="active">
      <router-link class="van-tabbar-item" to="/Home">
        <van-tabbar-item name="Home" icon="wap-home-o">首页</van-tabbar-item>
      </router-link>
      <router-link class="van-tabbar-item" to="/ProductList">
        <van-tabbar-item name="ProductList" icon="bag-o">商品列表</van-tabbar-item>
      </router-link>
      <router-link class="van-tabbar-item" to="/ShoppingCart">
        <van-tabbar-item name="ShoppingCart" icon="shopping-cart-o">购物车</van-tabbar-item>
      </router-link>
      <router-link class="van-tabbar-item" to="/PersonalCenter">
        <van-tabbar-item name="PersonalCenter" icon="manager-o">个人中心</van-tabbar-item>
      </router-link>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      active: 'Home',
    };
  },
  mounted() {
    this.active = window.location.href.split('/')[3];
  },
};
</script>

<style lang="scss" scoped>
#app{
  width: 100%;
  height: 100%;
  header{
    height: .8rem;
    background: linear-gradient(#3989ff,#5999fa);
    line-height: .8rem;
    font-weight: bolder;
  }
  .centent{
    height: calc(100% - .8rem - 50px);
    overflow: auto;
  }
  .showLoading{
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
