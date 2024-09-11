import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface Car {
  id: number
  name: string
  year: number
  image: string
}

export const useGameStore = defineStore('game', () => {
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

  const shuffledCars = ref<Car[]>([])
  const placedCars = ref<(Car | null)[]>([null, null, null, null, null, null, null, null])

  const isGameComplete = computed(() => {
    return placedCars.value.every((car, index) => car && car.year === cars.value[index].year)
  })

  function shuffleCars() {
    shuffledCars.value = [...cars.value].sort(() => Math.random() - 0.5)
    console.log('Cars shuffled:', shuffledCars.value)
  }

  function resetGame() {
    shuffleCars()
    placedCars.value = [null, null, null, null, null, null, null, null]
    console.log('Game reset, shuffled cars:', shuffledCars.value)
  }

  function placeCar(carId: number, zoneIndex: number) {
    const car = shuffledCars.value.find(c => c.id === carId)
    if (car) {
      placedCars.value[zoneIndex] = car
      shuffledCars.value = shuffledCars.value.filter(c => c.id !== carId)
    }
  }

  function removeCar(zoneIndex: number) {
    const removedCar = placedCars.value[zoneIndex]
    if (removedCar) {
      shuffledCars.value.push(removedCar)
      placedCars.value[zoneIndex] = null
    }
  }

  // Initialize the game
  resetGame()

  return {
    cars,
    shuffledCars,
    placedCars,
    isGameComplete,
    shuffleCars,
    resetGame,
    placeCar,
    removeCar
  }
})

export type GameStore = ReturnType<typeof useGameStore>