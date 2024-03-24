<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const route = useRoute()
const userData = ref()

// fetch the user information when params change
watch(
    () => route.params.arretName,
    async newId => {
      userData.value = newId
    }
)
</script>

<template>
  <main>
    <h1>{{ $route.params.arretName }}</h1>
  </main>
</template>

<style scoped lang="scss">

</style>