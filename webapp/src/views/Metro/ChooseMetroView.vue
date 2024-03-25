<template>
  <FullScreenChoice :choices="choices" @choosed="choosed" />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import FullScreenChoice from '@/components/FullScreenChoice.vue'
import type { Choice } from '@/types/Choice'
import { useIleviaMetroStore } from '@/stores/ileviaMetro.store'
import { computed } from 'vue'

const router = useRouter()

const ileviaStore = useIleviaMetroStore()

const choices = computed(() => {
  return (
    ileviaStore.metroLines.map<Choice>((line) => {
      return {
        id: line.id,
        title: line.code,
        description: line.name,
        icon: 'mdi-subway-variant',
        color: line.color,
        textColor: line.text_color
      }
    }) ?? []
  )
})

const choosed = (choice: Choice) => {
  router.push({ name: 'Line', params: { id: choice.id } })
}
</script>

<style lang="scss" scoped></style>
