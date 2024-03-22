<script setup lang="ts">
import { ref } from 'vue';


const username = ref('coucou');

function getUsername() {
  username.value = "nicolas";
}
</script>

<template>
  <main>
    <h1>Home</h1>
    <p>user: {{ username }}</p>
    <VBtn @click="getUsername">Récuperer le username</VBtn>
  </main>
</template>

<style lang="scss" scoped>
</style>