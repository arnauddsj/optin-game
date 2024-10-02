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
  artist: string
  image: string
  isCorrect: boolean
}

const albums = ref<Album[]>([
  { id: 1, name: 'In Utero', artist: 'Nirvana', image: '/covers/nirvana.jpg', isCorrect: false },
  { id: 2, name: 'Le Grand Bleu', artist: 'Eric Serra', image: '/covers/grandbleu.jpg', isCorrect: false },
  { id: 3, name: "(What's the Story) Morning Glory?", artist: 'Oasis', image: '/covers/oasis.jpg', isCorrect: true },
  { id: 4, name: 'Born in the U.S.A.', artist: 'Bruce Springsteen', image: '/covers/bruce.jpg', isCorrect: true },
])

const selectedAlbums = ref<number[]>([])

const isCorrectSelection = computed(() => {
  return selectedAlbums.value.length === 2 &&
         albums.value.filter(album => selectedAlbums.value.includes(album.id)).every(album => album.isCorrect)
})

const toggleAlbum = (albumId: number) => {
  const index = selectedAlbums.value.indexOf(albumId)
  if (index === -1) {
    selectedAlbums.value.push(albumId)
  } else {
    selectedAlbums.value.splice(index, 1)
  }

  if (isCorrectSelection.value) {
    router.push('/success-game2')
  }
}

const showTimeUpDialog = ref(false)
const timerDuration = ref(30)
const timerKey = ref(0)

const handleTimeUp = () => {
  showTimeUpDialog.value = true
}

const resetGameState = () => {
  selectedAlbums.value = []
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
      <h2 class="text-xl font-bold mb-4">Parmi les 4 pochettes d'album ci-dessous, lesquelles correspondent
        à la <span class="font-bold">période de construction de la Golf 2 GTI (1984-1992)</span></h2>
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div v-for="album in albums" :key="album.id" class="album-cover" :class="{ 'selected': selectedAlbums.includes(album.id) }">
          <img :src="album.image" :alt="album.name" class="w-full h-auto cursor-pointer"
            @click="toggleAlbum(album.id)">
          <p class="text-center mt-2">{{ album.name }} - {{ album.artist }}</p>
        </div>
      </div>
      <TimeUpDialog v-if="showTimeUpDialog" @continue="handleContinue" />
      <Timer :duration="timerDuration" :onTimeUp="handleTimeUp" :key="timerKey" />
    </div>
  </PublicLayout>
</template>

<style scoped>
.album-cover {
  transition: all 0.3s ease;
}

.album-cover:hover {
  transform: scale(1.05);
}

.album-cover.selected {
  transform: scale(1.05);
}

.album-cover.selected img {
  outline: 4px solid #00B0F0; /* VW light blue color */
  outline-offset: 4px;
}
</style>