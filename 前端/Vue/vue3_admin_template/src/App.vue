<template>
  <home @click="onClickHome"></home>
</template>

<script lang="ts" setup>
import Home from './veiws/home/index.vue'

const onClickHome = () => {
  console.log(123)
}
</script>

<style lang="scss" scoped>

</style>
