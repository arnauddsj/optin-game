<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import Button from '@/components/Button.vue'
</script>

<template>
  <PublicLayout>
    <div class="flex flex-col justify-center p-16 text-3xl gap-12">
      <p>Pour les 50 ans de la Golf, tentez de remporter un <span class="font-bold">bon d’achat d’une valeur de
          100€</span>
        sur la boutique en ligne Volkswagen.</p>
      <Button cta="Jouer" link="/intro-game1" />
    </div>
  </PublicLayout>
</template>