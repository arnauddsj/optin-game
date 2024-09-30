import { createRouter, createWebHistory } from 'vue-router'
import home from '@/views/home.vue'
import Game1 from '@/views/game/game-1.vue'
import Game2 from '@/views/game/game-2.vue'
import Game3 from '@/views/game/game-3.vue'
import Game4 from '@/views/game/game-4.vue'
import IntroGame1 from '@/views/intro/intro-game-1.vue'
import IntroGame2 from '@/views/intro/intro-game-2.vue'
import IntroGame3 from '@/views/intro/intro-game-3.vue'
import IntroGame4 from '@/views/intro/intro-game-4.vue'
import SuccessGame1 from '@/views/success/success-game-1.vue'
import SuccessGame2 from '@/views/success/success-game-2.vue'
import SuccessGame3 from '@/views/success/success-game-3.vue'
import SuccessGame4 from '@/views/success/success-game-4.vue'
import OptInForm from '@/views/optin.vue'
import OptInSuccess from '@/views/optin-success.vue'
import AdminScreen from '@/views/admin.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: home },
    { path: '/game1', component: Game1 },
    { path: '/game2', component: Game2 },
    { path: '/game3', component: Game3 },
    { path: '/game4', component: Game4 },
    { path: '/intro-game1', component: IntroGame1 },
    { path: '/intro-game2', component: IntroGame2 },
    { path: '/intro-game3', component: IntroGame3 },
    { path: '/intro-game4', component: IntroGame4 },
    { path: '/success-game1', component: SuccessGame1 },
    { path: '/success-game2', component: SuccessGame2 },
    { path: '/success-game3', component: SuccessGame3 },
    { path: '/success-game4', component: SuccessGame4 },
    { path: '/optin', component: OptInForm },
    { path: '/optin-success', component: OptInSuccess },
    { path: '/admin', component: AdminScreen },
  ]
})

export default router