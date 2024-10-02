<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import Button from "@/components/Button.vue"
</script>

<template>
  <PublicLayout>
    <div class="flex flex-col h-full">
      <div class="flex flex-col flex-1 justify-center p-10">
        <div class="content flex flex-col gap-10">
          <h1 class="text-3xl font-bold">Épreuve finale </h1>
          <h2 class="text-xl">
            Félicitations vous êtes arrivé à l’épreuve finale ! Vous avez maintenant 15s pour déchiffrer le code secret
            grâce aux trois nombres que vous avez débloqués !
          </h2>
          <Button cta="Commencer" link="/game4" />
        </div>
      </div>
      <!-- <div class="car-images flex justify-end">
        <img src="/cars/voiture-4.png" :alt="'Voiture'" class="w-[70%] object-contain" />
      </div> -->
    </div>
  </PublicLayout>
</template>

<style scoped></style>