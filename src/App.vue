<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="bg-vw-dark text-white font-vw flex flex-col">
    <RouterView />
  </div>
</template>

<style>
body {
  @apply bg-vw-dark text-white font-vw;
  font-size: 26px;
}
</style>