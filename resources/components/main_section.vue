<script setup lang="ts">
import { computed } from 'vue'
import Fuse from 'fuse.js'
import PackageCard from './package_card.vue'
import type { PackageInfo, PackagesFilters } from '@/types'

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

const filteredPackages = computed(() => {
  let packages = props.packages

  if (props.filters.category) {
    packages = packages.filter((pkg) => pkg.category === props.filters.category)
  }

  if (props.filters.search) {
    packages = fuse.search(props.filters.search).map((r) => r.item)
  } else {
    const sortBy = props.filters.sort!
    if (sortBy === 'stars') packages.sort((a, b) => (b.stars || 0) - (a.stars || 0))
    if (sortBy === 'downloads') packages.sort((a, b) => (b.downloads || 0) - (a.downloads || 0))
    if (sortBy === 'created')
      packages.sort((a, b) => (b.firstReleaseAt || 0) - (a.firstReleaseAt || 0))
    if (sortBy === 'updated')
      packages.sort((a, b) => (b.lastReleaseAt || 0) - (a.lastReleaseAt || 0))
  }

  return packages
})
</script>

<template>
  <section class="grid grid-cols-1 gap-5" md="grid-cols-1" lg="grid-cols-2" xl="grid-cols-3">
    <PackageCard v-for="pkg in filteredPackages" :key="pkg.name" :package="pkg" />
  </section>
</template>
