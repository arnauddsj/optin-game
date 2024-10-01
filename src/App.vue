<script setup lang="ts">
</script>

<template>
  <div class=" h-screen flex flex-col justify-between items-center bg-vw-500">
    <router-view />
  </div>
</template>

<style>
/* Ensure the content fits the 1080x1920 screen */
@media (min-width: 1080px) and (min-height: 1920px) {
  .h-screen {
    height: 1920px;
  }
}

@font-face {
  font-family: 'VWHead';
  src: url('@/assets/fonts/VWHead.ttf') format('truetype');
}

body {
  font-family: 'VWHead', sans-serif;
  font-size: 24px;
}
</style>