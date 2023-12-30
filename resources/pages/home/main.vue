<script setup lang="ts">
import { ref } from 'vue'
import { Head, router } from '@inertiajs/vue3'
import { useUrlSearchParams, watchDeep } from '@vueuse/core'

import Hero from '@/components/hero.vue'
import Layout from '@/layouts/default.vue'
import SortBy from './components/sort_by.vue'
import Filters from './components/filters.vue'
import SearchBar from './components/search_bar.vue'
import Pagination from './components/pagination.vue'
import MainSection from './components/main_section.vue'
import type { GetHomeResponse, PackagesFilters } from '@/types'

const props = defineProps<GetHomeResponse>()
const params = useUrlSearchParams<PackagesFilters>('history')
const filters = ref<PackagesFilters>({
  sort: params.sort,
  category: params.category,
  search: params.search,
  page: +(props.meta.currentPage || 1),
})

watchDeep(filters, () => {
  router.visit('/', {
    method: 'get',
    data: filters.value,
    preserveState: true,
    preserveScroll: true,
  })
})

function changePage(newPage: number) {
  filters.value.page = newPage
  scrollToTop()
}

function scrollToTop() {
  const el = document.querySelector('#searchBar') as HTMLElement

  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <Layout>
    <Head title="AdonisJS Packages - Discover the best AdonisJS packages" />
    <Hero />

    <div class="relative pb-28">
      <div class="bg-mask pointer-events-none absolute inset-0">
        <div class="bg-topography absolute inset-0"></div>
      </div>

      <div class="p-container">
        <div class="items-start gap-4 2xl:gap-12" md="grid grid-cols-[18em_1fr]">
          <!-- Category filters -->
          <Filters v-model="filters" :categories="categories" />

          <!-- Search and sort -->
          <div class="w-full flex flex-col">
            <div class="w-full flex flex-col justify-between gap-2" md="items-center flex-row">
              <SearchBar id="searchBar" v-model="filters.search" />
              <SortBy v-model="filters.sort" />
            </div>

            <!-- Main section -->
            <div class="flex flex-col items-center">
              <MainSection class="mt-8 w-full" :filters="filters" :packages="packages" />
              <Pagination
                class="mt-8"
                :pages="meta.pages"
                :current-page="meta.currentPage"
                :total="meta.total"
                @update:current-page="changePage($event)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style scoped>
.bg-mask {
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 1) 620px);
  mask-image: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 1) 8%);
}

.bg-topography {
  background-size: 620px;
  background-image: url('@/assets/topography.svg');
}
</style>
