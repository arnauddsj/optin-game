<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PublicLayout from '@/layouts/Public.vue'

const router = useRouter()

onMounted(() => {
    setTimeout(() => {
      router.push('/')
    }, 2000)
})

</script>

<template>
  <PublicLayout>
  Congrats
  </PublicLayout>
</template>
