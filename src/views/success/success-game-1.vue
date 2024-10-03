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
            Félicitations pour cette première épreuve !
          </h2>
          <Button cta="Épreuve suivante" link="/intro-game2" />
        </div>
      </div>

    </div>
  </PublicLayout>
</template>

<style scoped>

</style>