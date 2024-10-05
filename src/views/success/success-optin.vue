<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Button from "@/components/Button.vue"

const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    router.push('/intro-game')
  }, 5000)
})
</script>

<template>
  <PublicLayout>
    <div class="flex flex-col h-full">
      <div class="flex flex-col flex-1 justify-center p-10">
        <div class="content flex flex-col gap-10">
          <h2 class="text-2xl">
            <span class="font-bold">Merci,</span>
            <br /><br />
            nous avons bien reçu votre participation.
          </h2>
          <Button cta="Relancer le jeu" link="/intro-game" />
        </div>
      </div>
    </div>
  </PublicLayout>
</template>

<style scoped></style>