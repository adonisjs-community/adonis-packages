<script lang="ts" setup>
import { provide } from 'vue'

provide('group', true)
</script>

<template>
  <div class="flex flex-row rounded border border-base5 bg-base3 divide-x divide-base5">
    <slot />
  </div>
</template>
