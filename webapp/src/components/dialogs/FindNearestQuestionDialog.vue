<template>
  <VDialog v-model="dialog" width="600" height="fit-content" v-if="stopPoint">
    <VCard class="overflow-hidden">
      <VRow>
        <VCol
          class="pointer no-user-select py-15 px-5 d-flex flex-column ga-5 align-center justify-center"
          cols="12"
          md="6"
          v-ripple
          @click="
            emit('yes');
            dialog = false
          "
        >
          <VIcon>mdi-map-marker</VIcon>
          <span class="text-center">
            <h4>Go to nearest station :</h4>
            <h4>{{ stopPoint.name }}</h4>
          </span>
        </VCol>
        <VCol
          class="pointer no-user-select py-15 px-5 d-flex flex-column ga-5 align-center justify-center"
          cols="12"
          md="6"
          v-ripple
          @click="
            emit('no');
            dialog = false
          "
        >
          <VIcon>mdi-directions</VIcon>
          <h4>Choose another station</h4>
        </VCol>
      </VRow>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import type { StopPoint } from '@/types/MetroLine'
import { type PropType } from 'vue'

const dialog = defineModel<boolean>()

defineProps({
  stopPoint: {
    type: Object as PropType<StopPoint>
  }
})

const emit = defineEmits(['yes', 'no'])
</script>
