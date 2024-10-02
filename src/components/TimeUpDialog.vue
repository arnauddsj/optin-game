<script setup lang="ts">
import Button from './Button.vue'

const emit = defineEmits(['continue'])

const handleContinue = () => {
  emit('continue')
}
</script>

<template>
  <div class="flex items-center justify-center fixed inset-0 z-50 w-full h-full">
    <div class="flex flex-col gap-5 bg-white py-10 shadow-lg text-center text-vw-dark w-[90%]">
      <div class="flex flex-col gap-2">

        <h2 class="text-3xl font-bold">Le temps est écoulé !</h2>
        <p class="text-2xl">Relancez le chronomètre pour continuer la partie !</p>
      </div>
      <div class="flex flex-col justify-center items-center gap-2">
        <Button cta="Continuer" @click="handleContinue" />
        <button class="text-vw-dark text-base p-0" @click="handleContinue">Abandonner</button>
      </div>
    </div>
  </div>
</template>