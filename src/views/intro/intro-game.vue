<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMotion } from '@vueuse/motion'
import PublicLayout from '@/layouts/PublicLayout.vue'
import Button from '@/components/Button.vue'

const container = ref(null)
const text = ref(null)
const button = ref(null)
const image = ref(null)

const containerMotion = useMotion(container, {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 300 } },
})

const textMotion = useMotion(text, {
  initial: { opacity: 0, y: 30 },
  enter: { opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } },
})

const buttonMotion = useMotion(button, {
  initial: { opacity: 0, scale: 0.9 },
  enter: { opacity: 1, scale: 1, transition: { duration: 500, delay: 400, ease: 'easeOut' } },
})

const imageMotion = useMotion(image, {
  initial: { opacity: 0, scale: 1.05 },
  enter: { opacity: 1, scale: 1, transition: { duration: 1000, delay: 600, ease: 'easeOut' } },
})

onMounted(() => {
  document.body.style.overflow = 'hidden'
})
</script>

<template>
  <PublicLayout>
    <div class="flex flex-col h-full overflow-hidden" ref="container" v-motion="containerMotion">
      <div class="flex flex-col flex-grow justify-center p-16 text-3xl gap-12">
        <p ref="text" v-motion="textMotion">
          Pour les 50 ans de la Golf, tentez de remporter un <span class="font-bold">bon d'achat d'une valeur de
          100€</span> sur la boutique en ligne Volkswagen.
        </p>
        <div ref="button" v-motion="buttonMotion">
          <Button cta="Jouer" link="/intro-game1" />
        </div>
      </div>
      <div ref="image" v-motion="imageMotion">
        <img src="/ui/intro.webp" alt="lots" class="w-full" />
      </div>
    </div>
  </PublicLayout>
</template>
