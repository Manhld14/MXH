import LoginVue from '@/Views/LoginVue.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginVue
    },
    {
      path: '/Register',
      name : 'register',
      component: () => import('@/Views/RegisterVue.vue')
    },
    {
      path: '/Home',
      name : 'home',
      component: () => import('@/Views/HomeVue.vue')
    },
    {
      path: '/Profile',
      name : 'profile',
      component: () => import('@/Views/ProfileVue.vue')
    }
    
  ],
})

export default router
