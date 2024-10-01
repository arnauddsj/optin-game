<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  cta: string
  to: string
}>()

const router = useRouter()

const handleClick = () => {
  router.push({ path: props.to })
}
</script>

<template>
  <button @click="handleClick" class="bg-vw-50 text-white text-2xl py-4 px-8 w-3/4 max-w-md">
    {{ cta }}
  </button>
</template>