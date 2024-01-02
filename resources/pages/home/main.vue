<script setup lang="ts">
import { ref, watch } from 'vue'
import { Head, router } from '@inertiajs/vue3'
import { useUrlSearchParams, watchDebounced } from '@vueuse/core'

import Hero from '@/components/hero.vue'
import Layout from '@/layouts/default.vue'
import Order from './components/order.vue'
import Filters from './components/filters.vue'
import SearchBar from './components/search_bar.vue'
import Pagination from './components/pagination.vue'
import SelectMenu from './components/select_menu.vue'
import MainSection from './components/main_section.vue'
import ButtonGroup from './components/button_group.vue'
import type {
  GetHomeResponse,
  ModuleType,
  PackageCategories,
  PackageCategory,
  PackagesFilters,
} from '@/types'

const props = defineProps<GetHomeResponse>()

const scrollToTopRef = ref<HTMLElement | null>(null)
function scrollToTop() {
  const el = scrollToTopRef.value

  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const params = useUrlSearchParams<Partial<PackagesFilters>>('history')

const page = ref<number>(props.meta.currentPage || 1)
// Do not watch page to avoid 2 requests when filters change
function onChangePage(newPage: number) {
  changePage(newPage)
  fetchNewData()
}
function changePage(newPage: number) {
  page.value = newPage
  scrollToTop()
}

const categories = ref<PackageCategories>(props.categories)
const categoriesOptions = [
  { label: 'All', value: '' },
  ...props.categories.map((category) => ({
    label: category.label,
    value: category.label,
  })),
]
const category = ref<PackageCategory>(params.category || ('' as PackageCategory))

watch(category, () => {
  changePage(1)
  fetchNewData()
})

const search = ref<string>((params.search as string) || '')
watchDebounced(
  search,
  () => {
    changePage(1)
    fetchNewData()
  },
  { debounce: 400 },
)

const orderByOptions = [
  {
    label: 'Name',
    value: 'name',
    description: 'Order packages by their name',
  },
  {
    label: 'Creation Date',
    value: 'created',
    description: 'Order packages by their creation date',
  },
  { label: 'Stars', value: 'stars', description: 'Order packages by their stars' },
  {
    label: 'Downloads',
    value: 'downloads',
    description: 'Sort package by their downloads',
  },
  {
    label: 'Update Date',
    value: 'updated',
    description: 'Sort packages by their last update date',
  },
]
const order = ref<-1 | 1>(params.order ? (Number(params.order) as -1 | 1) : 1)
const orderBy = ref<string>(params.orderBy || orderByOptions[0].value)

watch([order, orderBy], () => {
  changePage(1)
  fetchNewData()
})

const versionsOptions = [
  { value: '6', label: 'v6' },
  { value: '5', label: 'v5' },
]
const selectedVersions = ref<string[]>((params.versions as string[]) ?? [])

watch(selectedVersions, () => {
  changePage(1)
  fetchNewData()
})

const partiesOptions = [
  { value: 'official', label: 'Official' },
  { value: 'community', label: 'Community' },
  { value: '3rd-party', label: '3rd Party' },
]
const selectedParties = ref<ModuleType[]>((params.parties as ModuleType[]) ?? [])

watch(selectedParties, () => {
  changePage(1)
  fetchNewData()
})

function fetchNewData() {
  router.get(
    '/',
    {
      page: page.value,
      category: category.value,
      search: search.value,
      versions: selectedVersions.value,
      parties: selectedParties.value,
      order: order.value,
      orderBy: orderBy.value,
    },
    {
      preserveState: true,
      preserveScroll: true,
    },
  )
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
          <Filters v-model="category" :categories="categories" />

          <!-- Search, version and party filters and sort -->
          <div class="w-full flex flex-col">
            <div
              ref="scrollToTopRef"
              class="w-full flex flex-col flex-wrap justify-between gap-2"
              md="items-center flex-row"
            >
              <SearchBar v-model="search" />

              <div class="flex flex-row flex-wrap gap-2">
                <SelectMenu
                  v-model="category"
                  class="w-48 md:hidden"
                  :options="categoriesOptions"
                  placeholder="Select a category"
                />

                <SelectMenu
                  v-model="selectedVersions"
                  :options="versionsOptions"
                  multiple
                  placeholder="Select a version"
                />

                <SelectMenu
                  v-model="selectedParties"
                  :options="partiesOptions"
                  multiple
                  placeholder="Select a party"
                />

                <ButtonGroup>
                  <Order v-model="order" />

                  <SelectMenu v-model="orderBy" :options="orderByOptions" placeholder="Order by" />
                </ButtonGroup>
              </div>
            </div>

            <!-- Main section -->
            <div class="flex flex-col items-center">
              <MainSection class="mt-8 w-full" :packages="packages" />
              <Pagination
                class="mt-8"
                :pages="meta.pages"
                :current-page="meta.currentPage"
                :total="meta.total"
                @update:current-page="onChangePage($event)"
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
