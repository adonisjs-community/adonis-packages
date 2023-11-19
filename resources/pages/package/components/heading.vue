<script setup lang="ts">
import type { PackageInfo } from '@/types'
import PackageLogo from '@/components/package_logo.vue'

defineProps<{
  package: PackageInfo
}>()
</script>

<template>
  <div class="text-left flex flex-col">
    <div class="flex items-center gap-6">
      <PackageLogo class="flex-shrink-0" size="16" :package="package" />
      <div class="flex flex-col gap-2">
        <h1 class="text-5xl font-bold relative top-2">{{ package.name }}</h1>
        <span class="text-base mt-2 font-content text-white-400">
          {{ package.description }}
        </span>
      </div>
    </div>
    <hr class="my-7 border-b-1 border-t-0 border-white/6" />
  </div>
</template>

<style scoped></style>
