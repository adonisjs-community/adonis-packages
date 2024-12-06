<script setup lang="ts">
import { categories } from '~/content/categories'

import type { PackageInfo } from '@/app/types'

defineProps<{
  package: PackageInfo
  size?: '12' | '16'
}>()

function iconPlaceholder({ category }: PackageInfo) {
  return categories.find((c) => c.label === category)?.icon || 'i-carbon-ibm-data-product-exchange'
}
</script>

<template>
  <div
    class="items-center justify-center"
    :class="{
      'h-12 w-12': size === '12',
      'h-16 w-16': size === '16',
    }"
  >
    <img
      v-if="package.icon"
      :alt="`Logo for ${package.name}`"
      class="h-full object-contain"
      :src="`/icons/${package.icon}`"
      loading="lazy"
      height="48"
      width="48"
    />
    <div v-else class="h-full flex items-center justify-center overflow-hidden rounded-xl bg-base3">
      <i class="bg-grey inline-block text-lg" :class="iconPlaceholder(package)" />
    </div>
  </div>
</template>

<style scoped></style>
