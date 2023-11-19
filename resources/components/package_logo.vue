<script setup lang="ts">
import type { PackageInfo } from '@/types'
import { categories } from '~/content/categories'

defineProps<{
  package: PackageInfo
  size?: '12' | '16'
}>()

function iconPlaceholder({ category }: PackageInfo) {
  return categories.find((c) => c.label === category)?.icon || 'i-fluent-emoji-package-24-regular'
}
</script>

<template>
  <div
    class="mt-4 items-center justify-center"
    :class="{
      'h-12 w-12': size === '12',
      'h-16 w-16': size === '16',
    }"
  >
    <img v-if="package.icon" class="h-full object-contain" :src="`/icons/${package.icon}`" />
    <div v-else class="bg-base3 h-full flex items-center justify-center rounded-xl overflow-hidden">
      <i class="inline-block bg-grey text-lg" :class="iconPlaceholder(package)" />
    </div>
  </div>
</template>

<style scoped></style>
