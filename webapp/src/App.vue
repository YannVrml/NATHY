<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import Logo from './components/Logo.vue'
import LocalisationDialog from './components/dialogs/LocalisationDialog.vue';

const drawer = ref(false);
</script>

<template>
  <VApp>    
    <VAppBar>
      <Logo class="pointer" @click="$router.push({name: 'home'})" />
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
  </VApp>
</template>
