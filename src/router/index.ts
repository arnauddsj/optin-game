import { createRouter, createWebHistory } from 'vue-router'
import SplashScreen from '@/views/SplashScreen.vue'
import Game1 from '@/views/Game1.vue'
import OptInForm from '@/views/OptInForm.vue'
import AdminScreen from '@/views/AdminScreen.vue'
import OptInForm2 from '@/views/OptInForm2.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: SplashScreen },
    { path: '/game1', component: Game1 },
    { path: '/optin', component: OptInForm },
    { path: '/optin2', component: OptInForm2 },
    { path: '/admin', component: AdminScreen },
  ]
})

export default router