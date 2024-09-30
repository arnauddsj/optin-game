<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const startGame = () => {
  router.push({ path: '/game1' })
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen bg-vw-500 p-8">
    <h1 class="text-4xl font-bold mb-12 text-center">Welcome to VolksWagen History Game!</h1>
    <button @click="startGame"
      class="bg-vw-50 text-white text-2xl py-4 px-8 w-3/4 max-w-md">
      Jouer
    </button>
  </div>
</template>

<style scoped>
body {
  background-color: #01315F;
}

/* Ensure the content fits the 1080x1920 screen */
@media (min-width: 1080px) and (min-height: 1920px) {
  .h-screen {
    height: 1920px;
  }
}
</style>