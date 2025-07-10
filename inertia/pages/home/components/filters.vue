<script setup lang="ts">
import { motion } from 'motion-v'

import FilterButton from './filter_button.vue'
import type { PackageCategories, PackageCategory } from '@/app/types'

const props = defineProps<{
  categories: PackageCategories
}>()

const categoryModel = defineModel<PackageCategory | null>('category')
const versionModel = defineModel<string | null>('version')

const adonisVersions = [
  {
    label: 'AdonisJS 6',
    value: '6',
    icon: 'i-mynaui:six-waves',
    subline: 'Compatible with AdonisJS 6',
  },
  {
    label: 'AdonisJS 5',
    value: '5',
    icon: 'i-mynaui:five-waves',
    subline: 'Compatible with AdonisJS 5',
  },
]
</script>

<template>
  <div class="hidden flex-col gap-4" md="flex">
    <div>
      <div class="flex flex-col gap-2">
        <motion.div
          v-for="version in adonisVersions"
          :key="version.value"
          :while-hover="{ x: 10, transition: { type: 'spring', stiffness: 800, damping: 17 } }"
        >
          <FilterButton
            :item="version"
            :is-selected="versionModel === version.value"
            @click="versionModel = versionModel === version.value ? null : version.value"
          />
        </motion.div>
      </div>
    </div>

    <div class="mt-6">
      <div class="flex flex-col gap-2">
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
    </div>
  </div>
</template>
