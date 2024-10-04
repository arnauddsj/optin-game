<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  router.push('/intro-game')
})
</script>

<template>
  <PublicLayout>
    <div class="flex flex-col h-full">
      <div class="flex flex-col flex-1 justify-center p-10">
        <div class="content flex flex-col gap-10">
          <h2 class="text-2xl">
            Merci,
            <br /><br />
            nous avons bien reçu votre participation.
          </h2>
        </div>
      </div>
    </div>
  </PublicLayout>
</template>

<style scoped></style>