<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import PublicLayout from '@/layouts/PublicLayout.vue'
import TimeUpDialog from '@/components/TimeUpDialog.vue'
import Timer from '@/components/Timer.vue'
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()
const router = useRouter()

interface Album {
  id: number
  name: string
  image: string
  isCorrect: boolean
  isSelected: boolean
}

const golfs = ref<Album[]>([
  { id: 1, name: 'Golf GTD', image: '/jeu2/golf-gtd.webp', isCorrect: false, isSelected: false },
  { id: 2, name: 'Golf R', image: '/jeu2/golf-r.webp', isCorrect: false, isSelected: false },
  { id: 3, name: "Golf SW", image: '/jeu2/golf-sw.webp', isCorrect: true, isSelected: false },
  { id: 4, name: 'Golf GTE.', image: '/jeu2/golf-gte.webp', isCorrect: false, isSelected: false },
])

const isCorrectSelection = computed(() => {
  const selectedAlbums = golfs.value.filter(golf => golf.isSelected)
  return selectedAlbums.length === 2 && selectedAlbums.every(golf => golf.isCorrect)
})

const toggleAlbum = (golf: Album) => {
  golf.isSelected = !golf.isSelected

  if (isCorrectSelection.value) {
    gameStore.incrementWins()
    router.push('/success-game2')
  }
}

const showTimeUpDialog = ref(false)
const timerDuration = ref(15)
const timerKey = ref(0)

const handleTimeUp = () => {
  showTimeUpDialog.value = true
}

const resetGameState = () => {
  golfs.value.forEach(golf => {
    golf.isSelected = false
  })
  showTimeUpDialog.value = false
  timerKey.value++
}

const handleContinue = () => {
  resetGameState()
  router.push('/intro-game3')
}
</script>

<template>
  <PublicLayout>
    <div class="flex flex-col flex-grow px-10 justify-center">
      <h2 class="text-2xl mb-10 px-2">Parmi ces propositions, quelle version <span class="font-bold">n’est pas un modèle
          sportif</span> de la Golf ?</h2>
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div v-for="golf in golfs" :key="golf.id" class="golf" :class="{ 'selected': golf.isSelected }">
          <div class="flex flex-col items-center">
            <img :src="golf.image" :alt="golf.name" class="cursor-pointer" @click="toggleAlbum(golf)"
              :style="{ transform: golf.isSelected ? 'scale(1.1)' : 'scale(1)' }">
            <p class="text-center mt-2">{{ golf.name }}</p>
          </div>
        </div>
      </div>
      <Button cta="Valider" @click="handleContinue" />
      <TimeUpDialog v-if="showTimeUpDialog" @continue="handleContinue" />
      <Timer :duration="timerDuration" :onTimeUp="handleTimeUp" :key="timerKey" />
    </div>
  </PublicLayout>
</template>

<style scoped>
img {
  width:380px;
  height: auto;
  transition: all 0.3s ease;
}

.golf {
  transition: all 0.3s ease;
}

.golf-cover.selected img {
  outline: 4px solid #00B0F0;
  /* VW light blue color */
  outline-offset: 4px;
}
</style>