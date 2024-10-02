<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import Button from '@/components/Button.vue'
</script>

<template>
  <PublicLayout>
    <div class="flex flex-col justify-center p-16 text-2xl gap-12">
      <p>Pour les 50 ans de la Golf, tentez de remporter un weekend tous frais payés au volant de la dernière Golf GTI 8 !</p>
      <Button cta="Jouer" link="/intro-game1" />
    </div>
  </PublicLayout>
</template>

<style scoped>

</style>