import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import { createPinia } from 'pinia'

function openFullscreen() {
  const elem = document.documentElement
  if (elem.requestFullscreen) {
    elem.requestFullscreen()
  } else if ((elem as any).webkitRequestFullscreen) { /* Safari */
    (elem as any).webkitRequestFullscreen()
  } else if ((elem as any).msRequestFullscreen) { /* IE11 */
    (elem as any).msRequestFullscreen()
  }
}

function lockOrientation() {
  if (screen.orientation && 'lock' in screen.orientation) {
    (screen.orientation as any).lock('portrait').catch((error: unknown) => {
      console.log(error);
    });
  }
}

const app = createApp(App)
const pinia = createPinia()
app.use(MotionPlugin)
app.use(pinia)
app.use(router)
app.mount('#app')

app.config.globalProperties.$nextTick(() => {
  openFullscreen()
  lockOrientation()
})