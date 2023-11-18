<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import { ref } from 'vue'
import type { PackageInfo, PackagesFilters } from '@/types'

import Hero from '@/components/hero.vue'
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import SortBy from '@/components/sort_by.vue'
import Filters from '@/components/filters.vue'
import SearchBar from '@/components/search_bar.vue'
import MainSection from '@/components/main_section.vue'

defineProps<{
  packages: PackageInfo[]
}>()

const filters = ref<PackagesFilters>({
  sort: 'updated',
})
</script>

<template>
  <div class="flex flex-col min-h-full">
    <Head title="AdonisJS packages - Discover the best AdonisJS packages" />

    <Header />
    <Hero />

    <div class="relative pb-28">
      <div class="absolute inset-0 bg-mask pointer-events-none">
        <div class="bg-topography absolute inset-0"></div>
      </div>
      <div class="p-container">
        <div class="gap-24 items-start" md="grid grid-cols-[18em_1fr]">
          <Filters v-model="filters" :packages="packages" />
          <div class="flex flex-col w-full">
            <div class="flex flex-col w-full justify-between gap-2" md="items-center flex-row">
              <SearchBar v-model="filters.search" />
              <SortBy v-model="filters.sort" />
            </div>
            <MainSection class="mt-8" :filters="filters" :packages="packages" />
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<style scoped>
.bg-mask {
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 1) 620px);
  mask-image: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 1) 8%);
}

.bg-topography {
  background-size: 920px;
  background-image: url('@/assets/topography.svg');
}
</style>
