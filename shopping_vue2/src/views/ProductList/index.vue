<template>
  <div class="product_wrap">
    <van-sidebar class="product_left" v-model="activeKey" >
       <van-sidebar-item :title="item.name" v-for="(item, index) in categories" :key="index" @click="GoToProduct(item.id)"/>
    </van-sidebar>
    <div class="product_right">
      
    </div>
  </div>
</template>

<script>
import api from '@/api/api'

export default {
  name: 'productList',
  data() {
    return {
      activeKey: -1,
      title: '', // 商品名模糊搜索
      category_id: '', // 分类搜索
      goodsList: [], // 商品列表
      categories: [], // 分类
      recommend_goods: [], // 推荐商品
      goods: [], // 商品
    }
  },
  created() {
    this.getProductData();
  },
  methods: {
    getProductData(){
      api.getProductData().then((res) => {
        let data = res.data;
        this.categories = data.categories;
        this.recommend_goods = data.recommend_goods;
        this.goods = data.goods;
      })
    },
    GoToProduct(category_id) {
      api.getProductData({
        category_id: category_id, // 分类搜索
      }).then((res) => {
        let data = res.data;
        this.categories = data.categories;
        this.recommend_goods = data.recommend_goods;
        this.goods = data.goods;
        console.log(res);
      })
    },
  }
};
</script>

<style scoped lang="scss">
.product_wrap{
  height: 100%;
  overflow: auto;
  position: relative;
  .product_left{
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
  }
  .product_right{
    position: absolute;
    right: 0;
    top: 0;
    width: calc(100% - 80px);
    height: 100%;
    overflow: auto;
  }
}
.van-sidebar-item--select::before{
  background-color: #3989ff;
}
</style>
