<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="bg-vw-dark text-white font-vw flex flex-col">
    <RouterView />
  </div>
</template>

<style lang="scss">
:root {
  /* Set the root font size */
  font-size: 26px
}

.ToastRoot[data-swipe='move'] {
  transform: translateX(var(--radix-toast-swipe-move-x));
}

.ToastRoot[data-swipe='cancel'] {
  transform: translateX(0);
  transition: transform 200ms ease-out;
}

.ToastRoot[data-swipe='end'] {
  animation: slideRight 100ms ease-out;
}

@keyframes slideRight {
  from {
    transform: translateX(var(--radix-toast-swipe-end-x));
  }

  to {
    transform: translateX(100%);
  }
}

body {
  @apply bg-vw-dark text-white font-vw;
}
</style>