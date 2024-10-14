<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMotion } from '@vueuse/motion'
import PublicLayout from '@/layouts/PublicLayout.vue'
import TimeUpDialog from '@/components/TimeUpDialog.vue'
import Timer from '@/components/Timer.vue'
import { useGameStore } from '@/stores/gameStore'
import { ToastProvider, ToastRoot, ToastTitle, ToastDescription, ToastViewport } from 'radix-vue'

const gameStore = useGameStore()
const router = useRouter()

interface Tech {
  id: number
  name: string
  image: string
  isCorrect: boolean
  isSelected: boolean
}

const techs = ref<Tech[]>([
  { id: 1, name: '4 Motion', image: '/jeu3/4motion.png', isCorrect: false, isSelected: false},
  { id: 2, name: 'ChatGPT', image: '/jeu3/ChatGPT.png', isCorrect: true, isSelected: false},
  { id: 3, name: 'ABS', image: '/jeu3/ABS.png', isCorrect: false, isSelected: false},
  { id: 4, name: "ESP", image: '/jeu3/ESP.png', isCorrect: false, isSelected: false},
])

const isCorrectSelection = computed(() => {
  const selectedTechs = techs.value.filter(tech => tech.isSelected)
  return selectedTechs.length === 1 && selectedTechs[0].name === 'ChatGPT'
})

const toggleChoice = (tech: Tech) => {
  tech.isSelected = !tech.isSelected
}

const showToast = ref(false)

const validateSelection = () => {
  if (isCorrectSelection.value) {
    gameStore.incrementWins()
    router.push('/success-game3')
  } else {
    showToast.value = true
    resetSelection()
  }
}

const resetSelection = () => {
  techs.value.forEach(tech => {
    tech.isSelected = false
  })
}

const showTimeUpDialog = ref(false)
const timerDuration = ref(15)
const timerKey = ref(0)

const handleTimeUp = () => {
  showTimeUpDialog.value = true
}

const resetGameState = () => {
  resetSelection()
  showTimeUpDialog.value = false
  timerKey.value++
}

const handleContinue = () => {
  resetGameState()
  router.push('/optin')
}

const title = ref(null)
const techContainer = ref(null)
const validateButton = ref(null)

const titleMotion = useMotion(title, {
  initial: { opacity: 0, y: -20 },
  enter: { opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } },
})

const techContainerMotion = useMotion(techContainer, {
  initial: { opacity: 0, y: 20 },
  enter: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 800, 
      delay: 100,
      ease: 'easeOut'
    } 
  },
})

const validateButtonMotion = useMotion(validateButton, {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  enter: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { 
      duration: 600, 
      delay: 1200,
      ease: 'easeOut'
    } 
  },
})

const createTechAnimation = (index: number) => ({
  initial: { opacity: 0, y: 0, scale: 0.85 },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 200 + index * 150,
      duration: 500,
      ease: 'easeOut',
    },
  },
})

onMounted(() => {
  document.body.style.overflow = 'hidden'
})
</script>

<template>
  <PublicLayout>
    <ToastProvider>
      <div class="flex flex-col flex-grow px-2 justify-center">
        <h2 class="px-2" ref="title" v-motion="titleMotion"  style="line-height: 0.85rem!important;font-size:0.6rem!important; margin-bottom: 0.5rem;">
          Parmi ces technologies, laquelle vous permet d'effectuer des <span class="font-bold"> recherches vocales ?
          </span>
        </h2>
        <div class="grid grid-cols-2 gap-2 auto-rows-fr" ref="techContainer" v-motion="techContainerMotion">
          <div v-for="(tech, index) in techs" :key="tech.id" class="flex flex-col items-center "
            :class="{ 'selected': tech.isSelected }" v-motion="createTechAnimation(index)">
            <div class="">
              <div class="justify-center">
                <img :src="tech.image" :alt="tech.name" class="cursor-pointer" @click="toggleChoice(tech)"
                  :style="{ transform: tech.isSelected ? 'scale(1.05)' : 'scale(1)' }"
                  :class="{ 'chatGPT': tech.name === 'ChatGPT' }">
              </div>
              <p class="text-center mt-2" style="font-size: 0.5rem!important; line-height: 0.75rem!important;">{{ tech.name }}</p>
            </div>
          </div>
        </div>
        <button class="bg-vw-light text-white font-medium py-1 px-2 whitespace-nowrap outline-none" style="margin-top:0px;min-height: 1.3rem!important; padding-top:0!important;padding-bottom:0!important;font-size: 0.85rem;"
          @click="validateSelection" ref="validateButton" v-motion="validateButtonMotion">
          Valider
        </button>
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
  width: 280px;
  height: auto;
  max-width: 280px;
  transition: all 0.3s ease;
}

.tech {
  transition: all 0.3s ease;
}

.tech.selected img {
  outline: 4px solid #00B0F0;
  /* VW light blue color */
  outline-offset: 4px;
}

.chatGPT {
  height: 60px;
}

.tech {
  height: 10rem;
  display: flex;
  flex-direction: column;
}

.tech > div {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

img {
  height: auto;
  width: 100px;
  object-fit: contain;
}
</style>