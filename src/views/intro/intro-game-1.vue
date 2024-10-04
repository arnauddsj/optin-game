<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import Button from "@/components/Button.vue"
</script>

<template>
  <PublicLayout>
    <div class="flex flex-col h-full">
      <div class="flex flex-col flex-1 justify-center p-10">
        <div class="content flex flex-col gap-10">
          <h2 class="text-2xl">
            Volkswagen a produit 8 générations de Golf depuis 1974, saurez-vous les reconnaître et <span
              class="font-bold">les placer dans le bon ordre chronologique</span> ?
          </h2>
          <Button cta="Commencer" link="/game1" />
        </div>
      </div>
      <div class="car-images-container overflow-hidden">
        <div class="car-images flex justify-between mt-auto gap-8">
          <img v-for="i in 6" :key="i" :src="`/jeu1/voiture-${i}.png`" :alt="`Voiture ${i}`"
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