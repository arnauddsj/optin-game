<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PublicLayout from '@/layouts/PublicLayout.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isFullscreen = ref(false)

const startGame = () => {
  router.push('/intro-game')
}

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().then(() => {
      isFullscreen.value = true
    }).catch((err) => {
      console.error(`Error attempting to enable fullscreen: ${err.message}`)
    })
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
      isFullscreen.value = false
    }
  }
}

const goToAdmin = () => {
  router.push('/admin')
}

onMounted(() => {
  document.addEventListener('fullscreenchange', () => {
    isFullscreen.value = !!document.fullscreenElement
  })
})
</script>

<template>
  <PublicLayout>
    <div class="flex flex-col justify-center p-16 text-2xl gap-12">
      <p>Ceci est la page d'initialisation du jeu. Appuyez sur le bouton passer en plein écran puis Démarrez le jeu.</p>
      <button @click="toggleFullscreen" class="bg-vw-light text-white text-xl font-medium py-2 px-4 rounded-full">
        {{ isFullscreen ? 'Quitter le plein écran' : '1 - Passer en plein écran' }}
      </button>
      <button @click="startGame" class="bg-vw-light text-white text-xl font-medium py-2 px-4 rounded-full">
        2 - Démarrer le jeu
      </button>
      <button @click="goToAdmin">Admin</button>
    </div>
  </PublicLayout>
</template>
