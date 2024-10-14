<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import PublicLayout from '@/layouts/PublicLayout.vue'
import TimeUpDialog from '@/components/TimeUpDialog.vue'
import Timer from '@/components/Timer.vue'
import {
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastViewport,
} from 'radix-vue'
import { useGameStore } from '@/stores/gameStore'

interface Car {
  id: number
  name: string
  year: number
  image: string
}

const router = useRouter()

const cars = ref<Car[]>([
  { id: 1, name: 'Voiture 1', year: 1974, image: '/jeu1/voiture-1.png' },
  { id: 2, name: 'Voiture 2', year: 1983, image: '/jeu1/voiture-2.png' },
  { id: 3, name: 'Voiture 3', year: 1991, image: '/jeu1/voiture-3.png' },
  { id: 4, name: 'Voiture 4', year: 1997, image: '/jeu1/voiture-4.png' },
  { id: 5, name: 'Voiture 5', year: 2003, image: '/jeu1/voiture-5.png' },
  { id: 6, name: 'Voiture 6', year: 2008, image: '/jeu1/voiture-6.png' },
  { id: 7, name: 'Voiture 7', year: 2012, image: '/jeu1/voiture-7.png' },
  { id: 8, name: 'Voiture 8', year: 2019, image: '/jeu1/voiture-8.png' }
])

const zones = ref([
  ...cars.value.map(car => ({ id: car.id, year: car.year, car: null as Car | null })),
  ...Array(8).fill(null).map((_, index) => ({ id: index + 9, year: 0, car: null as Car | null }))
])

const draggedCar = ref<Car | null>(null)
const draggedElement = ref<HTMLElement | null>(null)

const isAllCarsPlaced = computed(() => {
  return zones.value.slice(0, 8).every(zone => zone.car !== null) &&
    zones.value.slice(8).every(zone => zone.car === null)
})


const resetGame = () => {
  const shuffledCars = [...cars.value].sort(() => Math.random() - 0.5)
  zones.value = zones.value.map((zone, index) => {
    if (index < 8) {
      return { ...zone, car: null }
    } else {
      return { ...zone, car: shuffledCars[index - 8] || null }
    }
  })
}

const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref<'error' | 'success' | 'info'>('info')

const showErrorToast = (message: string) => {
  toastMessage.value = message
  toastType.value = 'error'
  showToast.value = true
}

const gameStore = useGameStore()


watch(isAllCarsPlaced, (newValue: boolean) => {
  if (newValue) {
    const allCorrect = zones.value.slice(0, 8).every(zone => zone.car && zone.car.year === zone.year)
    if (allCorrect) {
      gameStore.incrementWins()
      router.push('/success-game1')
    } else {
      const incorrectCount = zones.value.slice(0, 8).filter(zone => zone.car && zone.car.year !== zone.year).length
      showErrorToast(`${incorrectCount} emplacements sont incorrects.`)
      zones.value = zones.value.map((zone, index) => {
        if (index < 8 && zone.car && zone.car.year !== zone.year) {
          const emptyInitialZone = zones.value.findIndex((z, i) => i >= 8 && z.car === null)
          if (emptyInitialZone !== -1) {
            zones.value[emptyInitialZone].car = zone.car
          }
          return { ...zone, car: null }
        }
        return zone
      })
    }
  }
})

const showTimeUpDialog = ref(false)
const timerDuration = ref(45)
const timerKey = ref(0)

const handleTimeUp = () => {
  showTimeUpDialog.value = true
}

const handleContinue = () => {
  resetGame()
  showTimeUpDialog.value = false
  timerKey.value++
  router.push('/intro-game2')
}

const startDrag = (event: TouchEvent, car: Car) => {
  draggedCar.value = car
  draggedElement.value = event.target as HTMLElement

  
  const ghostElement = draggedElement.value.cloneNode(true) as HTMLElement
  ghostElement.style.position = 'fixed'
  ghostElement.style.width = '250px'
  ghostElement.style.height = '250px'
  ghostElement.style.zIndex = '1000'
  ghostElement.style.opacity = '0.8'
  ghostElement.style.pointerEvents = 'none'

  document.body.appendChild(ghostElement)
  draggedElement.value = ghostElement

  event.preventDefault()
}


const onDrag = (event: TouchEvent) => {
  if (draggedElement.value) {
    const touch = event.touches[0]
    draggedElement.value.style.left = `${touch.clientX - 100}px`
    draggedElement.value.style.top = `${touch.clientY - 100}px`
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
      const zoneId = parseInt((droppedZone as HTMLElement).dataset.zoneId!)
      updateZones(draggedCar.value.id, zoneId)
    } else {
      updateZones(draggedCar.value.id, 0)
    }

    
    document.body.removeChild(draggedElement.value)
    draggedCar.value = null
    draggedElement.value = null
  }
}


