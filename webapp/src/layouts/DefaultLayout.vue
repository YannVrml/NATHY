<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import AppLogo from '@/components/AppLogo.vue'
import LocalisationDialog from '@/components/dialogs/LocalisationDialog.vue'
import { useGeolocStore } from '@/stores/geoloc.store'
import { useIleviaMetroStore } from '@/stores/ileviaMetro.store'
import NoNearestStation from '@/components/dialogs/NoNearestStation.vue'
import FindNearestQuestionDialog from '@/components/dialogs/FindNearestQuestionDialog.vue'
import type { StopPoint } from '@/types/MetroLine'

const geolocStore = useGeolocStore()
const ileviaStore = useIleviaMetroStore()
const router = useRouter()
const route = useRoute()

const noNearestStation = ref<boolean>(false)
const goToNearestStationQuestion = ref<boolean>(false)
const nearestStation = ref<StopPoint | undefined>()

const goToNearestStation = async (triggerDialog: boolean = false) => {
  if (nearestStation.value)
    return router.push({
      name: 'Line',
      params: { id: nearestStation.value.line.id },
      query: { stopPointId: nearestStation.value.id }
    })
  if (triggerDialog) noNearestStation.value = true
}

watch(
  () => geolocStore.hasGeoloc,
  async (hasGeoloc) => {
    if (hasGeoloc && route.name === 'home') {
      await ileviaStore.pendMetroLineFetch()
      const nearestStopAreas = ileviaStore.nearStopAreas()
      if (nearestStopAreas.length > 0) {
        nearestStation.value = nearestStopAreas[0]
        goToNearestStationQuestion.value = true
      }
    }
  },
  { immediate: true }
)
</script>

<template>
  <VAppBar>
    <VBtn icon @click="$router.push({ name: 'home' })">
      <VIcon>mdi-home</VIcon>
    </VBtn>
    <VSpacer />
    <AppLogo class="pointer" @click="$router.push({ name: 'home' })" />
    <VSpacer />
    <VBtn icon :disabled="!geolocStore.hasGeoloc" @click="goToNearestStation(true)">
      <VIcon>mdi-map-marker-radius</VIcon>
    </VBtn>
  </VAppBar>

  <VMain>
    <div class="d-flex h-100 align-center justify-center">
      <RouterView />
    </div>
  </VMain>

  <LocalisationDialog />
  <NoNearestStation v-model="noNearestStation" />
  <FindNearestQuestionDialog
    v-model="goToNearestStationQuestion"
    :stop-point="nearestStation"
    @yes="goToNearestStation"
  />
</template>
