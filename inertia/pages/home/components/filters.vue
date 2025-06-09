<script setup lang="ts">
import { motion } from 'motion-v'

import FilterButton from './filter_button.vue'
import type { PackageCategories, PackageCategory } from '@/app/types'

const props = defineProps<{
  categories: PackageCategories
}>()

const categoryModel = defineModel<PackageCategory | null>('category')
</script>

<template>
  <div class="hidden flex-col gap-4" md="flex">
    <motion.div
      v-for="category in props.categories"
      :key="category.label"
      :while-hover="{ x: 10, transition: { type: 'spring', stiffness: 800, damping: 17 } }"
    >
      <FilterButton
        :item="category"
        :is-selected="categoryModel === category.label"
        @click="categoryModel = categoryModel === category.label ? null : category.label"
      />
    </motion.div>
  </div>
</template>
