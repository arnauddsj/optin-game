<script setup lang="ts">
import { ref } from 'vue'
import { 
  DialogRoot, 
  DialogTrigger,
  DialogPortal, 
  DialogOverlay, 
  DialogContent, 
  DialogTitle, 
  DialogClose
} from 'radix-vue'

const isOpen = ref(false)

const openDialog = () => {
  isOpen.value = true
}

const closeDialog = () => {
  isOpen.value = false
}
</script>

<template>
  <DialogRoot v-model:open="isOpen">
    <DialogTrigger @click="openDialog" class="trigger-button text-xs underline cursor-pointer min-height m-0 p-0 font-inherit bg-transparent border-none inline leading-none">
     Lire les conditions d'utilisation
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-50 bg-black/50" />
      <DialogContent class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="flex flex-col gap-5 bg-white py-10 px-5 shadow-lg text-center text-vw-dark w-[80%] max-w-md">
          <DialogTitle class="text-3xl font-bold">
            Nos conditions d'utilisation
          </DialogTitle>
          <div class="flex flex-col justify-center items-center gap-2">
            <DialogClose asChild>
              <button @click="closeDialog" class="bg-vw-light text-white text-base py-2 px-4 rounded">
                Fermer
              </button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped lang="scss">
.inline {
  display: inline;
}

.trigger-button {
  display: inline;
  min-height: 1px;
  margin: 0;
  padding: 0;
}
</style>
