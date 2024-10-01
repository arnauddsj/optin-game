<script setup lang="ts">
import Header from '@/components/Header.vue'
</script>

<template>
  <Header />
  <div class="flex flex-col flex-1 pt-4 pb-14 px-6 justify-center gap-[5rem]">
    <slot />
  </div>
</template>
