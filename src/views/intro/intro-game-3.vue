<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import Button from "@/components/Button.vue"
</script>

<template>
  <PublicLayout>
    <div class="flex flex-col h-full">
      <div class="flex flex-col flex-1 justify-center p-10">
        <div class="content flex flex-col gap-10">
          <h1 class="text-3xl font-bold">Golf 3 GTI <span class="text-sm">(1992 – 1997)</span> </h1>
          <h2 class="text-xl">
            Une nouvelle ère en matière de sécurité ! Nous sommes en 1992. Ce coup-ci, Volkswagen opère un véritable
            changement esthétique : fini les angles, bonjour les rondeurs ! La Golf évolue aussi fortement sous les
            capots avec l'arrivée d'un moteur six cylindres de 2,8L sur la fameuse version VR6 et du tout premier bloc
            diesel à injection directe (TDI en 1993 et SDI en 1995).
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