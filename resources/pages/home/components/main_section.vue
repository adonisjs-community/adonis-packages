<script setup lang="ts">
import PackageCard from './package_card.vue'
import type { PackageInfo, PackagesFilters } from '@/types'
import Button from '@/components/ui/button.vue'

defineProps<{
  packages: PackageInfo[]
  filters: PackagesFilters
}>()
</script>

<template>
  <!-- Packages list -->
  <section
    v-if="packages.length > 0"
    class="grid grid-cols-1 gap-5"
    md="grid-cols-1"
    lg="grid-cols-2"
    xl="grid-cols-3"
  >
    <PackageCard v-for="pkg in packages" :key="pkg.name" :package="pkg" />
  </section>
  <!-- Not found package section -->
  <div v-else class="flex flex-col items-center justify-center h-96">
    <p class="text-2xl">No packages found !</p>
    <div class="text-base10 text-center mt-4">
      If you think a package is missing here, <br />
      please feel free to create a PR on the repository to add it !
    </div>
    <Button class="mt-6" as="a" theme="primary" left-icon="i-fa6-brands-github">
      Contribute on GitHub
    </Button>
  </div>
</template>
