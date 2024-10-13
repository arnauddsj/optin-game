<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMotion } from '@vueuse/motion'
import { useRouter } from 'vue-router'
import PublicLayout from '@/layouts/PublicLayout.vue'
import Button from "@/components/Button.vue"

const router = useRouter()
const container = ref(null)
const content = ref(null)
const button = ref(null)

const containerMotion = useMotion(container, {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 300 } },
})

const contentMotion = useMotion(content, {
  initial: { opacity: 0, y: 30 },
  enter: { opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } },
})

const buttonMotion = useMotion(button, {
  initial: { opacity: 0, scale: 0.9 },
  enter: { opacity: 1, scale: 1, transition: { duration: 500, delay: 400, ease: 'easeOut' } },
})

onMounted(() => {
  setTimeout(() => {
    router.push('/intro-game')
  }, 6000)
})
</script>

<template>
  <PublicLayout>
    <div class="flex flex-col h-full" ref="container" v-motion="containerMotion">
      <div class="flex flex-col flex-1 justify-center p-4">
        <div class="content flex flex-col gap-4" ref="content" v-motion="contentMotion">
          <h2 style="line-height: 1.25rem;">
            <span class="font-bold">Merci,</span>
            <br />
            nous avons bien reçu votre participation.
          </h2>
          <div ref="button" v-motion="buttonMotion">
            <Button cta="Relancer le jeu" link="/intro-game" />
          </div>
        </div>
      </div>
    </div>
  </PublicLayout>
</template>

<style scoped></style>