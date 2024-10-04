<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import PublicLayout from '@/layouts/PublicLayout.vue'
import TimeUpDialog from '@/components/TimeUpDialog.vue'
import Timer from '@/components/Timer.vue'
import { useGameStore } from '@/stores/gameStore'
import { ToastProvider, ToastRoot, ToastTitle, ToastDescription, ToastViewport } from 'radix-vue'

const gameStore = useGameStore()
const router = useRouter()

interface Golf {
  id: number
  name: string
  image: string
  isCorrect: boolean
  isSelected: boolean
}

const golfs = ref<Golf[]>([
  { id: 1, name: 'Golf GTD', image: '/jeu2/golf-gtd.webp', isCorrect: false, isSelected: false },
  { id: 2, name: 'Golf R', image: '/jeu2/golf-r.webp', isCorrect: false, isSelected: false },
  { id: 3, name: "Golf SW", image: '/jeu2/golf-sw.webp', isCorrect: true, isSelected: false },
  { id: 4, name: 'Golf GTE.', image: '/jeu2/golf-gte.webp', isCorrect: false, isSelected: false },
])

const isCorrectSelection = computed(() => {
  const selectedGolfs = golfs.value.filter(golf => golf.isSelected)
  return selectedGolfs.length === 1 && selectedGolfs[0].isCorrect
})

const toggleChoice = (golf: Golf) => {
  golf.isSelected = !golf.isSelected
}

const showToast = ref(false)

const validateSelection = () => {
  if (isCorrectSelection.value) {
    gameStore.incrementWins()
    router.push('/success-game2')
  } else {
    showToast.value = true
    resetSelection()
  }
}

const resetSelection = () => {
  golfs.value.forEach(golf => {
    golf.isSelected = false
  })
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
    <ToastProvider>
      <div class="flex flex-col flex-grow px-10 justify-center">
        <h2 class="text-2xl mb-10 px-2">Parmi ces propositions, quelle version <span class="font-bold">n’est pas un modèle
            sportif</span> de la Golf ?</h2>
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div v-for="golf in golfs" :key="golf.id" class="golf" :class="{ 'selected': golf.isSelected }">
            <div class="flex flex-col items-center">
              <img :src="golf.image" :alt="golf.name" class="cursor-pointer" @click="toggleChoice(golf)"
                :style="{ transform: golf.isSelected ? 'scale(1.1)' : 'scale(1)' }">
              <p class="text-center mt-2">{{ golf.name }}</p>
            </div>
          </div>
        </div>
        <button class="bg-vw-blue text-white py-2 px-4 rounded mt-4" @click="validateSelection">Valider</button>
        <TimeUpDialog v-if="showTimeUpDialog" @continue="handleContinue" />
        <Timer :duration="timerDuration" :onTimeUp="handleTimeUp" :key="timerKey" />
      </div>

      <ToastRoot v-model:open="showToast" :duration="3000"
        class="bg-white p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut">
        <ToastTitle class="[grid-area:_title] mb-[5px] text-vw-dark text-xl">
          Essayez encore !
        </ToastTitle>
        <ToastDescription class="[grid-area:_description] m-0 text-vw-dark text-xs">
          Votre sélection n'est pas correcte.
        </ToastDescription>
      </ToastRoot>

      <ToastViewport
        class="fixed top-0 left-0 flex flex-col p-6 gap-2 max-w-[100vw] m-0 list-none z-[50] outline-none" />
    </ToastProvider>
  </PublicLayout>
</template>

<style scoped>
img {
  width: 380px;
  height: auto;
  transition: all 0.3s ease;
}

.golf {
  transition: all 0.3s ease;
}

.golf.selected img {
  outline: 4px solid #00B0F0;
  outline-offset: 4px;
}
</style>