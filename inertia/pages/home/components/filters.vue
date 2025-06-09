<script setup lang="ts">
import FilterButton from './filter_button.vue'
import type { PackageCategories, PackageCategory } from '@/app/types'

const props = defineProps<{
  categories: PackageCategories
}>()

const categoryModel = defineModel<PackageCategory | null>('category')
</script>

<template>
  <div class="hidden flex-col gap-4" md="flex">
    <FilterButton
      v-for="category in props.categories"
      :key="category.label"
      :item="category"
      :is-selected="categoryModel === category.label"
      @click="categoryModel = categoryModel === category.label ? null : category.label"
    />
  </div>
</template>
