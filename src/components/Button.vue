<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps<{
  cta: string
  link?: string | Record<string, any>
}>()

const emit = defineEmits(['click'])

const router = useRouter()

const handleClick = () => {
  if (props.link) {
      router.push(props.link)
  } else {
    emit('click')
  }
}
</script>

<template>
  <button @click="handleClick" class="bg-vw-light text-white text-3xl font-medium py-4 px-8 w-3/4 max-w-md">
    {{ cta }}
  </button>
</template>