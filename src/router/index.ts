import { createRouter, createWebHistory, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { useGameStore } from '@/stores/gameStore'
import home from '@/views/home.vue'
import Game1 from '@/views/game/game-1.vue'
import Game2 from '@/views/game/game-2.vue'
import Game3 from '@/views/game/game-3.vue'
import IntroGame1 from '@/views/intro/intro-game-1.vue'
import IntroGame2 from '@/views/intro/intro-game-2.vue'
import IntroGame3 from '@/views/intro/intro-game-3.vue'
import SuccessGame1 from '@/views/success/success-game-1.vue'
import SuccessGame2 from '@/views/success/success-game-2.vue'
import SuccessGame3 from '@/views/success/success-game-3.vue'
import OptInForm from '@/views/optin.vue'
import AdminScreen from '@/views/admin.vue'
import IntroGame from '@/views/intro/intro-game.vue'

const routes = [
  { path: '/', component: home },
  { path: '/intro-game', component: IntroGame },
  { path: '/game1', component: Game1 },
  { path: '/game2', component: Game2 },
  { path: '/game3', component: Game3 },
  { path: '/intro-game1', component: IntroGame1 },
  { path: '/intro-game2', component: IntroGame2 },
  { path: '/intro-game3', component: IntroGame3 },
  { path: '/success-game1', component: SuccessGame1 },
  { path: '/success-game2', component: SuccessGame2 },
  { path: '/success-game3', component: SuccessGame3 },
  { path: '/optin', component: OptInForm },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminScreen,
    beforeEnter: (_to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
      const password = prompt('Enter admin password:')
      if (password === 'admin') {
        next()
      } else {
        alert('Incorrect password')
        next(false)
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const gameStore = useGameStore()

  // Reset the store when navigating to these routes
  if (to.path === '/' || to.path === '/intro-game') {
    gameStore.resetWins()
  }

  next()
})

export default router