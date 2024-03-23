<template>
  <LocalisationDialog v-model="localisationModal" @agree="localisationModal = false; getGeoloc()" @disagree="localisationModal = false" />
  <FullScreenChoice :choices="choices" @choosed="choosed" />
</template>

<script setup lang="ts">
import LocalisationDialog from '@/components/dialogs/LocalisationDialog.vue';
import FullScreenChoice from '@/components/FullScreenChoice.vue';
import { useGeolocStore } from '@/stores/geoloc.store';
import type { Choice } from '@/types/Choice';
import { ref } from 'vue';

const choices = ref<Choice[]>([
  {
    id: 1,
    title: 'M1',
    color: 'rgb(253, 196, 31)',
    textColor: 'black'
  },
  {
    id: 2,
    title: 'M2',
    color: 'rgb(227, 6, 19)',
    textColor: 'white'
  }
]);

const localisationModal = ref<boolean>(true);

const choosed = (choice: Choice) => {
  console.log(choice);
}

const geolocStore = useGeolocStore();

const getGeoloc = async () => {
  await geolocStore.requestNavGeoloc();
  console.log(geolocStore.longitude, geolocStore.latitude);

}
</script>

<style lang="scss" scoped>

</style>
