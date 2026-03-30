<script lang="ts" setup>

import {useCounterStore} from '@/stores/counter'
import {toRefs} from 'vue'

const {count, doubleCount, increment} = toRefs(useCounterStore())
</script>

<template>
    首页{{ count }}，双倍{{ doubleCount }}
    <a-button type="primary" @click="increment">点击添加</a-button>
</template>

<style scoped>

</style>
