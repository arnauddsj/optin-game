<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMotion } from '@vueuse/motion'
import PublicLayout from '@/layouts/PublicLayout.vue'
import Button from "@/components/Button.vue"

const container = ref(null)
const title = ref(null)
const button = ref(null)
const image = ref(null)

const containerMotion = useMotion(container, {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 300 } },
})

const titleMotion = useMotion(title, {
  initial: { opacity: 0, y: 50 },
  enter: { opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } },
})

const buttonMotion = useMotion(button, {
  initial: { opacity: 0, scale: 0.9 },
  enter: { opacity: 1, scale: 1, transition: { duration: 500, delay: 600, ease: 'easeOut' } },
})

const imageMotion = useMotion(image, {
  initial: { opacity: 0, scale: 1.1 },
  enter: { opacity: 1, scale: 1, transition: { duration: 900, delay: 800, ease: 'easeOut' } },
})

onMounted(() => {
  document.body.style.overflow = 'hidden'
})
</script>

<template>
  <PublicLayout>
    <div class="flex flex-col h-full overflow-hidden" ref="container" v-motion="containerMotion">
      <div class="flex flex-col flex-grow justify-center p-10">
        <div class="content flex flex-col gap-10">
          <h2 class="text-2xl" ref="title" v-motion="titleMotion">
            À l'été 1976, Volkswagen a lancé sur le marché une Golf particulièrement sportive : la GTI. Qui deviendra
            ensuite le modèle sportif compact le plus vendu au monde.
          </h2>
          <div ref="button" v-motion="buttonMotion">
            <Button cta="Commencer" link="/game2" />
          </div>
        </div>
      </div>
      <div ref="image" v-motion="imageMotion">
        <img src="/ui/jeu2.webp" alt="golf gti" class="w-full" />
      </div>
    </div>
  </PublicLayout>
</template>

<style scoped>

</style>