<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import Button from "@/components/Button.vue"
</script>

<template>
  <PublicLayout>
    <div class="flex flex-col h-full">
      <div class="flex flex-col flex-1 justify-center p-10">
        <div class="content flex flex-col gap-10">
          <h2 class="text-xl">
            Traversant les générations depuis 50 ans, la Golf n’a cessé d’évoluer avec son temps. La preuve en est avec
            la Nouvelle Golf sortie cette année, qui intègre une <span class="font-bold">technologie embarquée</span>
            permettant notamment de réaliser des recherches sur Internet via la commande vocale.
          </h2>
          <Button cta="Commencer" link="/game3" />
        </div>
      </div>
      <div class="car-images flex justify-end">
        <img src="/jeu1/voiture-8.png" :alt="'Voiture'" class="w-[50%] object-contain mr-8 mb-8" />
      </div>
    </div>
  </PublicLayout>
</template>

<style scoped></style>