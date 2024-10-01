<script setup lang="ts">
import Logo from '@/assets/logo-vw.svg'
</script>
<template>
  <div class="header-container">
    <div class="logo-wrapper h-[120px] w-[100px]">
      <Logo class="logovw h-[120px] w-[100px] p-[20px]" />
    </div>
  </div>
</template>

<style scoped>
.header-container::before {
content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  border-top: 2px solid white;
}

.header-container {
  width: 100%;
  position: relative;
  padding: 0.5rem 1rem;
  z-index: 1;
}

.logo-wrapper {
  @apply bg-vw-500;
  position: relative;
  z-index: 1;
  right: 25px; 
  margin-left: auto;
}
</style>