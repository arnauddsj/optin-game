<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import { useRouter } from 'vue-router'
import Button from '@/components/Button.vue'

const router = useRouter()
</script>

<template>
  <PublicLayout>
    Success Game 2
    <button @click="router.push('/game2')">Retourner au jeu</button>
  </PublicLayout>
</template>

<style scoped></style>