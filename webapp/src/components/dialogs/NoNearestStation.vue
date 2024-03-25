<template>
  <VDialog v-model="dialog" width="fit-content">
    <VCard>
      <VCardTitle class="headline">No nearest station</VCardTitle>
      <VCardText>
        <p>Sorry, we couldn't find any station near you. Would you like to choose a metro line?</p>
      </VCardText>
      <VCardActions>
        <VBtn color="primary" variant="text" @click="dialog = false">Choose metro line</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
const dialog = defineModel<boolean>()
</script>
