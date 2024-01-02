<script lang="ts" setup>
import { inject, ref } from 'vue'

const props = defineProps<{
  modelValue: -1 | 1
}>()

const emits = defineEmits<{
  'update:modelValue': [-1 | 1]
}>()

const order = ref<-1 | 1>(props.modelValue)

const toggleOrder = () => {
  order.value = order.value === 1 ? -1 : 1

  emits('update:modelValue', order.value)
}

const group = inject<boolean>('group', false)
</script>

<template>
  <button
    class="flex items-center px-3 py-2 text-base12 shadow-sm focus:(outline-0 ring-0)"
    :class="{ 'bg-base2 rounded-xl': !group }"
    :aria-label="order === 1 ? 'Sort by descending order' : 'Sort by ascending order'"
    @click="toggleOrder"
  >
    <i :class="order === 1 ? 'i-carbon-arrow-up' : 'i-carbon-arrow-down'" class="inline-block" />
  </button>
</template>
