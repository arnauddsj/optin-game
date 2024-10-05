<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import Button from "@/components/Button.vue"
</script>

<template>
  <PublicLayout>
    <div class="flex flex-col h-full">
      <div class="flex flex-col flex-grow justify-center p-10">
        <div class="content flex flex-col gap-10">
          <h2 class="text-2xl">
            À l’été 1976, Volkswagen a lancé sur le marché une Golf particulièrement sportive : la GTI. Qui deviendra
            ensuite le modèle sportif compact le plus vendu au monde.
          </h2>
          <Button cta="Commencer" link="/game2" />
        </div>
      </div>
      <img src="/ui/jeu2.webp" alt="golf gti" class="w-full" />
    </div>
  </PublicLayout>

</template>

<style scoped>

</style>