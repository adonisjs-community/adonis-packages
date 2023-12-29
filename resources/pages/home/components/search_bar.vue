<script setup lang="ts">
import { ref, watch } from 'vue'
import { refDebounced } from '@vueuse/core'

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits(['update:modelValue'])
const input = ref(props.modelValue)
const debounced = refDebounced(input, 400)
watch(debounced, (value) => emit('update:modelValue', value))
</script>

<template>
  <div class="relative shadow-sm">
    <i
      class="i-fluent-emoji-magnifying-glass-tilted-right absolute left-[18px] top-[14px] inline-block"
    />
    <input
      v-model="input"
      type="text"
      placeholder="Search for a package"
      class="w-full border-0 rounded-xl bg-base2 px-6 py-3 pl-12 focus:(outline-0 ring-0)"
    />
  </div>
</template>
