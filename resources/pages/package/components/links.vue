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
        class="flex transition duration-300 items-center hover:text-base12 gap-2 text-sm text-base10 py-1"
        :href="package.github"
      >
        <i class="inline-block i-jam-github" />
        <span> Check repository </span>
      </a>
      <a
        v-if="package.npm"
        class="flex transition duration-300 items-center hover:text-base12 gap-2 text-sm text-base10 py-1"
        :href="`https://www.npmjs.com/package/${package.npm}`"
      >
        <i class="inline-block i-mdi-npm-variant-outline" />
        <span> NPM package </span>
      </a>
      <a
        v-if="package.website"
        class="flex transition duration-300 items-center hover:text-base12 gap-2 text-sm text-base10 py-1"
        :href="package.website"
      >
        <i class="inline-block i-jam-arrow-square-up-right" />
        <span> See webite </span>
      </a>
    </div>
  </div>
</template>

<style scoped></style>
