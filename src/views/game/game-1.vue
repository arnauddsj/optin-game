<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Sortable } from '@shopify/draggable'
import PublicLayout from '@/layouts/PublicLayout.vue'
import TimeUpDialog from '@/components/TimeUpDialog.vue'
import Timer from '@/components/Timer.vue'

interface Car {
  id: number
  name: string
  year: number
  image: string
}

const router = useRouter()

const cars = ref<Car[]>([
  { id: 1, name: 'Voiture 1', year: 1908, image: '/cars/voiture-1.png' },
  { id: 2, name: 'Voiture 2', year: 1938, image: '/cars/voiture-2.png' },
  { id: 3, name: 'Voiture 3', year: 1959, image: '/cars/voiture-3.png' },
  { id: 4, name: 'Voiture 4', year: 1964, image: '/cars/voiture-4.png' },
  { id: 5, name: 'Voiture 5', year: 1989, image: '/cars/voiture-5.png' },
  { id: 6, name: 'Voiture 6', year: 1974, image: '/cars/voiture-6.png' },
  { id: 7, name: 'Voiture 7', year: 1973, image: '/cars/voiture-7.png' },
  { id: 8, name: 'Voiture 8', year: 1975, image: '/cars/voiture-8.png' }
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

watch(isAllCarsPlaced, (newValue: boolean) => {
  if (isAllCarsPlaced.value) {
    const allCorrect = zones.value.every(zone => zone.car && zone.car.year === zone.year)

    if (allCorrect) {
      router.push('/success-game1')
    } else {
      alert("Some cars are not in the correct year. Try again!")
      resetGame()
    }
  }
})

const showTimeUpDialog = ref(false)
const timeUpMessage = ref('')
const timerDuration = ref(50)
const timerKey = ref(0)

const handleTimeUp = () => {
  timeUpMessage.value = `${timerDuration.value} seconds have passed!`
  showTimeUpDialog.value = true
}

const resetGameState = () => {
  resetGame()
  showTimeUpDialog.value = false
  timerKey.value++ // Increment the key to force Timer re-render
}

const handleContinue = () => {
  resetGameState()
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
  if (e.target instanceof Element && e.target.closest('.game1-screen')) {
    e.preventDefault()
  }
}

</script>

<template>
  <PublicLayout class="h-screen flex flex-col">
    <div class="game1-screen flex-grow flex flex-col items-center justify-between p-4">
      <div class="game-container grid grid-cols-12 w-full">
        <!-- Left column: Initial cars -->
        <div class="col-span-4 flex flex-col justify-center">
          <div class="flex flex-col justify-between pb-1 drop-zone initial-cars-container" :data-zone-id="0">
            <div v-for="car in initialList" :key="car.id" class="car-item flex flex-col items-center justify-center mb-2"
              :data-car-id="car.id">
              <img :src="car.image" :alt="car.name" class="car-image object-contain w-full">
            </div>
          </div>
        </div>

        <!-- Middle column: Timeline -->
        <div class="col-span-4 timeline relative flex flex-col items-center justify-between">
          <div v-for="zone in zones" :key="zone.id" class="year-marker flex items-center w-full justify-center pr-4">
            <span class="text-white font-bold text-[1rem]">{{ zone.year }}</span>
          </div>
        </div>

        <!-- Right column: Drop zones -->
        <div class="col-span-4 drop-zones grid grid-rows-8 gap-2">
          <div v-for="zone in zones" :key="zone.id"
            class="drop-zone bg-vw-blue-50 w-full flex items-center justify-center"
            :data-zone-id="zone.id">
            <div class="car-container w-full h-full flex items-center justify-center">
              <div v-if="zone.car" class="car-item flex items-center justify-center" :data-car-id="zone.car.id">
                <img :src="zone.car.image" :alt="zone.car.name" class="max-w-full max-h-full object-contain">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <TimeUpDialog
      v-if="showTimeUpDialog"
      :message="timeUpMessage"
      @continue="handleContinue"
    />
    <Timer :duration="timerDuration" :onTimeUp="handleTimeUp" :key="timerKey" />
  </PublicLayout>
</template>

<style scoped>
.game1-screen {
  background-color: #00205b; /* VW dark blue background */
}

.game-container {
  position: relative;
}

.drop-zone {
  position: relative;
  overflow: hidden;
}

.bg-vw-blue-50 {
  background-color: #73b3e7; /* VW light blue for drop zones */
}

.timeline::before {
  content: '';
  position: absolute;
  top: 10px;
  bottom: 10px;
  width: 2px;
  background-color: white;
  transform: translateX(-50%);
}

.year-marker {
  position: relative;
  z-index: 1;
  height: 100%;
}

/* Adjust car image sizes */
.car-image, .car-item img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
}

.drop-zones {
  height: 100%;
}

.drop-zone {
  height: 100%;
}
</style>