<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useIleviaMetroStore } from '@/stores/ileviaMetro.store'
import { onBeforeUnmount } from 'vue'
import { useTimeHelpers } from '@/composables/timeHelpers';

let nextDeparturesInterval: number | null = null

const router = useRouter()
const route = useRoute()
const ileviaStore = useIleviaMetroStore()
const timeHelpers = useTimeHelpers();

const line = computed(() => ileviaStore.metroLines.find((line) => line.id === route.params.id))
const stopPoints = computed(() => line.value?.stop_areas ?? [])

onMounted(() => {
  if (!line.value) router.push({ name: 'home' })
  if (nextDeparturesInterval !== null) clearInterval(nextDeparturesInterval)
  fetchNextDepartures()
  nextDeparturesInterval = setInterval(fetchNextDepartures, 50000)
})

onBeforeUnmount(() => {
  if (nextDeparturesInterval !== null) clearInterval(nextDeparturesInterval)
})

const fetchNextDepartures = async () => {
  await Promise.all(
    stopPoints.value.map(async (point) => {
      await ileviaStore.populateNextDepartures(point)
    })
  )
}

const navigateToOtherPage = (arretName: string) => {
  console.log(arretName)
  router.push({ name: 'Station', params: { arretName } })
}
</script>

<template>
  <VExpansionPanels mandatory class="pa-5">
    <VExpansionPanel v-for="point in stopPoints" :key="point.id">
      <VExpansionPanelTitle>{{ point.label }}</VExpansionPanelTitle>
      <VExpansionPanelText>
        <VRow v-if="point.nextDepartures">
          <VCol cols="auto" v-if="point.nextDepartures.forward?.route">
            <h5>
              <VIcon>mdi-map-marker-right-outline</VIcon>
              {{ point.nextDepartures.forward.route.direction.name }}
            </h5>
            <VList>
              <VListItem
                v-for="(departure, index) in point.nextDepartures.forward.times"
                :key="index"
              >
                <VListItemTitle><VIcon>mdi-clock-outline</VIcon> {{ timeHelpers.timeTo(departure) }} - {{ timeHelpers.timeFromDate(departure) }}</VListItemTitle>
              </VListItem>
            </VList>
          </VCol>
          <VCol cols="auto" v-if="point.nextDepartures.backward?.route">
            <h5>
              <VIcon>mdi-map-marker-left-outline</VIcon>
              {{ point.nextDepartures.backward.route.direction.name }}
            </h5>
            <VList>
              <VListItem
                v-for="(departure, index) in point.nextDepartures.backward.times"
                :key="index"
              >
                <VListItemTitle><VIcon>mdi-clock-outline</VIcon> {{ timeHelpers.timeTo(departure) }} - {{ timeHelpers.timeFromDate(departure) }}</VListItemTitle>
              </VListItem>
            </VList>
          </VCol>
        </VRow>
        <VProgressLinear v-else indeterminate />
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>

<style lang="scss" scoped>
main {
  display: grid;
  place-items: center; /* Centre le contenu horizontalement et verticalement */
}

.arret-container {
  background-color: v-bind('line?.color');
  border: 2px solid black;
  border-radius: 15px; /* Ajoute des bordures arrondies */
  padding: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
  text-align: center; /* Centre le texte */
  position: relative; /* Nécessaire pour positionner la barre rouge */
  width: 200px;
}

.arret-nom {
  font-size: 20px;
  font-weight: bold;
  color: v-bind('line?.text_color');
  text-align: center; /* Centre le texte */
  overflow: hidden; /* Cache le texte qui dépasse */
  text-overflow: ellipsis; /* Indique que le texte est tronqué */
  white-space: nowrap; /* Empêche le texte de passer à la ligne */
}

.arret-time {
  background-color: grey;
  color: white;
  padding: 5px;
  font-size: 14px;
  width: fit-content;
  border: 1px solid black;
  border-radius: 10px; /* Ajoute des bordures arrondies */
  margin: 0 auto;
}

.arret-container::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -12px;
  width: 100%;
  height: 2px;
  background-color: red;
}
</style>
@/composables/timeHelpers