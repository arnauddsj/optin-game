<script setup lang="ts">
import Logo from '@/assets/logo-vw.svg'
import Logo50Years from '@/assets/50ans-logo.svg'
</script>
<template>
  <div class="header-container">
    <Logo50Years class="years-logo absolute" />
    <div class="logo-wrapper h-[100px] w-[100px]">
      <Logo class="logovw p-[20px]" />
    </div>  
  </div>
</template>

<style scoped lang="scss">
.header-container::before {
content: '';
  position: absolute;
  top: 48%;
  left: 0;
  right: 0;
  border-top: 2px solid white;
}

.header-container {
  width: 100%;
  position: relative;
  z-index: 1;
  margin-top: 1rem;
}

.logo-wrapper {
  @apply bg-vw-dark;
  position: relative;
  z-index: 1;
  right: 25px; 
  margin-left: auto;
}

.years-logo{
  top: 55px;
  left: 1.2rem;
  height: 4vw;
  width: auto;

}
</style>