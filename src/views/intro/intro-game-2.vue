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
            À l’été 1976, Volkswagen a lancé sur le marché une Golf particulièrement sportive : la GTI. Qui deviendra
            ensuite le modèle sportif compact le plus vendu au monde. 
          </h2>
          <Button cta="Commencer" link="/game2" />
        </div>
      </div>
      <div class="car-images flex justify-end">
        <img src="/jeu1/voiture-1.png" :alt="'Voiture'" class="w-[70%] object-contain" />
      </div>
    </div>
  </PublicLayout>

</template>

<style scoped>

</style>