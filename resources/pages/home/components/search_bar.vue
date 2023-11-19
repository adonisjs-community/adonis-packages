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
      class="absolute top-[14px] left-[18px] inline-block i-fluent-emoji-magnifying-glass-tilted-right"
    />
    <input
      v-model="input"
      type="text"
      placeholder="Search for a package"
      class="bg-base2 w-full border-0 py-3 px-6 pl-12 rounded-xl focus:(ring-0 outline-0)"
    />
  </div>
</template>
