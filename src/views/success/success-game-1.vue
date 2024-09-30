<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Sortable } from '@shopify/draggable'
import PublicLayout from '@/layouts/Public.vue'

interface Car {
  id: number
  name: string
  year: number
  image: string
}

const router = useRouter()

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

const zones = ref(cars.value.map(car => ({ id: car.id, year: car.year, car: null as Car | null })))

const initialList = ref<Car[]>([])

const isAllCarsPlaced = computed(() => {
  return initialList.value.length === 0 && zones.value.every(zone => zone.car !== null)
})

const resetGame = () => {
  initialList.value = [...cars.value].sort(() => Math.random() - 0.5)
  zones.value.forEach(zone => zone.car = null)
}

const checkAnswers = () => {
  if (isAllCarsPlaced.value) {
    const allCorrect = zones.value.every(zone => zone.car && zone.car.year === zone.year)

    if (allCorrect) {
      router.push('/optin')
    } else {
      alert("Some cars are not in the correct year. Try again!")
      resetGame()
    }
  } else {
    alert("Please place all cars before submitting.")
  }
}

onMounted(() => {
  resetGame()

  const containers = document.querySelectorAll('.drop-zone')
  const sortable = new Sortable(containers, {
    draggable: '.car-item',
    mirror: {
      appendTo: 'body',
      constrainDimensions: true,
    },
  })

  sortable.on('sortable:stop', (event) => {
    const { newContainer, oldContainer, dragEvent } = event
    const carId = parseInt(dragEvent.source.dataset.carId!)
    const newZoneId = parseInt(newContainer.dataset.zoneId!)
    const oldZoneId = parseInt(oldContainer.dataset.zoneId!)

    updateZones(carId, newZoneId, oldZoneId)
  })

  // Prevent pull-to-refresh
  document.body.style.overscrollBehavior = 'none'

  // Prevent default touch move behavior
  document.addEventListener('touchmove', preventDefaultTouchMove, { passive: false })
})

onUnmounted(() => {
  // Clean up event listener
  document.removeEventListener('touchmove', preventDefaultTouchMove)
  document.body.style.overscrollBehavior = ''
})

const updateZones = (carId: number, newZoneId: number, oldZoneId: number) => {
  const car = cars.value.find(c => c.id === carId)
  if (!car) return

  const newZone = zones.value.find(z => z.id === newZoneId)
  const oldZone = zones.value.find(z => z.id === oldZoneId)

  if (oldZone) {
    oldZone.car = null
  } else {
    initialList.value = initialList.value.filter(c => c.id !== carId)
  }

  if (newZone) {
    if (newZone.car) {
      initialList.value.push(newZone.car)
    }
    newZone.car = car
  }
}

const preventDefaultTouchMove = (e: TouchEvent) => {
  if (e.target instanceof Element && e.target.closest('.game-screen')) {
    e.preventDefault()
  }
}

</script>

<template>
  <PublicLayout>
    <div
      class="game-screen w-full flex flex-col items-center gap-4 h-screen bg-sky-800 text-slate-50 p-4 overflow-hidden touch-none">
      <div class="flex gap-1 h-full">

        <div class="initial-cars-wrapper flex flex-col w-full justify-center">
          <div class="flex flex-col justify-between pb-1 drop-zone initial-cars-container" :data-zone-id="0">
            <div v-for="car in initialList" :key="car.id" class="car-item flex flex-col items-center justify-center"
              :data-car-id="car.id">
              <img :src="car.image" :alt="car.name" class="car-image object-contain mb-0.5">
              <p class="text-xs">{{ car.name }}</p>
            </div>
          </div>
        </div>

        <div class="drop-zones w-full flex flex-col items-center justify-center p-1">
          <div class="flex flex-col justify-between w-full gap-1">
            <div v-for="zone in zones" :key="zone.id"
              class="drop-zone flex-1 p-1 bg-sky-700 min-h-[150px] flex flex-col items-center justify-center"
              :data-zone-id="zone.id">
              <p class="text-center font-semibold text-xs absolute top-1">{{ zone.year }}</p>
              <div class="car-container">
                <div v-if="zone.car" class="car-item flex items-center justify-center" :data-car-id="zone.car.id">
                  <img :src="zone.car.image" :alt="zone.car.name" class="max-w-full max-h-full object-contain">
                  <p class="text-xs">{{ zone.car.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center">
        <button @click="checkAnswers" :disabled="!isAllCarsPlaced" class="text-base">Submit your answer</button>
      </div>
    </div>
  </PublicLayout>
</template>

<style scoped>
.drop-zone {
  min-width: 60px;
  /* Fixed height */
  position: relative;
  overflow: hidden;
}
</style>