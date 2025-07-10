<script setup lang="ts">
defineProps<{
  variant: 'green' | 'blue' | 'default' | 'accent'
}>()
</script>

<template>
  <span
    class="px-3 py-1 text-xs rounded-full border"
    :class="{
      'bg-green-500/20 text-green-400 border-green-600/40': variant === 'green',
      'bg-blue-500/20 text-blue-400 border-blue-600/40': variant === 'blue',
      'bg-base3 text-base11 border-base5': variant === 'default',
      'bg-base4 text-base11 border-base6': variant === 'accent',
    }"
  >
    <slot />
  </span>
</template>
