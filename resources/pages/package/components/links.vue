<script setup lang="ts">
import type { PackageInfo } from '@/types'

defineProps<{
  package: PackageInfo
}>()
</script>

<template>
  <div>
    <p class="mb-2 text-lg font-bold">Links</p>

    <div class="flex flex-col">
      <a
        class="flex items-center gap-2 py-1 text-sm text-base10 transition duration-300 hover:text-base12"
        :href="package.github"
      >
        <i class="i-jam-github inline-block" />
        <span>Check repository</span>
      </a>
      <a
        v-if="package.npm"
        class="flex items-center gap-2 py-1 text-sm text-base10 transition duration-300 hover:text-base12"
        :href="`https://www.npmjs.com/package/${package.npm}`"
      >
        <i class="i-mdi-npm-variant-outline inline-block" />
        <span>npm package</span>
      </a>
      <a
        v-if="package.website"
        class="flex items-center gap-2 py-1 text-sm text-base10 transition duration-300 hover:text-base12"
        :href="package.website"
      >
        <i class="i-jam-arrow-square-up-right inline-block" />
        <span>See webite</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
</style>
