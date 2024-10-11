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
    <DialogTrigger @click="openDialog"
      class="trigger-button text-xs underline cursor-pointer min-height m-0 p-0 font-inherit bg-transparent border-none leading-none">
      Voir le règlement du jeu concours.
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-50 bg-black/50" />
      <DialogContent class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="flex flex-col gap-3 bg-white py-5 px-5 shadow-lg text-center text-vw-dark w-[80%] max-w-md">
          <DialogTitle class="text-3xl font-bold mb-4">
            Règlement du jeu concours
          </DialogTitle>
          <div class="scrollable-content">
            <p class="text-left p-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed suscipit velit. Quisque ut aliquam velit,
              non tempus neque. Vivamus nec magna eget nisl vulputate pellentesque. Phasellus rhoncus pulvinar ante,
              congue tempus neque tristique sit amet. In a dui vitae enim interdum sollicitudin id eget dolor. Ut porta
              ultricies cursus. Quisque eu mattis turpis. Aliquam scelerisque posuere cursus. Duis faucibus, mi id
              varius gravida, quam lorem imperdiet est, in cursus mi turpis quis arcu.

              Etiam vitae sapien molestie, volutpat est a, pharetra velit. Aenean dignissim faucibus purus vel laoreet.
              Fusce lobortis velit ut lacinia varius. Cras lobortis ut eros et fermentum. Aliquam sagittis, libero eget
              efficitur laoreet, arcu massa euismod risus, a molestie neque lectus nec enim. Nam ligula arcu,
              consectetur quis condimentum non, porttitor vitae nibh. Ut fermentum, eros sit amet scelerisque venenatis,
              ipsum lectus iaculis sapien, sed auctor turpis orci quis enim. Suspendisse pharetra nibh nec justo
              tristique, a commodo elit eleifend.

              Nam ornare ipsum eget dui congue, non vulputate est aliquam. Aliquam pellentesque sagittis lacinia. Aenean
              euismod augue ut felis mollis, nec laoreet risus molestie. Proin feugiat facilisis lobortis. Fusce eget
              accumsan metus, suscipit luctus nisi. Praesent interdum sodales ipsum, in egestas enim euismod at. Integer
              sollicitudin elit eu lorem consectetur, ut semper nisi consectetur. Pellentesque nec massa ac nisl
              suscipit sagittis. In accumsan purus vehicula augue bibendum pulvinar in at lacus.

              Praesent ultrices eros id nunc condimentum feugiat. Vivamus eu rhoncus elit. Quisque dictum est et auctor
              volutpat. Nulla eget lorem orci. Sed luctus congue ullamcorper. Quisque fringilla tincidunt lorem, sit
              amet venenatis felis varius eget. Maecenas iaculis ut magna quis fringilla.

              Nam vehicula vehicula leo, et suscipit mi mollis id. Etiam eu pharetra nibh, quis ultricies velit. Etiam
              volutpat arcu at dolor condimentum condimentum. Quisque quis massa gravida, hendrerit elit eget, pulvinar
              diam. Suspendisse molestie orci vitae purus dictum, id ullamcorper dui laoreet. Vestibulum sed lacus et
              augue lobortis fringilla gravida vitae lorem. Cras massa erat, laoreet non pretium vel, malesuada a
              libero. Aliquam sed elementum justo. Nullam blandit ultricies sagittis. In libero nunc, commodo a sagittis
              nec, maximus ac risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
              curae; Vivamus sed sodales tellus. Aenean eu egestas libero, sed dictum ligula. Fusce at quam vitae odio
              gravida suscipit sed vitae dui. Mauris bibendum ornare est, ac malesuada felis molestie a. Nullam
              scelerisque mattis velit, vitae ullamcorper felis gravida quis.

              Etiam eget aliquam elit, sit amet viverra ante. Etiam venenatis efficitur lacus, pellentesque convallis
              nisi condimentum eu. Integer imperdiet bibendum erat nec hendrerit. Fusce tincidunt nibh purus, eget
              molestie dolor rhoncus viverra. Suspendisse euismod tellus a luctus eleifend. Etiam feugiat enim ac nibh
              vestibulum vehicula. Pellentesque eu tempus sem, non faucibus libero. Fusce pulvinar sem vitae diam
              pellentesque bibendum.

              Nullam eget tristique enim. Vestibulum vehicula nulla dapibus nisi varius facilisis. Sed massa massa,
              facilisis at ante vel, consectetur euismod mauris. Duis posuere suscipit nisl, ut tincidunt diam ultrices
              quis. Proin feugiat quam a tristique dapibus. Proin non risus quis ipsum vestibulum rhoncus et id sem. Nam
              porttitor, eros nec scelerisque tincidunt, mi libero venenatis justo, eu ullamcorper nisl dui vitae velit.
            </p>
          </div>
          <div class="flex flex-col justify-center items-center gap-2 mt-4">
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

.scrollable-content {
  max-height: 60vh;
  overflow-y: auto;
  border: 1px solid #ccc;
}
</style>
