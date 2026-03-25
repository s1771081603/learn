<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { toRefs } from 'vue'

const { count, doubleCount, increment } = toRefs(useCounterStore())
</script>

<template>
    <h1>You did it!{{ count }}</h1>
    <p>Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the documentation {{ doubleCount }}</p>
    <button @click="increment">点击新增</button>
</template>

<style scoped></style>
