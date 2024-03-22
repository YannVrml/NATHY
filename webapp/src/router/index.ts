import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ChooseMetroView from '@/views/Metro/ChooseMetroView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/metro/choose-metro',
      name: 'choose-metro',
      component: ChooseMetroView
    },
  ]
})

export default router
