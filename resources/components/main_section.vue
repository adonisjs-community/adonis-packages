<script setup lang="ts">
import { millify } from 'millify'
import { computed } from 'vue'
import Fuse from 'fuse.js'
import type { PackageInfo, PackagesFilters } from '@/types'
import Tag from '@/components/tag.vue'
import { categories } from '~/content/categories'

const props = defineProps<{
  packages: PackageInfo[]
  filters: PackagesFilters
}>()

const fuseOptions = {
  threshold: 0.2,
  includeScore: true,
  includeMatches: true,
  isCaseSensitive: false,
  keys: ['name', 'npm', 'category', 'description', 'repo'],
}

const fuseIndex = Fuse.createIndex(fuseOptions.keys, props.packages)
const fuse = new Fuse(props.packages, fuseOptions, fuseIndex)

function numberFormatter(num: number) {
  return millify(num || 0, { precision: 1 })
}

function iconPlaceholder({ category }: PackageInfo) {
  return categories.find((c) => c.label === category)?.icon || 'i-fluent-emoji-package-24-regular'
}

const filteredPackages = computed(() => {
  let packages = props.packages

  if (props.filters.search) {
    packages = fuse.search(props.filters.search).map((r) => r.item)
  } else {
    // Sort only if no search
    // packages.sort((a, b) => sort(a[orderBy.value], b[orderBy.value], sortBy.value === 'asc'))
  }

  if (props.filters.category) {
    packages = packages.filter((pkg) => pkg.category === props.filters.category)
  }

  return packages
})
</script>

<template>
  <section class="grid grid-cols-3 gap-5">
    <div
      v-for="pkg in filteredPackages"
      :key="pkg.name"
      class="card flex rounded-xl gap-y-2 px-5 py-5"
    >
      <Tag>{{ pkg.category }}</Tag>
      <div class="h-12 w-12 mt-4 items-center justify-center">
        <img v-if="pkg.icon" class="h-full" :src="`/icons/${pkg.icon}`" />
        <div
          v-else
          style="background: rgba(43, 43, 43, 0.23)"
          class="h-full flex items-center justify-center rounded-xl overflow-hidden"
        >
          <i class="inline-block bg-grey text-lg" :class="iconPlaceholder(pkg)" />
        </div>
      </div>
      <div class="flex flex-col gap-y-1">
        <p class="text-2xl font-bold">
          {{ pkg.name }}
        </p>
        <p class="text-white-300 text-sm line-clamp-3">
          {{ pkg.description }}
        </p>
      </div>

      <div class="flex text-md text-white-300 gap-5 mt-4">
        <div class="flex items-center gap-3">
          <i class="inline-block i-fluent-emoji-star" />
          <span class="text-sm relative top-0.4">{{ pkg.stars }} stars</span>
        </div>

        <div class="flex items-center gap-3">
          <i class="inline-block i-fluent-emoji-chart-increasing" />
          <span class="text-sm relative top-0.4"
            >{{ numberFormatter(pkg.downloads) }} installs</span
          >
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card {
  background: rgba(20, 20, 20, 0.57);
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
</style>
