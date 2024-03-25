<template>
  <VBtn>Metro {{ id_metro }}</VBtn>
</template>

<script setup lang="ts">
defineProps({
  id_metro: {
    type: String
  }
})
</script>
