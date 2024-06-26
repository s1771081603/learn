<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
const commonStore = useCounterStore()

</script>

<template>
  <main>
    <button @click="commonStore.increment">{{ commonStore.doubleCount }}</button>
  </main>
</template>
