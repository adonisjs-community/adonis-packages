<script lang="ts" setup>
import { inject } from 'vue'

const order = defineModel<1 | -1>()
const group = inject<boolean>('group', false)
</script>

<template>
  <button
    class="flex items-center px-3 py-2 text-base12 shadow-sm focus:(outline-0 ring-0)"
    :class="{ 'bg-base2 rounded-xl': !group }"
    :aria-label="order === 1 ? 'Sort by descending order' : 'Sort by ascending order'"
    @click="order = order === 1 ? -1 : 1"
  >
    <i :class="order === 1 ? 'i-carbon-arrow-up' : 'i-carbon-arrow-down'" class="inline-block" />
  </button>
</template>
