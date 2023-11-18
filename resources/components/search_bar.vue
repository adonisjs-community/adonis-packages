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
  <div class="relative">
    <i
      class="absolute top-[14px] left-[12px] inline-block i-fluent-emoji-magnifying-glass-tilted-right"
    />
    <input
      v-model="input"
      type="text"
      placeholder="Search for a package"
      class="search-bar-input w-full border-0 bg-transparent py-3 px-4 pl-10 rounded-xl focus:(ring-0 outline-0)"
    />
  </div>
</template>

<style scoped>
.search-bar-input {
  background: rgba(20, 20, 20, 0.57);
}
</style>