const updateZones = (carId: number, newZoneId: number) => {
  const car = cars.value.find(c => c.id === carId)
  if (!car) return

  const oldZone = zones.value.find(zone => zone.car && zone.car.id === carId)
  const newZone = zones.value.find(zone => zone.id === newZoneId)

  if (!newZone) return

  if (oldZone) {
    oldZone.car = null
  }

  if (newZone.car) {
    if (oldZone) {
      oldZone.car = newZone.car
    } else {
      
      const emptyInitialZone = zones.value.find((zone, index) => index >= 8 && zone.car === null)
      if (emptyInitialZone) {
        emptyInitialZone.car = newZone.car
      }
    }
  }

  newZone.car = car
}


const createCarAnimation = (index: number) => ({
  initial: { opacity: 0, y: 50 },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 100, 
      duration: 500,
    },
  },
})

onMounted(() => {
  resetGame()
  document.body.style.overscrollBehavior = 'none'
  document.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false })
})
</script>
<template>
  <PublicLayout>
    <ToastProvider>
      <div class="flex flex-col">
        <div class="game-container flex-grow grid grid-cols-3 gap-s p-1 justify-self: center">
          <!-- Left column: Initial cars -->
          <div class="col-span-1 drop-zones grid grid-rows-8 gap-1">
            <div v-for="(zone, index) in zones.slice(8)" :key="zone.id" class="drop-zone flex items-center justify-center"
              :data-zone-id="zone.id">
              <div v-if="zone.car" class="car-item flex items-center justify-center w-full h-full"
                :data-car-id="zone.car.id" @touchstart="startDrag($event, zone.car)" @touchmove="onDrag"
                @touchend="endDrag"
                v-motion="createCarAnimation(index)">
                <img :src="zone.car.image" :alt="zone.car.name" class="object-contain w-full h-full" style="max-width: 80px;">
              </div>
            </div>
          </div>

          <!-- Middle column: Timeline -->
          <div class="col-span-1 timeline relative flex flex-col">
            <div class="absolute h-full w-0.5 bg-white left-1/2 transform -translate-x-1/2"></div>
            <div v-for="(zone, index) in zones.slice(0, 8)" :key="zone.id"
              class="year-marker flex items-center justify-center flex-grow">
              <span class="year-text text-white font-bold bg-vw-dark px-1 py-1" style="font-size: 0.8rem;"
                v-motion="{ initial: { opacity: 0, x: -20 }, enter: { opacity: 1, x: 0, transition: { delay: index * 50, duration: 300 } } }">
                {{ zone.year }}
              </span>
            </div>
          </div>

          <!-- Right column: Drop zones -->
          <div class="col-span-1 drop-zones grid grid-rows-8 gap-1">
            <div v-for="zone in zones.slice(0, 8)" :key="zone.id"
              class="drop-zone bg-vw-light flex items-center justify-center" :data-zone-id="zone.id"
              v-motion="{ initial: { opacity: 0, scale: 0.8 }, enter: { opacity: 1, scale: 1, transition: { duration: 300 } } }">
              <div v-if="zone.car" class="car-item flex items-center justify-center w-full h-full"
                :data-car-id="zone.car.id" @touchstart="startDrag($event, zone.car)" @touchmove="onDrag"
                @touchend="endDrag">
                <img :src="zone.car.image" :alt="zone.car.name" class="object-contain w-full h-full">
              </div>
            </div>
          </div>
        </div>

        <TimeUpDialog v-if="showTimeUpDialog" @continue="handleContinue" />
        <Timer :duration="timerDuration" :onTimeUp="handleTimeUp" :key="timerKey" />
        <!-- <div class="absolute bottom-0 left-0 right-0"><button class="text-sm font-regular outline-none"
            @click="router.push('/intro-game2')">next</button>
        </div> -->
      </div>

      <ToastRoot v-model:open="showToast" :duration="5000"
        class="bg-white p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut">
        <ToastTitle class="[grid-area:_title] mb-[5px] text-vw-dark text-xl">
          Continuez !
        </ToastTitle>
        <ToastDescription class="[grid-area:_description] m-0 text-vw-dark text-xs">
          {{ 8 - zones.slice(0, 8).filter(zone => zone.car !== null).length }} emplacement(s) sont incorrects.
        </ToastDescription>
      </ToastRoot>

      <ToastViewport
        class="fixed top-0 left-0 flex flex-col p-6 gap-2 max-w-[100vw] m-0 list-none z-[50] outline-none" />
    </ToastProvider>
  </PublicLayout>
</template>

<style scoped>
.game-container {
  grid-template-rows: repeat(auto-fit, minmax(0, max(135vw, 15vh)));
}

.drop-zone {
  position: relative;
}

.timeline {
  position: relative;
}

.year-marker {
  position: relative;
  z-index: 1;
}

.year-text {
  position: relative;
  z-index: 2;
}

.car-item {
  cursor: grab;
}

.car-image {
  object-fit: contain;
}
</style>