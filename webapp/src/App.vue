<script setup lang="ts">
import { computed } from 'vue';
import { RouterView } from 'vue-router'

const environment = computed<string>(() => import.meta.env.VITE_ENVIRONMENT);
</script>

<template>
  <header>
    <h1>Nathy {{ environment }}</h1>
  </header>

  <RouterView />
</template>