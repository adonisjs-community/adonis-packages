<script setup lang="ts">
import type { PackageCategories, PackageCategory, PackagesFilters } from '@/types'

const props = defineProps<{
  categories: PackageCategories
}>()

const filters = defineModel<PackagesFilters>({ required: true })

function handleCategoryClick(category: PackageCategory) {
  filters.value.category = filters.value.category === category ? undefined : category
  filters.value.page = 1
}
</script>

<template>
  <div class="hidden flex-col gap-y-8" md="flex">
    <div>
      <p class="text-3xl font-bold">Categories</p>
      <div class="mt-6 flex gap-x-6">
        <div class="flex flex-col gap-y-4 font-content">
          <button
            v-for="category in props.categories"
            :key="category.label"
            class="group flex cursor-pointer items-center gap-x-4 text-left transition-all duration-200 ease-in-out"
            hover="translate-x-2"
            data-testid="category-button"
            @click="handleCategoryClick(category.label)"
          >
            <div
              class="flex items-center rounded-xl px-2.4 py-2 text-sm transition-colors duration-500"
              :class="[
                filters.category === category.label ? category.color : 'bg-base2',
                `group-hover:${category.color}`,
              ]"
            >
              <i
                class="inline-block group-hover:text-base12"
                :class="[
                  category.icon,
                  filters.category !== category.label ? 'text-base12' : 'text-base12',
                ]"
              />
            </div>
            <div>
              <p data-testid="category-label" class="text-base12">{{ category.label }}</p>
              <p class="text-xs text-base10">{{ category.count }} packages</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
