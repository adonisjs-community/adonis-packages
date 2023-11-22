<script setup lang="ts">
import type { PackageInfo } from '@/types'
import PackageLogo from '@/components/package_logo.vue'
import PackageStats from '@/components/package_stats.vue'

defineProps<{
  package: PackageInfo
}>()
</script>

<template>
  <div class="flex flex-col text-left">
    <div class="flex flex-col gap-3">
      <div class="flex items-start gap-5">
        <PackageLogo class="flex-shrink-0" size="16" :package="package" />
        <div class="flex flex-col">
          <h1 class="relative top-2 mt-1 text-5xl font-bold">{{ package.name }}</h1>
          <span class="mt-5 text-base font-content text-base11">
            {{ package.description }}
          </span>

          <PackageStats class="mt-3" :package="package" />
        </div>
      </div>
    </div>
    <hr class="my-7 border-b-1 border-t-0 border-white/6" />
  </div>
</template>

<style scoped></style>
