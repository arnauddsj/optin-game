import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

function openFullscreen() {
  const elem = document.documentElement
  if (elem.requestFullscreen) {
    elem.requestFullscreen()
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen()
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen()
  }
}

function lockOrientation() {
  if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock('portrait').catch(function (error) {
      console.log(error)
    })
  }
}

const app = createApp(App)
app.use(router)
app.mount('#app')

// Call these functions when the app is mounted
app.config.globalProperties.$nextTick(() => {
  openFullscreen()
  lockOrientation()
})