<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import PublicLayout from '@/layouts/Public.vue'

const preventDefaultTouchMove = (e: TouchEvent) => {
  if (e.target instanceof Element && e.target.closest('.game-screen')) {
    e.preventDefault()
  }
}

</script>

<template>
  <PublicLayout>
    Game 2
  </PublicLayout>
</template>

<style scoped>

</style>