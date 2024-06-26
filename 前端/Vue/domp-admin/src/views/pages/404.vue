<template>
  <div class="flex-center content-wrap flex-column">
    <div class="img-wrap flex-center">
      <div class="title">404</div>
    </div>
    <div class="m-t-20 m-b-20 f-18" v-html="$t('notFound.desc')"></div>
    <div class="flex a-i-center j-s-space-between">
      <el-button @click="$router.go(-1)">
        <el-icon class="m-r-10"><ArrowLeft /></el-icon>
        返回
      </el-button>
      <el-button type="primary" class="m-l-15" @click="$router.push({ path: '/home' })">
        <el-icon class="m-r-10"><House /></el-icon>
        首页
      </el-button>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.content-wrap{
  height: 100vh;
  .img-wrap{
    width: 225px;
    height:145px;
    background: url("@/assets/img/404-bg.png");
    .title {
      line-height: 145px;
      font-size: 100px;
      font-weight: bold;
      text-align: center;
      color: #69B983;
    }
  }
}
</style>