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
  <a
    class="card flex rounded-xl gap-y-2 px-5 py-5 group cursor-pointer"
    :href="package.website || package.github"
    target="_blank"
  >
    <div class="flex items-center justify-between w-full">
      <Tag>{{ package.category }}</Tag>
      <i
        class="inline-block i-icon-park-outline-share text-xs text-white-300 opacity-0 group-hover:opacity-100 transition duration-500 hover:text-white"
      />
    </div>
    <div class="h-12 w-12 mt-4 items-center justify-center">
      <img v-if="package.icon" class="h-full object-contain" :src="`/icons/${package.icon}`" />
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

    <div class="flex text-md text-white-300 gap-6 mt-4">
      <a
        class="flex items-center gap-1.3 transition-colors duration-600 hover:text-white"
        :href="package.github"
        target="_blank"
      >
        <i class="inline-block i-fluent-emoji-star" />
        <span class="text-sm relative top-0.4">{{ package.stars }} stars</span>
      </a>

      <a
        class="flex items-center gap-1.3 transition-colors duration-600 hover:text-white"
        :href="`https://www.npmjs.com/package/${package.npm}`"
        target="_blank"
      >
        <i class="inline-block i-fluent-emoji-chart-increasing" />
        <span class="text-sm relative top-0.4">
          {{ numberFormatter(package.downloads) }} installs
        </span>
      </a>
    </div>
  </a>
</template>

<style scoped lang="postcss">
.card {
  background: #171717;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  transition: all 0.2s ease-in-out;
  border: 1px solid transparent;
  &:hover {
    border: 1px solid rgba(140, 140, 140, 0.1);
  }
}
</style>
