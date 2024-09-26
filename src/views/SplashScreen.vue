<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const startGame = () => {
  router.push('/optin')
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen bg-sky-800 text-slate-50">
    <h1 class="text-4xl font-bold mb-8">Welcome to VolksWagen History Game!</h1>
    <button @click="startGame" class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
      Test optin
    </button>
  </div>
</template>