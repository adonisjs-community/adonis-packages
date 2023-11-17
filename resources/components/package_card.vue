<script setup lang="ts">
import { millify } from 'millify'
import type { PackageInfo } from '@/types'
import { categories } from '~/content/categories'
import Tag from '@/components/tag.vue'

defineProps<{
  package: PackageInfo
}>()

function numberFormatter(num: number) {
  return millify(num || 0, { precision: 1 })
}

function iconPlaceholder({ category }: PackageInfo) {
  return categories.find((c) => c.label === category)?.icon || 'i-fluent-emoji-package-24-regular'
}
</script>

<template>
  <div class="card flex rounded-xl gap-y-2 px-5 py-5">
    <Tag>{{ package.category }}</Tag>
    <div class="h-12 w-12 mt-4 items-center justify-center">
      <img v-if="package.icon" class="h-full" :src="`/icons/${package.icon}`" />
      <div
        v-else
        style="background: rgba(43, 43, 43, 0.23)"
        class="h-full flex items-center justify-center rounded-xl overflow-hidden"
      >
        <i class="inline-block bg-grey text-lg" :class="iconPlaceholder(package)" />
      </div>
    </div>
    <div class="flex flex-col gap-y-1">
      <p class="text-2xl font-bold">
        {{ package.name }}
      </p>
      <p class="text-white-300 text-sm line-clamp-3">
        {{ package.description }}
      </p>
    </div>

    <div class="flex text-md text-white-300 gap-5 mt-4">
      <div class="flex items-center gap-3">
        <i class="inline-block i-fluent-emoji-star" />
        <span class="text-sm relative top-0.4">{{ package.stars }} stars</span>
      </div>

      <div class="flex items-center gap-3">
        <i class="inline-block i-fluent-emoji-chart-increasing" />
        <span class="text-sm relative top-0.4"
          >{{ numberFormatter(package.downloads) }} installs</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
