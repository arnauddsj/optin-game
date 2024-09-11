<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { VueDraggable } from 'vue-draggable-plus'
import { useGameStore } from '../stores/gameStore'
import type { SortableEvent } from 'sortablejs'

const router = useRouter()
const gameStore = useGameStore()

onMounted(() => {
  gameStore.resetGame()
})

const onStart = (event: SortableEvent) => {
  console.log('Drag started', event)
}

const onEnd = (event: SortableEvent) => {
  console.log('Drag ended', event)
}

const onChange = (event: SortableEvent, dropZoneIndex: number) => {
  console.log('Change event', event, 'Drop zone index:', dropZoneIndex)
  gameStore.updatePlacedCars(dropZoneIndex, event.added, event.removed)
}

const checkGameCompletion = () => {
  if (gameStore.isGameComplete) {
    router.push('/optin')
  } else {
    alert('The order is not correct. Try again!')
    gameStore.resetGame()
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <h1 class="text-3xl font-bold mb-8">Place the Cars in Their Creation Year</h1>
    <div class="flex flex-wrap justify-center space-x-4 mb-8">
      <VueDraggable v-model="gameStore.shuffledCars" :options="{
        group: { name: 'cars', pull: 'clone', put: false },
        animation: 150,
        sort: false,
      }" item-key="id" class="flex flex-wrap justify-center gap-2" @start="onStart" @end="onEnd">
        <div v-for="element in gameStore.shuffledCars" :key="element.id" :data-id="element.id"
          class="w-24 h-24 bg-white shadow-md rounded-lg overflow-hidden cursor-move flex flex-col items-center justify-center">
          <img :src="element.image" :alt="element.name" class="w-full h-3/4 object-cover" />
          <div class="text-center text-gray-500 text-sm p-1">{{ element.name }}</div>
        </div>
      </VueDraggable>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <VueDraggable v-for="(_, index) in gameStore.placedCars" :key="index" v-model="gameStore.placedCars[index]"
        :options="{
          group: { name: 'cars', pull: true, put: true },
          animation: 150,
        }" class="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center drop-zone"
        @change="(e) => onChange(e, index)">
        <template #item="{ element }">
          <div v-if="element" class="w-full h-full flex items-center justify-center">
            <img :src="element.image" :alt="element.name" class="w-full h-full object-cover" />
          </div>
        </template>
        <div v-if="!gameStore.placedCars[index]" class="text-gray-500">{{ gameStore.cars[index].year }}</div>
      </VueDraggable>
    </div>

    <button @click="checkGameCompletion"
      class="mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
      Submit Order
    </button>

    <!-- Debug information -->
    <div class="mt-8 text-sm text-gray-600">
      <h2 class="font-bold">Debug Info:</h2>
      <div>Shuffled Cars: {{ gameStore.shuffledCars.length }}</div>
      <div>Placed Cars: {{ gameStore.placedCars.filter(car => car !== null).length }}</div>
    </div>
  </div>
</template>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>