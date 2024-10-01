<script setup lang="ts">
import Header from '@/components/Header.vue'
</script>

<template>
  <Header />
  <div class="flex flex-col flex-1 p-8 justify-center gap-[5rem]">
    <slot />
  </div>
</template>
