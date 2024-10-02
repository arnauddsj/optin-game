<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['passwordSubmit'])
const password = ref('')

const submitPassword = () => {
  emit('passwordSubmit', password.value)
  password.value = ''
}
</script>

<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
    <div class="bg-white p-5 rounded-lg shadow-xl">
      <h2 class="text-xl mb-4">Enter Admin Password</h2>
      <input v-model="password" type="password" class="border p-2 mb-4 w-full" placeholder="Password"
        @keyup.enter="submitPassword">
      <button @click="submitPassword" class="bg-vw-light text-white font-bold py-2 px-4 rounded">
        Submit
      </button>
    </div>
  </div>
</template>