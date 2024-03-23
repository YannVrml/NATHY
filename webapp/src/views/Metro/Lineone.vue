<script setup lang="ts">
import LocalisationDialog from '@/components/dialogs/LocalisationDialog.vue';
import FullScreenChoice from '@/components/FullScreenChoice.vue';
import { ref } from 'vue';

const ArretDeMetro = ref([
  { nom: 'Nom1', time: 4 },
  { nom: 'Nom2dazddazdadzadazdzadaz', time: 3 },
  { nom: 'Nom3', time: 2 },
  { nom: 'Nom4', time: 1 },
  { nom: 'Nom5', time: 0 },
  { nom: 'Nom6', time: 1 },
  { nom: 'Nom7', time: 2 },
  { nom: 'Nom8', time: 4 },
  { nom: 'Nom9', time: 5 },
  { nom: 'Nom10', time: 7 },
  { nom: 'Nom11', time: 11 },
  { nom: 'Nom12', time: 12 },
  { nom: 'Nom13', time: 13 },
  { nom: 'Nom14', time: 14 }
]);

import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToOtherPage = (arretName: string) => {
  console.log(arretName);
  router.push({ name: 'Station', params: { arretName } });
};

</script>

<template>
  <main>
    <div v-for="(arret, index) in ArretDeMetro" :key="index" class="arret-container" @click="navigateToOtherPage(arret.nom)">
      <div class="arret-nom">{{ arret.nom }}</div>
      <div class="arret-time">
        <template v-if="arret.time === 0">Arrivé</template>
        <template v-else>{{ arret.time + ' minutes' }}</template>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>

main {
  display: grid;
  place-items: center; /* Centre le contenu horizontalement et verticalement */
}

.arret-container {
  background-color: #d99b2b;
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
  color: white;
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
  content: "";
  position: absolute;
  left: 0;
  bottom: -12px;
  width: 100%;
  height: 2px;
  background-color: red;
}
</style>
