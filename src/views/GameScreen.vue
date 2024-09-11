<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'

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

const draggedCar = ref<Car | null>(null)

const onDragStart = (car: Car) => {
  draggedCar.value = car
}

const onDragEnd = () => {
  draggedCar.value = null
}

const onDragOver = (event: DragEvent) => {
  event.preventDefault()
}

const onDrop = (zoneId: number) => {
  if (!draggedCar.value) return

  const sourceZone = zones.value.find(zone => zone.car && zone.car.id === draggedCar.value?.id)
  const targetZone = zones.value.find(zone => zone.id === zoneId)

  if (sourceZone) {
    sourceZone.car = null
  } else {
    initialList.value = initialList.value.filter(car => car.id !== draggedCar.value?.id)
  }

  if (targetZone) {
    if (targetZone.car) {
      initialList.value.push(targetZone.car)
    }
    targetZone.car = draggedCar.value
  }

  draggedCar.value = null
}

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
})
</script>

<template>
  <div class="game-screen w-full flex flex-col items-center justify-center min-h-screen bg-sky-700 text-slate-50 p-4">
    <h1 class="text-2xl font-bold mb-8">VolksWagen History Game</h1>

    <div class="flex flex-col items-center cars-to-place mb-8">
      <h2 class="text-base font-semibold mb-4">Place each car to their creation year</h2>
      <div class="flex overflow-x-auto pb-4">
        <div v-for="car in initialList" :key="car.id" class="car-item flex-shrink-0 mr-4 text-center cursor-move"
          draggable="true" @dragstart="onDragStart(car)" @dragend="onDragEnd">
          <img :src="car.image" :alt="car.name" class="w-32 h-auto mb-2">
          <p class="text-sm">{{ car.name }}</p>
        </div>
      </div>
    </div>

    <div class="drop-zones w-full flex flex-col items-center justify-center  p-8">
      <div class="flex justify-between w-full gap-8">
        <div v-for="zone in zones" :key="zone.id"
          class="drop-zone w-[calc(25%-1rem)] mb-4 p-4 ring-2 ring-slate-50 rounded-lg" @dragover="onDragOver"
          @drop="onDrop(zone.id)">
          <div class="min-h-[100px] mb-2">
            <img v-if="zone.car" :src="zone.car.image" :alt="zone.car.name" class="w-full h-auto cursor-move"
              draggable="true" @dragstart="onDragStart(zone.car)" @dragend="onDragEnd">
          </div>
          <p class="text-center font-semibold">{{ zone.year }}</p>
        </div>
      </div>
    </div>

    <div class="mt-8 text-center">
      <Button @click="checkAnswers" :disabled="!isAllCarsPlaced">Submit Answers</Button>
    </div>
  </div>
</template>