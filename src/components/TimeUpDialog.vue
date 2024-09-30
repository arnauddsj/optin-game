<script setup lang="ts">
defineProps<{
  message: string
  onContinue: () => void
}>()
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg text-center">
      <h2 class="text-xl font-bold mb-4">Time's Up!</h2>
      <p class="mb-4">{{ message }}</p>
      <button @click="onContinue" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Continue to play
      </button>
    </div>
  </div>
</template>