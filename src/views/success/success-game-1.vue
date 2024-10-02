<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import Button from "@/components/Button.vue"
</script>

<template>
  <PublicLayout>
    <div class="flex-grow flex flex-col justify-center">
      <h2 class="text-2xl mb-8">
        Félicitations pour cette première épreuve, vous avez débloqué un indice pour l’épreuve finale !
      </h2>
      <Button cta="Commencer" link="/game1" />
    </div>
  </PublicLayout>
</template>

<style scoped></style>