<template>
  <div class="Home">
    <van-swipe :autoplay="3000" @change="onChange">
      <van-swipe-item v-for="(image, index) in slides" :key="index">
        <a :href="image.url"><img :src="image.img_url" /></a>
      </van-swipe-item>
    </van-swipe>
    <div class="goods_wrap">
      <div class="goods_list" v-for="(item, index) in goods.data" :key="index">
        <img :src="item.cover_url" :alt="item.title">
        <p class="title f28">
          <span>{{ item.title }}</span><br>
          <span class="text_right block f24">
            <van-icon name="star-o" color="#ccc" size=".24rem"/> 
            {{ item.collects_count }}
          </span>
        </p>
        <div class="desc">
          <p class="prize f40">￥{{item.price}}.00</p>
          <p>
            <span class="f20">
              库存：{{item.stock}}
            </span><br>
            <span class="f20">
              销量：{{item.sales}}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/api';

export default {
  name: 'home',
  data() {
    return {
      categories: [],
      goods: {},
      slides: [],
      current: 0,
    };
  },
  created() {
    api.getHomeData({
      page: 0,
      sales: 1,
      recommend: 1,
      new: 1,
    }).then((res) => {
      this.categories = res.data.categories;
      this.goods = res.data.goods;
      this.slides = res.data.slides;
      // console.log(this.categories);
      console.log(this.goods);
    });
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
  },
};
</script>

<style scoped lang="scss">
.goods_wrap{
  width: 100%;
  .goods_list{
    width: 46%;
    margin: .2rem 2% 0;
    float: left;
    background: #f2f2f2;
    img{
      width: 100%;
      height: 3rem;
    }
    .title{
      padding: 0 .2rem;
      margin: .2rem 0;
      line-height: .4rem;
      height: 1rem;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      .text_right{
        line-height: .3rem;
      }
    }
    .desc{
      padding: 0 .1rem;
      margin: .1rem 0;
      height: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .prize{
        color: red;
        width: 50%;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
