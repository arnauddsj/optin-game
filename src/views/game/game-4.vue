<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <PublicLayout>
    <div class="flex flex-col h-full">
      <div class="flex flex-col flex-1 justify-center p-10">
        <div class="content flex flex-col gap-10">
          Game 4
        </div>
      </div>
      <button @click="router.push('/optin')">Optin</button>
    </div>
  </PublicLayout>
</template>

<style scoped></style>