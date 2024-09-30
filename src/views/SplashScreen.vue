<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const startGame = () => {
  router.push('/optin')
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen bg-vw-500">
    <h1 class="text-4xl font-bold mb-8">Welcome to VolksWagen History Game!</h1>
    <button @click="startGame"
      class=" bg-vw-50 text-white" >
      Jouer
    </button>
  </div>
</template>

<style scoped>
body {
 background-color: #01315F;
}
</style>