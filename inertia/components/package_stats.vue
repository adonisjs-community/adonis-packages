<script setup lang="ts">
import { millify } from 'millify'

import type { PackageInfo } from '@/app/types'

defineProps<{
  package: PackageInfo
}>()

function numberFormatter(num: number) {
  return millify(num || 0, { precision: 1 })
}
</script>

<template>
  <div class="text-sm flex gap-6 text-base10">
    <a
      v-tooltip="{ content: 'Stars on GitHub', distance: 10, delay: 500 }"
      class="flex items-center gap-1.3 transition-colors duration-600 hover:text-base12"
      :href="package.github"
      target="_blank"
    >
      <i class="i-tabler-star text-yellow-500 inline-block" />
      <span data-testid="package-stars" class="relative">{{ package.stars }} stars</span>
    </a>

    <a
      v-tooltip="{ content: 'Monthly downloads from npm', distance: 10, delay: 500 }"
      class="flex items-center gap-1.3 transition-colors duration-600 hover:text-base12"
      :href="`https://www.npmjs.com/package/${package.npm}`"
      target="_blank"
    >
      <i class="i-tabler-trending-up text-green-500 inline-block" />
      <span class="relative">{{ numberFormatter(package.downloads) }} installs</span>
    </a>
  </div>
</template>

<style scoped></style>
