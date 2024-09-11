<script setup lang="ts">
const cars = ref<Car[]>([
  { id: 1, name: 'Voiture 1', year: 1908, image: '/cars/voiture-01.png' },
  { id: 2, name: 'Voiture 2', year: 1938, image: '/cars/voiture-02.png' },
  { id: 3, name: 'Voiture 3', year: 1959, image: '/cars/voiture-03.png' },
  { id: 4, name: 'Voiture 4', year: 1964, image: '/cars/voiture-04.png' },
  { id: 5, name: 'Voiture 5', year: 1989, image: '/cars/voiture-05.png' },
  { id: 6, name: 'Voiture 6', year: 1974, image: '/cars/voiture-06.png' },
  { id: 7, name: 'Voiture 7', year: 1973, image: '/cars/voiture-07.png' },
  { id: 8, name: 'Voiture 8', year: 1975, image: '/cars/voiture-08.png' }
])
</script>

<template>
  <div class="game-screen">
    <div class="game-board">
      <div class="game-board-row" v-for="i in 8" :key="i">
        <div class="game-board-cell" v-for="j in 8" :key="j" @click="placeCar(i, j)"></div>
      </div>
    </div>
  </div>
</template>
