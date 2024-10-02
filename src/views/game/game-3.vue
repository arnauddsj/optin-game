<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import PublicLayout from '@/layouts/PublicLayout.vue'
import TimeUpDialog from '@/components/TimeUpDialog.vue'
import Timer from '@/components/Timer.vue'

const router = useRouter()

interface Album {
  id: number
  name: string
  image: string
  isCorrect: boolean
  isSelected: boolean
}

const albums = ref<Album[]>([
  { id: 1, name: 'ESP', image: '/covers/nirvana.jpg', isCorrect: false, isSelected: false},
  { id: 2, name: 'ABS', image: '/covers/grandbleu.jpg', isCorrect: false, isSelected: false},
  { id: 3, name: "Airbag frontal", image: '/covers/oasis.jpg', isCorrect: true, isSelected: false},
  { id: 4, name: 'Airbags latéraux', image: '/covers/bruce.jpg', isCorrect: true, isSelected: false},
])

const isCorrectSelection = computed(() => {
  const selectedAlbums = albums.value.filter(album => album.isSelected)
  return selectedAlbums.length === 2 && selectedAlbums.every(album => album.isCorrect)
})

const toggleAlbum = (album: Album) => {
  album.isSelected = !album.isSelected

  if (isCorrectSelection.value) {
    router.push('/success-game3')
  }
}

const showTimeUpDialog = ref(false)
const timerDuration = ref(30)
const timerKey = ref(0)

const handleTimeUp = () => {
  showTimeUpDialog.value = true
}

const resetGameState = () => {
  albums.value.forEach(album => {
    album.isSelected = false

  })
  showTimeUpDialog.value = false
  timerKey.value++
}

const handleContinue = () => {
  resetGameState()
}
</script>

<template>
  <PublicLayout>
    <div class="flex flex-col flex-grow px-10 justify-center">
      <h2 class="text-base mb-8">Parmi les 4 pochettes d'album ci-dessous, sélectionnez celles qui correspondent
        à la <span class="font-bold">période de construction de la Golf 2 GTI (1984-1992)</span></h2>
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div v-for="album in albums" :key="album.id" class="album-cover" :class="{ 'selected': album.isSelected }">
          <div class="flex flex-col items-center">
            <img :src="album.image" :alt="album.name" class="cursor-pointer" @click="toggleAlbum(album)"
              :style="{ transform: album.isSelected ? 'scale(1.1)' : 'scale(1)' }">
            <p class="text-center mt-2">{{ album.name }} </p>
          </div>
        </div>
      </div>
      <TimeUpDialog v-if="showTimeUpDialog" @continue="handleContinue" />
      <Timer :duration="timerDuration" :onTimeUp="handleTimeUp" :key="timerKey" />
    </div>
  </PublicLayout>
</template>

<style scoped>
img {
  width: 280px;
  height: auto;
  transition: all 0.3s ease;
}

.album-cover {
  transition: all 0.3s ease;
}

.album-cover.selected img {
  outline: 4px solid #00B0F0;
  /* VW light blue color */
  outline-offset: 4px;
}
</style>