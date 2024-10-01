<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
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

const draggedCar = ref<Car | null>(null)
const draggedElement = ref<HTMLElement | null>(null)

const isAllCarsPlaced = computed(() => {
  return initialList.value.length === 0 && zones.value.every(zone => zone.car !== null)
})

const resetGame = () => {
  initialList.value = [...cars.value].sort(() => Math.random() - 0.5)
  zones.value.forEach(zone => zone.car = null)
}

watch(isAllCarsPlaced, (newValue: boolean) => {
  if (newValue) {
    const allCorrect = zones.value.every(zone => zone.car && zone.car.year === zone.year)
    if (allCorrect) {
      router.push('/success-game1')
    } else {
      alert("Some cars are not in the correct year. Try again!")
      zones.value.forEach(zone => {
        if (zone.car && zone.car.year !== zone.year) {
          initialList.value.push(zone.car)
          zone.car = null
        }
      })
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
  timerKey.value++
}

const handleContinue = () => {
  resetGameState()
}

const startDrag = (event: TouchEvent, car: Car) => {
  draggedCar.value = car
  draggedElement.value = event.target as HTMLElement
  const touch = event.touches[0]
  const rect = draggedElement.value.getBoundingClientRect()
  draggedElement.value.style.position = 'fixed'
  draggedElement.value.style.left = `${touch.clientX - rect.width / 2}px`
  draggedElement.value.style.top = `${touch.clientY - rect.height / 2}px`
  draggedElement.value.style.zIndex = '1000'
  event.preventDefault()
}

const onDrag = (event: TouchEvent) => {
  if (draggedElement.value) {
    const touch = event.touches[0]
    draggedElement.value.style.left = `${touch.clientX - draggedElement.value.offsetWidth / 2}px`
    draggedElement.value.style.top = `${touch.clientY - draggedElement.value.offsetHeight / 2}px`
    event.preventDefault()
  }
}

const endDrag = (event: TouchEvent) => {
  if (draggedCar.value && draggedElement.value) {
    const dropZones = document.querySelectorAll('.drop-zone')
    const touch = event.changedTouches[0]
    let droppedZone: Element | null = null

    dropZones.forEach((zone) => {
      const rect = zone.getBoundingClientRect()
      if (
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom
      ) {
        droppedZone = zone
      }
    })

    if (droppedZone) {
      const zoneId = parseInt(droppedZone.getAttribute('data-zone-id') || '0')
      updateZones(draggedCar.value.id, zoneId)
    } else {
      updateZones(draggedCar.value.id, 0)
    }

    draggedElement.value.style.position = ''
    draggedElement.value.style.left = ''
    draggedElement.value.style.top = ''
    draggedElement.value.style.zIndex = ''
    draggedCar.value = null
    draggedElement.value = null
  }
}

const updateZones = (carId: number, newZoneId: number) => {
  const car = cars.value.find(c => c.id === carId)
  if (!car) return

  zones.value = zones.value.map(zone => {
    if (zone.car && zone.car.id === carId) {
      return { ...zone, car: null }
    }
    return zone
  })
  initialList.value = initialList.value.filter(c => c.id !== carId)

  if (newZoneId !== 0) {
    zones.value = zones.value.map(zone => {
      if (zone.id === newZoneId) {
        if (zone.car) {
          initialList.value.push(zone.car)
        }
        return { ...zone, car }
      }
      return zone
    })
  } else {
    initialList.value.push(car)
  }
}

onMounted(() => {
  resetGame()
  document.body.style.overscrollBehavior = 'none'
  document.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false })
})
</script>

<template>
  <PublicLayout class="h-screen flex flex-col">
    <div class="game1-screen flex-grow flex flex-col items-center justify-between">
      <div class="game-container grid grid-cols-12 w-full h-full">
        <!-- Left column: Initial cars -->
        <div class="col-span-4 flex flex-col justify-center">
          <div class="flex flex-col justify-between drop-zone initial-cars-container h-full" :data-zone-id="0">
            <div v-for="car in initialList" :key="car.id" class="car-item flex flex-col items-center justify-center"
              :data-car-id="car.id" @touchstart="startDrag($event, car)" @touchmove="onDrag" @touchend="endDrag">
              <img :src="car.image" :alt="car.name" class="car-image object-contain w-full">
            </div>
          </div>
        </div>

        <!-- Middle column: Timeline -->
        <div class="col-span-4 timeline relative flex flex-col items-center justify-between">
          <div v-for="zone in zones" :key="zone.id" class="year-marker flex items-center w-full justify-center pr-4">
            <span class="year-text text-white font-bold text-[1rem]">{{ zone.year }}</span>
          </div>
        </div>

        <!-- Right column: Drop zones -->
        <div class="col-span-4 drop-zones grid grid-rows-8 gap-2">
          <div v-for="zone in zones" :key="zone.id" class="drop-zone bg-vw-50 w-full flex items-center justify-center"
            :data-zone-id="zone.id">
            <div class="car-container w-full h-full flex items-center justify-center">
              <div v-if="zone.car" class="car-item flex items-center justify-center" :data-car-id="zone.car.id"
                @touchstart="startDrag($event, zone.car)" @touchmove="onDrag" @touchend="endDrag">
                <img :src="zone.car.image" :alt="zone.car.name" class="max-w-full max-h-full object-contain">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <TimeUpDialog v-if="showTimeUpDialog" :message="timeUpMessage" @continue="handleContinue" />
    <Timer :duration="timerDuration" :onTimeUp="handleTimeUp" :key="timerKey" />
  </PublicLayout>
</template>

<style scoped>

.game-container {
  position: relative;
}

.drop-zone {
  position: relative;
  overflow: hidden;
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
  padding: 0.5rem 1rem;
}

.year-text {
  position: relative;
  z-index: 2;
}

.year-text::after {
  @apply bg-vw-500;
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  z-index: -1;
  border-radius: 4px;
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

.initial-cars-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.car-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>