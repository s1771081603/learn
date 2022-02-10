<template>
  <van-overlay :show="show">
    <div class="common_pop">
      <div class="close" v-show="closeShow" @click="closeClick"><van-icon name="cross" size="22"/></div>
      <div class="title" v-show="titleShow" v-html="title"></div>
      <div class="text" v-show="textShow" v-html="text"></div>
      <button class="btn" v-show="btnShow" @click="btnClick">{{ btnText }}</button>
    </div>
  </van-overlay>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: true
    },
    closeShow: {
      type: Boolean,
      default: true,
    },
    closeClick: {
      type: Function,
    },
    titleShow: {
      type: Boolean,
    },
    title: {
      type: String,
    },
    textShow: {
      type: Boolean,
    },
    text: {
      type: String,
    },
    btnShow: {
      type: Boolean,
    },
    btnClick: {
      type: Function,
    },
    btnText: {
      type: String,
    },
  }
}
</script>

<style lang="scss" scoped>
</style>