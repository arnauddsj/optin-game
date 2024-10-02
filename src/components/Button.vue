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
  <button @click="handleClick" class="bg-vw-light text-white text-2xl font-medium py-1 px-2 w-1/2 max-w-md">
    {{ cta }}
  </button>
</template>