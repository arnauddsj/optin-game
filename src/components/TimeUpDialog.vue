<script setup lang="ts">
import { 
  DialogRoot, 
  DialogPortal, 
  DialogOverlay, 
  DialogContent, 
  DialogTitle, 
  DialogDescription,
  DialogClose
} from 'radix-vue'
import Button from './Button.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const emit = defineEmits(['continue'])

const handleContinue = () => {
  emit('continue')
}

const handleQuit = () => {
  router.push('/intro-game')
}
</script>

<template>
  <DialogRoot defaultOpen>
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-50 bg-black/50" />
      <DialogContent class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="flex flex-col gap-5 bg-white py-10 px-5 shadow-lg text-center text-vw-dark w-[80%] max-w-md">
          <DialogTitle class="text-3xl font-bold">
            Malheureusement le temps est écoulé !
          </DialogTitle>
          <DialogDescription class="text-2xl">
            Passez à l’épreuve suivante.
          </DialogDescription>
          <div class="flex flex-col justify-center items-center gap-2">
            <DialogClose asChild>
              <Button cta="Continuer" @click="handleContinue" />
            </DialogClose>
            <DialogClose asChild>
              <button class="text-vw-dark text-base p-0" @click="handleQuit">
                Abandonner
              </button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>