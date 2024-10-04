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
            Traversant les générations depuis 50 ans, la Golf n’oublie pas pour autant d’évoluer avec son temps. En
            témoigne une technologie embarquée dans la Nouvelle Golf sortie cette année, qui permet notamment de
            réaliser des recherches sur Internet via la commande vocale.<span class="font-bold"> De quoi s’agit-il ?</span>
          </h2>
          <Button cta="Commencer" link="/game3" />
        </div>
      </div>
      <div class="car-images flex justify-end">
        <img src="/cars/voiture-3.png" :alt="'Voiture'" class="w-[70%] object-contain" />
      </div>
    </div>
  </PublicLayout>
</template>

<style scoped></style>