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
  enter: { opacity: 1, scale: 1, transition: { duration: 1000, delay: 800, ease: 'easeOut' } },
})

onMounted(() => {
  document.body.style.overflow = 'hidden'
})
</script>

<template>
  <PublicLayout>
    <div class="flex flex-col h-full overflow-hidden" ref="container" v-motion="containerMotion">
      <div class="flex flex-col flex-grow justify-center p-2">
        <div class="content flex flex-col gap-4"  style="line-height: 1.2rem">
          <h2 ref="title" v-motion="titleMotion" style="font-size: 0.6rem!important; line-height: 0.8rem!important;">
            Traversant les générations depuis 50 ans, la Golf n'a cessé d'évoluer avec son temps. La preuve en est avec
            la Nouvelle Golf sortie cette année, qui intègre une <span class="font-bold">technologie embarquée</span>
            permettant notamment de réaliser des recherches sur Internet via la commande vocale.
          </h2>
          <div ref="button" v-motion="buttonMotion">
            <Button cta="Commencer" link="/game3" />
          </div>
        </div>
      </div>
      <div ref="image" v-motion="imageMotion">
        <img src="/ui/jeu3.webp" alt="golf gti" class="w-full" />
      </div>
    </div>
  </PublicLayout>
</template>

<style scoped></style>