<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import Button from "@/components/Button.vue"
</script>

<template>
  <PublicLayout>
    <div class="flex flex-col h-full">
      <div class="flex flex-col flex-1 justify-center p-10">
        <div class="content flex flex-col gap-10">
          <h1 class="text-3xl font-bold">50 ans d'histoire</h1>
          <h2 class="text-2xl">
            VW a produit 8 évolutions de l'iconique Golf GTI depuis 1976, saurez-vous les reconnaître et les placer dans
            la frise chronologique suivante ?
          </h2>
          <Button cta="Commencer" link="/game1" />
        </div>
      </div>
      <div class="car-images-container overflow-hidden">
        <div class="car-images flex justify-between mt-auto gap-8">
          <img v-for="i in 6" :key="i" :src="`/cars/voiture-${i}.png`" :alt="`Voiture ${i}`"
            class="w-1/6 object-contain" />
        </div>
      </div>
    </div>
  </PublicLayout>
</template>

<style scoped>
.car-images-container {
  width: 100%;
}

.car-images {
  width: 120%;
  margin-left: -15%;
}
</style>