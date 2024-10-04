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
            Félicitations! Vous avez réussi cette dernière épreuve !
          </h2>
          <Button cta="Suivant" link="/optin" />
        </div>
      </div>
    </div>
  </PublicLayout>
</template>

<style scoped></style>