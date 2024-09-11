import { createRouter, createWebHistory } from 'vue-router'
import SplashScreen from '../views/SplashScreen.vue'
import GameScreen from '../views/GameScreen.vue'
import OptInForm from '../views/OptInForm.vue'
import AdminScreen from '../views/AdminScreen.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: SplashScreen },
    { path: '/game', component: GameScreen },
    { path: '/optin', component: OptInForm },
    { path: '/admin', component: AdminScreen },
  ]
})

export default router