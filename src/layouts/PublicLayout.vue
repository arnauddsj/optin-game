<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="flex flex-col">
    <Header />
    <main class="flex-grow flex flex-col justify-center items-center px-4 py-8">
      <slot />
    </main>
    <Footer />
  </div>
</template>