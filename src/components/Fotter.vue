<script setup lang="ts">
import Timer from './Timer.vue'
</script>
<template>
  <div class="footer-container">
    <Timer :duration="10" :onTimeUp="() => {}" :key="1" />
  </div>
</template>

