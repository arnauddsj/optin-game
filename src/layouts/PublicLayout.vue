<script setup lang="ts">
import Header from '@/components/Header.vue'
</script>

<template>
  <div class="flex flex-col h-screen">
    <Header />
    <main class="flex-grow flex flex-col justify-center items-center pb-12">
      <slot />
    </main>
  </div>
</template>