<template>
  <section class="grid grid-cols-3 gap-5">
    <div v-for="pkg in packages" :key="pkg.name" class="card flex rounded-xl gap-y-2 px-5 py-5">
      <Tag>{{ pkg.category }}</Tag>
      <div class="h-12 w-12 mt-4 items-center justify-center">
        <img v-if="pkg.icon" class="h-full" :src="`/icons/${pkg.icon}`" />
        <div v-else style="background: rgba(43, 43, 43, 0.23)" class="h-full flex items-center justify-center rounded-xl overflow-hidden">
          <i class="inline-block bg-grey text-lg" :class="iconPlaceholder(pkg)"></i>
        </div>
      </div>
      <div class="flex flex-col gap-y-1">
        <p class="text-2xl font-bold">{{ pkg.name }}</p>
        <p class="text-white-300 text-sm line-clamp-3">{{ pkg.description }}</p>
      </div>

      <div class="flex text-md text-white-300 gap-5 mt-4">
        <div class="flex items-center gap-3">
          <i class="inline-block i-fluent-emoji-star"></i>
          <span class="text-sm relative top-0.4">{{ pkg.stars }} stars</span>
        </div>

        <div class="flex items-center gap-3">
          <i class="inline-block i-fluent-emoji-chart-increasing"></i>
          <span class="text-sm relative top-0.4">{{ numberFormatter(pkg.downloads) }} installs</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Tag from '@/components/tag.vue'
import { PackageInfo, PackagesFilters } from '@/types';
import { millify } from 'millify'
import { categories } from '~/content/categories';

defineProps<{
  packages: PackageInfo[]
  filters: PackagesFilters
}>()

function numberFormatter (num: number, options = { precision: 1 }) {
  return millify(num || 0, options)
}

function iconPlaceholder ({ category }: PackageInfo) {
  return categories.find(c => c.label === category)?.icon || 'i-fluent-emoji-package-24-regular'
}
</script>

<style scoped>
.card {
  /* border: 1px solid rgba(84, 104, 255, 0.45); */
  background: rgba(20, 20, 20, 0.57);
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
</style>
