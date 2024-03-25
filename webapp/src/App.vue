<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import AppLogo from './components/AppLogo.vue'
import LocalisationDialog from './components/dialogs/LocalisationDialog.vue'
import { useGeolocStore } from './stores/geoloc.store'
import { useIleviaMetroStore } from './stores/ileviaMetro.store'
import NoNearestStation from './components/dialogs/NoNearestStation.vue'

const geolocStore = useGeolocStore()
const ileviaStore = useIleviaMetroStore()
const router = useRouter()

const noNearestStation = ref<boolean>(false)

const goToNearestStation = async (triggerDialog: boolean = false) => {
  await ileviaStore.pendMetroLineFetch()
  const nearestStopAreas = ileviaStore.nearStopAreas()
  if (nearestStopAreas.length > 0)
    return router.push({
      name: 'Line',
      params: { id: nearestStopAreas[0].line.id },
      query: { stopPointId: nearestStopAreas[0].id }
    })
  if (triggerDialog) noNearestStation.value = true
}

watch(
  () => geolocStore.hasGeoloc,
  (hasGeoloc) => {
    if (hasGeoloc) goToNearestStation()
  },
  { immediate: true }
)

const drawer = ref(false)
</script>

<template>
  <VApp>
    <VAppBar>
      <VBtn icon @click="$router.push({ name: 'home' })">
        <VIcon>mdi-home</VIcon>
      </VBtn>
      <AppLogo class="pointer" @click="$router.push({ name: 'home' })" />
      <VBtn icon :disabled="!geolocStore.hasGeoloc" @click="goToNearestStation(true)">
        <VIcon>mdi-map-marker-radius</VIcon>
      </VBtn>
    </VAppBar>

    <VNavigationDrawer v-model="drawer" temporary>
      <VList>
        <VListItem :to="{ name: 'home' }">Home</VListItem>
      </VList>
    </VNavigationDrawer>

    <VMain>
      <div class="d-flex h-100 align-center justify-center">
        <RouterView />
      </div>
    </VMain>

    <LocalisationDialog />
    <NoNearestStation v-model="noNearestStation" />
  </VApp>
</template>
