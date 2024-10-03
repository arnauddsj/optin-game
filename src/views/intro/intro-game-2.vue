<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PublicLayout from '@/layouts/PublicLayout.vue'
import Button from "@/components/Button.vue"

const showToast = ref(false)

onMounted(() => {
  setTimeout(() => {
    showToast.value = true
  }, 500)
})
</script>

<template>
  <PublicLayout>
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
  </PublicLayout>

</template>

<style scoped>

</style>