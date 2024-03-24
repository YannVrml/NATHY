<template>
  <FullScreenChoice :choices="choices" @choosed="choosed" />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import FullScreenChoice from '@/components/FullScreenChoice.vue';
import { useGeolocStore } from '@/stores/geoloc.store';
import type { Choice } from '@/types/Choice';
import { ref } from 'vue';
import { onMounted } from 'vue';
import type { MetroLine } from '@/types/MetroLine'
import { useIleviaMetroStore } from '@/stores/ileviaMetro.store';
import { computed } from 'vue';
import { watch } from 'vue';

const router = useRouter();

const geolocStore = useGeolocStore();
const ileviaStore = useIleviaMetroStore();

const choices = computed(() => {
  return ileviaStore.metroLines.map<Choice>((line) => {
    return {
      id: line.id,
      title: line.code,
      description: line.name,
      icon: 'mdi-subway-variant',
      color: line.color,
      textColor: line.text_color,
    };
  }) ?? [];
});

watch(() => geolocStore.hasGeoloc, (hasGeoloc) => {
  if (hasGeoloc) {
    const nearestStopAreas = ileviaStore.nearStopAreas(geolocStore.latitude, geolocStore.longitude);
  }
});

const localisationModal = ref<boolean>(true);

const choosed = (choice: Choice) => {
  router.push({ name: 'Line', params: { id: choice.id } });
}


const getGeoloc = async () => {
  await geolocStore.requestNavGeoloc();
  console.log(geolocStore.longitude, geolocStore.latitude);

}
</script>

<style lang="scss" scoped>

</style>
