<template>
  <div class="home_wrap">
    <div class="title">懒人商城</div>
    <div class="home_content">
      <!-- 轮播图 -->
      <van-swipe style="height: 4rem;" :autoplay="3000">
        <van-swipe-item v-for="(image, index) in slides" :key="index">
          <img :src="image.img_url" style="width: 100%;height: 100%"/>
        </van-swipe-item>
      </van-swipe>
      <!-- 推荐商品 -->
      <van-grid :column-num="5" gutter=".1rem" style="margin:.1rem 0">
        <van-grid-item v-for="(item,index) in goods.data" :key="index" text="文字">
          <van-image :src="item.cover_url" />
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import axios from '../services/index'
export default {
  name: "home",
  data(){
    return{
      categories: [],
      slides: [],
      goods: {},
    }
  },
  created(){
    axios.get('/api/index',{
      params: {
        'page': 1,
        'sales': 1,
        'recommend': 1,
        'new': 1
      },
      headers: {
        showLoading: true
      }
    }).then(res => {
      let data = res.data
      this.categories = data.categories
      this.slides = data.slides
      this.goods = data.goods
    });
  },
}
</script>

<style lang="scss" scoped>
.home_wrap{
  width: 100%;
  height: 100%;
  .title{
    width: 100%;
    height: .8rem;
    font-size: .3rem;
    line-height: .8rem;
    text-align: center;
    font-weight: bolder;
    color: #000;
    background: rgba($color: #ccc, $alpha: .2);
  }
  .home_content{
    width: 100%;
    height: calc(100% - 46px);
    background: rgba($color: #000000, $alpha: .6);
    overflow-y: auto;
  }
}
</style>