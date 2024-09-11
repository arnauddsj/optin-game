<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import Sortable from 'sortablejs'
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

const zones = ref(cars.value.map(car => ({ id: car.id, year: car.year, cars: [] as Car[] })))

const initialList = ref<Car[]>([])

const isAllCarsPlaced = computed(() => {
  return initialList.value.length === 0 && zones.value.every(zone => zone.cars.length === 1)
})

const setupSortable = () => {
  const initialListEl = document.getElementById('initialList')
  if (initialListEl) {
    new Sortable(initialListEl, {
      group: 'shared',
      animation: 150,
      onAdd: (evt) => {
        const carId = parseInt(evt.item.getAttribute('data-id') || '0')
        const car = cars.value.find(c => c.id === carId)
        if (car && !initialList.value.some(c => c.id === carId)) {
          initialList.value.push(car)
        }
      },
      onRemove: (evt) => {
        const carId = parseInt(evt.item.getAttribute('data-id') || '0')
        initialList.value = initialList.value.filter(car => car.id !== carId)
      }
    })
  }

  zones.value.forEach(zone => {
    const zoneEl = document.getElementById('zone' + zone.id)
    if (zoneEl) {
      new Sortable(zoneEl, {
        group: 'shared',
        animation: 150,
        onAdd: (evt) => {
          const carId = parseInt(evt.item.getAttribute('data-id') || '0')
          const car = cars.value.find(c => c.id === carId)
          if (car) {
            // If there's already a car in this zone, move it back to the initial list
            if (zone.cars.length > 0) {
              const displacedCar = zone.cars[0]
              initialList.value.push(displacedCar)
              zone.cars = []
            }

            // Remove the car from other zones if it exists
            zones.value.forEach(z => {
              z.cars = z.cars.filter(c => c.id !== carId)
            })

            // Add the car to the current zone
            zone.cars = [car]

            // Remove the car from the initial list
            initialList.value = initialList.value.filter(c => c.id !== carId)
          }
        },
        onRemove: (evt) => {
          const carId = parseInt(evt.item.getAttribute('data-id') || '0')
          // Remove the car from the zone
          zone.cars = zone.cars.filter(car => car.id !== carId)
        }
      })
    }
  })
}

const resetGame = () => {
  initialList.value = [...cars.value].sort(() => Math.random() - 0.5)
  zones.value.forEach(zone => zone.cars = [])
}

const checkAnswers = () => {
  if (isAllCarsPlaced.value) {
    const allCorrect = zones.value.every(zone => {
      const placedCar = zone.cars[0]
      return placedCar && placedCar.year === zone.year
    })

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
  setupSortable()
})
</script>

<template>
  <div class="game-screen p-4">
    <h1 class="text-2xl font-bold mb-4">VolksWagen History Game</h1>
    <div class="game-area flex flex-col md:flex-row">
      <div class="initial-list w-full md:w-1/4 bg-gray-100 p-4 rounded-lg mb-4 md:mb-0 md:mr-4">
        <h2 class="text-xl font-semibold mb-2">Cars</h2>
        <ul id="initialList" class="min-h-[200px]">
          <li v-for="car in initialList" :key="car.id" :data-id="car.id" class="bg-white p-2 mb-2 rounded shadow">
            <img :src="car.image" :alt="car.name" class="w-full h-auto">
          </li>
        </ul>
      </div>
      <div class="drop-zones w-full md:w-3/4 flex flex-wrap justify-between">
        <div v-for="zone in zones" :key="zone.id" class="drop-zone bg-gray-100 p-4 rounded-lg mb-4 w-[48%]">
          <h2 class="text-xl font-semibold mb-2">{{ zone.year }}</h2>
          <ul :id="'zone' + zone.id" class="min-h-[100px]">
            <li v-for="car in zone.cars" :key="car.id" :data-id="car.id" class="bg-white p-2 mb-2 rounded shadow">
              <img :src="car.image" :alt="car.name" class="w-full h-auto">
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <Button @click="checkAnswers" :disabled="!isAllCarsPlaced">Submit Answers</Button>
    </div>
  </div>
</template>