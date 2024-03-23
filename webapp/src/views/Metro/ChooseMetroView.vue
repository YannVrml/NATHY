<template>
  <LocalisationDialog v-model="localisationModal" @agree="localisationModal = false; getGeoloc()" @disagree="localisationModal = false" />
  <FullScreenChoice :choices="choices" @choosed="choosed" />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import LocalisationDialog from '@/components/dialogs/LocalisationDialog.vue';
import FullScreenChoice from '@/components/FullScreenChoice.vue';
import { useGeolocStore } from '@/stores/geoloc.store';
import type { Choice } from '@/types/Choice';
import { ref } from 'vue';

const router = useRouter();

const choices = ref<Choice[]>([
  {
    id: 1,
    title: 'M1',
    color: 'rgb(253, 196, 31)',
    textColor: 'black',
    path: '/line/1'
  },
  {
    id: 2,
    title: 'M2',
    color: 'rgb(227, 6, 19)',
    textColor: 'white',
    path: '/line/2'
  }
]);

const localisationModal = ref<boolean>(true);

const choosed = (choice: Choice) => {
  console.log(choice);
  router.push(choice.path);
}

const geolocStore = useGeolocStore();

const getGeoloc = async () => {
  await geolocStore.requestNavGeoloc();
  console.log(geolocStore.longitude, geolocStore.latitude);

}
</script>

<style lang="scss" scoped>

</style>
