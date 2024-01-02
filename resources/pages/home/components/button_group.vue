<script lang="ts" setup>
import { provide } from 'vue'

provide('group', true)
</script>

<template>
  <div class="flex flex-row rounded-xl bg-base2 divide-x divide-zinc-700">
    <slot />
  </div>
</template>
