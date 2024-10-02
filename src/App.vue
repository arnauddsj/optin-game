<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="bg-vw-dark text-white font-vw flex flex-col">
    <RouterView />
  </div>
</template>

<style>
:root {
  /* Set the root font size */
  font-size: 26px
}

body {
  @apply bg-vw-dark text-white font-vw;
}
</style>