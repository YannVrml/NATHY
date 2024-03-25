<template>
  <div class="d-flex flex-column w-100 h-100">
    <div
      v-for="(choice, index) in choices"
      :key="choice.id"
      v-ripple
      @click="emit('choosed', choice)"
      class="choice d-flex flex-column justify-center text-center h-100 choice"
      :style="getColor(choice, index)"
    >
      <h1 class="no-user-select">{{ choice.title }}</h1>
      <div class="no-user-select" v-if="choice.description">{{ choice.description }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Choice } from '@/types/Choice'

const props = defineProps({
  choices: Array as PropType<Choice[]>,
  color1: {
    type: String,
    default: 'black'
  },
  color2: {
    type: String,
    default: 'white'
  }
})

const emit = defineEmits(['choosed'])

const getColor = (choice: Choice, index: number) => {
  return {
    backgroundColor: choice.color || (index % 2 === 0 ? props.color1 : props.color2),
    color: choice.textColor || (index % 2 === 0 ? props.color2 : props.color1)
  }
}
</script>

<style lang="scss" scoped>
.choice {
  cursor: pointer;
}
</style>
