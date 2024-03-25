import { createRouter, createWebHistory } from 'vue-router'
import ChooseMetroView from '@/views/Metro/ChooseMetroView.vue'
import MetroLineView from '@/views/Metro/MetroLine.vue'
import { useIleviaMetroStore } from '@/stores/ileviaMetro.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ChooseMetroView
    },
    {
      path: '/line/:id',
      name: 'Line',
      component: MetroLineView
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const ileviaStore = useIleviaMetroStore()

  if (ileviaStore.metroLines.length === 0) {
    await ileviaStore.getMetroLines()
  }

  next()
})

export default router
