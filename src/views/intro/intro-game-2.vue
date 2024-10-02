<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PublicLayout from '@/layouts/PublicLayout.vue'
import Button from "@/components/Button.vue"
import {
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastViewport,
} from 'radix-vue'

const showToast = ref(false)

onMounted(() => {
  setTimeout(() => {
    showToast.value = true
  }, 500)
})
</script>

<template>
  <PublicLayout>
    <ToastProvider>
      <div class="flex flex-col h-full">
        <div class="flex flex-col flex-1 justify-center p-10">
          <div class="content flex flex-col gap-10">
            <h1 class="text-3xl font-bold">50 ans d'histoire</h1>
            <h2 class="text-2xl">
              VW a produit 8 évolutions de l'iconique Golf GTI depuis 1976, saurez-vous les reconnaître et <span
                class="font-bold">les placer dans la frise chronologique suivante</span> ?
            </h2>
            <Button cta="Commencer" link="/game2" />
          </div>
        </div>
        <div class="car-images flex justify-end">
          <img src="/cars/voiture-1.png" :alt="'Voiture'" class="w-[70%] object-contain" />
        </div>
      </div>
      <ToastRoot v-model:open="showToast" :duration="5000"
        class="bg-white p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut">
        <ToastTitle class="[grid-area:_title] mb-[5px] text-vw-dark text-xl">
          Bravo !
        </ToastTitle>
        <ToastDescription class="[grid-area:_description] m-0 text-vw-dark text-xs">
         Vous avez réussi cette première épreuve ! Allez vous réussir la seconde ?
        </ToastDescription>
      </ToastRoot>

      <ToastViewport
        class="fixed top-0 left-0 flex flex-col p-6 gap-2 max-w-[100vw] m-0 list-none z-[50] outline-none" />
    </ToastProvider>
  </PublicLayout>

</template>

<style scoped>

</style>