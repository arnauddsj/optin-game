<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { VueDraggable } from 'vue-draggable-plus'
import { useGameStore } from '../stores/gameStore'
import type { SortableEvent } from 'sortablejs'

const router = useRouter()
const gameStore = useGameStore()

const dragOptions = {
  animation: 150,
  group: 'cars',
  ghostClass: 'ghost',
}

onMounted(() => {
  console.log('Component mounted')
  gameStore.resetGame()
  console.log('shuffledCars:', gameStore.shuffledCars)
})

const onDrop = (event: SortableEvent) => {
  const { newIndex, item } = event
  const carId = parseInt(item.getAttribute('data-id') || '')
  if (!isNaN(carId)) {
    gameStore.placeCar(carId, newIndex!)

    if (gameStore.isGameComplete) {
      router.push('/optin')
    }
  }
}

const onEnd = (event: SortableEvent) => {
  if (!event.to.classList.contains('drop-zone')) {
    gameStore.resetGame()
  }
}

watch(() => gameStore.shuffledCars, (newValue) => {
  console.log('shuffledCars changed:', newValue)
}, { deep: true })
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <h1 class="text-3xl font-bold mb-8">Place the Cars in Their Creation Year</h1>

    <div v-if="gameStore?.shuffledCars?.length > 0" class="flex space-x-4 mb-8">
      {{ console.log('Rendering shuffledCars:', gameStore.shuffledCars) }}
      <VueDraggable v-model="gameStore.shuffledCars"
        :options="{ ...dragOptions, group: { name: 'cars', pull: 'clone', put: false } }" item-key="id"
        class="flex space-x-2">
        <div v-for="element in gameStore.shuffledCars" :key="element.id" :data-id="element.id"
          class="w-24 h-24 bg-white shadow-md rounded-lg overflow-hidden cursor-move flex items-center justify-center">
          <div class="text-neutral-800">
            {{ element.name }}
          </div>
        </div>
      </VueDraggable>
    </div>

    <div class="flex flex-wrap gap-4">
      <VueDraggable v-for="(car, index) in gameStore.placedCars" :key="index" :list="[car]"
        :group="{ name: 'cars', pull: true, put: true }"
        class="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center drop-zone"
        @add="(event) => onDrop(event, index)">
        <template #item="{ element }">
          <div v-if="element" class="w-full h-full flex items-center justify-center">
            <div class="text-neutral-800">
              {{ element.name }}
            </div>
          </div>
        </template>
        <template #footer>
          <div v-if="!car" class="text-gray-500">{{ gameStore.cars[index].year }}</div>
        </template>
      </VueDraggable>
    </div>

    <div>Debug Info:</div>
    <div>shuffledCars length: {{ gameStore.shuffledCars.length }}</div>
    <div>shuffledCars content: {{ JSON.stringify(gameStore.shuffledCars) }}</div>
  </div>
</template>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>