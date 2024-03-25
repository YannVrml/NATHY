<template>
  <VDialog v-model="geolocStore.dialogModel" width="fit-content">
    <VCard
      prepend-icon="mdi-map-marker"
      text="Let Nathy determine your location to find the nearest metro station. This means sending anonymous location data to Nathy."
      title="Use Nathy's location service?"
    >
      <template v-slot:actions>
        <VSpacer></VSpacer>

        <v-btn @click="disagree"> Disagree </v-btn>

        <v-btn @click="agree"> Agree </v-btn>
      </template>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import { useGeolocStore } from '@/stores/geoloc.store'
import { onMounted } from 'vue'

const geolocStore = useGeolocStore()

const emit = defineEmits(['agree', 'disagree'])

const agree = async () => {
  geolocStore.dialogModel = false
  geolocStore.getPosition()
  emit('agree')
}

const disagree = () => {
  geolocStore.dialogModel = false
  emit('disagree')
}

onMounted(() => {
  geolocStore.requestNavGeoloc()
})
</script>
