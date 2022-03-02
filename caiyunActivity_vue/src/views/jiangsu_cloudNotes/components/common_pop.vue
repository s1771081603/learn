<template>
  <van-overlay :show="show">
    <div class="common_pop com_pop">
      <div class="content_wrap">
        <div class="title" v-show="titleShow" v-html="title"></div>
        <div class="text" v-show="textShow" v-html="text"></div>
      </div>
      <button class="btn" v-show="btnShow" @click="btnClick">{{btnText}}</button>
    </div>
  </van-overlay>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean
    },
    titleShow: {
      type: Boolean
    },
    title: {
      type: String
    },
    textShow: {
      type: Boolean
    },
    text: {
      type: String
    },
    btnShow: {
      type: Boolean
    },
    btnText: {
      type: String
    },
    btnClick:{
      type: Function
    }
  }
}
</script>

<style lang="scss" scoped>
  .com_pop{
    width: 5.6rem;
    height: 6.3rem;
    background: url("../images/commonBg.png") no-repeat;
    background-size: 100% 100%;
    .content_wrap{
      width: 4.6rem;
      height: 2rem;
      position: absolute;
      left: .5rem;
      bottom: 1.55rem;
      color: #4C4C4C;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      padding: .15rem 0;
      .title{
        font-size: .3rem;
        line-height: .45rem;
        font-weight: bold;
        text-align: center;
      }
      .text{
        font-size: .2rem;
        line-height: .35rem;
        text-align: left;
      }
    }
    .btn{
      width: 3rem;
      height: 0.7rem;
      font-size: 0.36rem;
      line-height: .7rem;
      font-weight: bold;
      color: #705101;
      background: #FFE68C;
      box-shadow: .03rem .03rem rgba(41, 62, 134, 0.5);
      border-radius: .35rem;
      position: absolute;
      left: 1.3rem;
      bottom: .35rem;
    }
  }
</style>