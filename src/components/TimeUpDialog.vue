<script setup lang="ts">
import Button from './Button.vue'

defineProps<{
  message: string
}>()

const emit = defineEmits(['continue'])

const handleContinue = () => {
  emit('continue')
}
</script>

<template>
  <div class="flex items-center justify-center fixed inset-0 z-50 w-full h-full">
    <div class="bg-white p-5 shadow-lg text-center text-vw-500 w-[90%]">
      <h2 class="text-2xl font-bold mb-4">Le temps est écoulé !</h2>
      <p class="mb-4 text-xl">{{ message }}</p>
      <div class="flex flex-col justify-center items-center gap-4">
        <Button cta="Continuer la partie" @click="handleContinue" />
        <Button cta="Abandonner" link="/" />
      </div>
    </div>
  </div>
</template>