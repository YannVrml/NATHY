<template>
  <VDialog v-model="opened">
    <VCard
        prepend-icon="mdi-map-marker"
        text="Let Nathy determine your location to find the nearest metro station. This means sending anonymous location data to Nathy."
        title="Use Nathy's location service?"
      >
        <template v-slot:actions>
          <VSpacer></VSpacer>

          <v-btn @click="opened = false; emit('disagree')">
            Disagree
          </v-btn>

          <v-btn @click="opened = false; emit('agree')">
            Agree
          </v-btn>
        </template>
      </VCard>
  </VDialog>
</template>

<script setup lang="ts">

const opened = defineModel<boolean>();

const emit = defineEmits(["agree", "disagree"]);

</script>

<style lang="scss" scoped>

</style>