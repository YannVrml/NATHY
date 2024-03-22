<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'

const drawer = ref(false)
</script>

<template>
  <VApp>
    <VAppBar>
      <VAppBarNavIcon @click="drawer = !drawer" />
      <VAppBarTitle>Nathy</VAppBarTitle>
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
  </VApp>
</template>
