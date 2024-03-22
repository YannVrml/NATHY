<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router'

const drawer = ref(false);
</script>

<template>
  <VApp>
    <VAppBar>
      <VAppBarNavIcon @click="drawer = !drawer" />
      <VAppBarTitle>Nathy</VAppBarTitle>
    </VAppBar>

    <VNavigationDrawer v-model="drawer" temporary>
      <VList>
        <VListItem :to="{name: 'home'}">Home</VListItem>
        <VListItem :to="{name: 'about'}">About</VListItem>
      </VList>
    </VNavigationDrawer>

    <VMain>
      <RouterView />
    </VMain>
  </VApp>

</template>