<script setup lang="ts">
import { computed, ref, watch } from 'vue'
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
import FiltersModal from './components/filters/filters_modal.vue'
import FilterParties from './components/filters/filter_parties.vue'
import FilterVersions from './components/filters/filter_versions.vue'
import type {
  GetHomeResponse,
  ModuleType,
  PackageCategories,
  PackageCategory,
  PackagesFilters,
  SortOrder,
} from '@/types'

const props = defineProps<GetHomeResponse>()
const params = useUrlSearchParams<Partial<PackagesFilters>>('history')

const scrollToTopRef = ref<HTMLElement | null>(null)
function scrollToTop() {
  if (!scrollToTopRef.value) return
  scrollToTopRef.value.scrollIntoView({ behavior: 'smooth' })
}

/**
 * Package categories
 */
const categories = ref<PackageCategories>(props.categories)
const categoriesOptions = [
  { label: 'All', value: '' },
  ...props.categories.map((category) => ({
    label: category.label,
    value: category.label,
  })),
]
const category = ref<PackageCategory>(params.category || ('' as PackageCategory))

/**
 * Search
 */
const search = ref<string>((params.search as string) || '')
watchDebounced(search, () => fetchNewPageData(1), { debounce: 400 })

/**
 * Order by
 */
const orderByOptions = [
  { label: 'Name', value: 'name', description: 'Order packages by their name' },
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
const order = ref<SortOrder>(params.order ? (+params.order as SortOrder) : 1)
const orderBy = ref<string>(params.orderBy || orderByOptions[0].value)

/**
 * Package versions
 */
const versionsOptions = [
  { value: '6', label: 'v6' },
  { value: '5', label: 'v5' },
]
const selectedVersions = ref<string[]>((params.versions as string[]) ?? [])

/**
 * Package parties
 */
const partiesOptions = [
  { value: 'official', label: 'Official' },
  { value: 'community', label: 'Community' },
  { value: '3rd-party', label: '3rd Party' },
]
const selectedParties = ref<ModuleType[]>((params.parties as ModuleType[]) ?? [])

/**
 * Refetch when any of the filters change
 */
watch([selectedParties, order, orderBy, selectedVersions, category], () => fetchNewPageData(1))

function fetchNewPageData(page: number) {
  router.get(
    '/',
    {
      page,
      category: category.value,
      search: search.value,
      versions: selectedVersions.value,
      parties: selectedParties.value,
      order: order.value,
      orderBy: orderBy.value,
    },
    { preserveState: true, preserveScroll: true },
  )

  scrollToTop()
}

const filters = computed(() => {
  return {
    category: category.value,
    versions: selectedVersions.value,
    parties: selectedParties.value,
    order: order.value,
    orderBy: orderBy.value,
  }
})

const options = {
  categories: categoriesOptions,
  versions: versionsOptions,
  parties: partiesOptions,
  orderBy: orderByOptions,
}

function onUpdateFilters(newFilters: PackagesFilters) {
  category.value = newFilters.category
  selectedVersions.value = newFilters.versions
  selectedParties.value = newFilters.parties
  order.value = newFilters.order
  orderBy.value = newFilters.orderBy
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
              class="w-full flex flex-row justify-between gap-2"
              md="items-center"
            >
              <SearchBar v-model="search" class="grow lg:grow-0" />

              <div class="lg:hidden">
                <FiltersModal
                  :options="options"
                  :filters="filters"
                  @update:filters="onUpdateFilters"
                />
              </div>

              <div class="hidden flex-row gap-2 lg:flex">
                <FilterVersions
                  v-model="selectedVersions"
                  class="md:w-[230px]"
                  :versions="versionsOptions"
                />

                <FilterParties
                  v-model="selectedParties"
                  class="md:w-[230px]"
                  :parties="partiesOptions"
                />

                <ButtonGroup>
                  <Order v-model="order" />

                  <SelectMenu
                    v-model="orderBy"
                    class="md:w-[230px]"
                    :options="orderByOptions"
                    placeholder="Order by"
                  />
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
                @update:current-page="fetchNewPageData"
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
