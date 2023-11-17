<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import { ref } from 'vue'
import type { PackageInfo, PackagesFilters } from '@/types'

import Hero from '@/components/hero.vue'
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import Filters from '@/components/filters.vue'
import SearchBar from '@/components/search_bar.vue'
import MainSection from '@/components/main_section.vue'

defineProps<{
  packages: PackageInfo[]
}>()

const filters = ref<PackagesFilters>({})
</script>

<template>
  <div class="flex flex-col min-h-full">
    <Head title="AdonisJS packages" />

    <Header />
    <Hero />

    <div class="container mx-auto">
      <div class="grid grid-cols-[18em_1fr] gap-24 items-start">
        <Filters v-model="filters" />
        <div class="flex flex-col">
          <div class="flex justify-between">
            <SearchBar v-model="filters.search" />
          </div>
          <MainSection class="mt-8" :filters="filters" :packages="packages" />
        </div>
      </div>
    </div>

    <Footer class="mt-28" />
  </div>
</template>

<style scoped></style>
