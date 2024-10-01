<script setup lang="ts">
import Logo from '@/assets/logo-vw.svg'
import Logo50Years from '@/assets/50ans-logo.svg'
</script>
<template>
  <div class="header-container">
    <Logo50Years class="years-logo absolute" />
    <div class="logo-wrapper h-[80px] w-[80px]">
      <Logo class="logovw p-[18px]" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-container::before {
content: '';
  position: absolute;
  top: 42%;
  left: 0;
  right: 0;
  border-top: 2px solid white;
}

.header-container {
  width: 100%;
  position: relative;
  z-index: 1;
}

.logo-wrapper {
  @apply bg-vw-500;
  position: relative;
  z-index: 1;
  right: 25px; 
  margin-left: auto;
}

.years-logo{
  top: 50px;
  left: 1.2rem;
  height: 5vw;
  width: auto;

}
</style>