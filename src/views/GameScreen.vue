<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Sortable from 'sortablejs'
import { useGameStore } from '../stores/gameStore'

const router = useRouter()
const gameStore = useGameStore()

const shuffledListRef = ref<HTMLElement | null>(null)
const dropZonesRef = ref<HTMLElement[]>([])

onMounted(() => {
  gameStore.resetGame()

  // Initialize Sortable for the shuffled list
  if (shuffledListRef.value) {
    Sortable.create(shuffledListRef.value, {
      group: {
        name: 'cars',
        pull: 'clone',
        put: true
      },
      sort: false,
      animation: 150,
      onAdd: (evt) => {
        // This handles when a car is moved back to the list from a dropzone
        const carId = parseInt(evt.item.getAttribute('data-id') || '0', 10)
        const fromIndex = parseInt(evt.from.getAttribute('data-index') || '-1', 10)
        if (fromIndex !== -1) {
          gameStore.removeCar(fromIndex)
        }
      }
    })
  }

  // Initialize Sortable for each drop zone
  dropZonesRef.value.forEach((dropZone, index) => {
    Sortable.create(dropZone, {
      group: {
        name: 'cars',
        pull: true,
        put: function (to) {
          // Allow only one item in the drop zone
          return to.el.children.length < 1
        }
      },
      animation: 150,
      onAdd: (evt) => {
        const carId = parseInt(evt.item.getAttribute('data-id') || '0', 10)
        const fromIndex = parseInt(evt.from.getAttribute('data-index') || '-1', 10)

        // If there's already a car in this zone, move it back to the list
        if (gameStore.placedCars[index]) {
          const existingCar = gameStore.placedCars[index]
          if (existingCar && shuffledListRef.value) {
            const newElement = document.createElement('div')
            newElement.className = 'w-24 h-24 bg-white shadow-md rounded-lg overflow-hidden cursor-move flex flex-col items-center justify-center'
            newElement.setAttribute('data-id', existingCar.id.toString())
            newElement.innerHTML = `
              <img src="${existingCar.image}" alt="${existingCar.name}" class="w-full h-3/4 object-cover" />
              <div class="text-center text-gray-500 text-sm p-1">${existingCar.name}</div>
            `
            shuffledListRef.value.appendChild(newElement)
            gameStore.removeCar(index)
          }
        }

        // Place the new car
        gameStore.placeCar(carId, index)

        // If the car came from another drop zone, remove it from there
        if (fromIndex !== -1) {
          gameStore.removeCar(fromIndex)
        }

        // Remove the original item from the shuffled list if it came from there
        if (fromIndex === -1) {
          const originalItem = shuffledListRef.value?.querySelector(`[data-id="${carId}"]`)
          if (originalItem) {
            originalItem.parentNode?.removeChild(originalItem)
          }
        }

        // Ensure only one car remains in the dropzone
        while (dropZone.children.length > 1) {
          dropZone.removeChild(dropZone.lastChild)
        }
      },
      onRemove: (evt) => {
        const toIndex = parseInt(evt.to.getAttribute('data-index') || '-1', 10)
        if (toIndex === -1) {  // If it's moved back to the shuffled list
          gameStore.removeCar(index)
        }
      }
    })
  })
})

const checkGameCompletion = () => {
  if (gameStore.isGameComplete) {
    router.push('/optin')
  } else {
    alert('Thank you for playing! Unfortunately, the order is not correct. You can try again or proceed to the opt-in form.')
    router.push('/game')
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <h1 class="text-3xl font-bold mb-8">Place the Cars in Their Creation Year</h1>
    <div ref="shuffledListRef" class="flex flex-wrap justify-center gap-4 mb-8">
      <div v-for="car in gameStore.shuffledCars" :key="car.id" :data-id="car.id"
        class="w-24 h-24 bg-white shadow-md rounded-lg overflow-hidden cursor-move flex flex-col items-center justify-center">
        <img :src="car.image" :alt="car.name" class="w-full h-3/4 object-cover" />
        <div class="text-center text-gray-500 text-sm p-1">{{ car.name }}</div>
      </div>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-4 gap-8">
      <div v-for="(_, index) in gameStore.placedCars" :key="index" class="flex flex-col items-center">
        <div :ref="el => { if (el) dropZonesRef[index] = el as HTMLElement }"
          class="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center drop-zone" :data-index="index">
          <template v-if="gameStore.placedCars[index]">
            <div :data-id="gameStore.placedCars[index].id" class="w-full h-full flex items-center justify-center">
              <img :src="gameStore.placedCars[index].image" :alt="gameStore.placedCars[index].name"
                class="w-full h-full object-cover" />
            </div>
          </template>
        </div>
        <div class="text-gray-700 mt-2 font-semibold">{{ gameStore.cars[index].year }}</div>
        <div v-if="gameStore.placedCars[index]" class="text-gray-500 text-sm mt-1">
          {{ gameStore.placedCars[index].name }}
        </div>
      </div>
    </div>

    <button @click="checkGameCompletion"
      class="mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
      Submit Order
    </button>
  </div>
</template>

<style scoped>
.sortable-ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>