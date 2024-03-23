import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ChooseMetroView from '@/views/Metro/ChooseMetroView.vue'
import LineOneView from '@/views/Metro/Lineone.vue'
import LineTwoView from '@/views/Metro/Linetwo.vue'
import Station from '@/views/Stations.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ChooseMetroView
    },
    {
      path: '/line/1',
      name: 'Line-one',
      component: LineOneView
    },
    {
      path: '/line/2',
      name: 'Line-two',
      component: LineTwoView
    },
    {
      path: '/Stations/:arretName',
      name: 'Station',
      component: Station
    }
  ]
})

export default router
