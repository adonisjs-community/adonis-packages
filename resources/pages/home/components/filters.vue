<script setup lang="ts">
import type { PackageCategories, PackageCategory, PackagesFilters } from '@/types'
import Button from '@/components/ui/button.vue'

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
  <div class="flex-col gap-y-8 hidden" md="flex">
    <div>
      <p class="text-3xl font-bold">Categories</p>
      <div class="flex mt-6 gap-x-6">
        <div class="flex flex-col gap-y-4 font-content">
          <button
            v-for="category in props.categories"
            :key="category.label"
            class="flex text-left group items-center gap-x-4 transition-all ease-in-out duration-200 cursor-pointer"
            hover="translate-x-2"
            @click="handleCategoryClick(category.label)"
          >
            <div
              class="group-hover:bg-primary transition-colors duration-500 text-sm px-2.4 py-2 flex items-center rounded-xl"
              :class="[filters.category === category.label ? 'bg-primary' : 'bg-[#171717]']"
            >
              <i
                class="group-hover:text-white inline-block"
                :class="[
                  category.icon,
                  filters.category !== category.label ? 'text-white-300' : 'text-white',
                ]"
              />
            </div>
            <div>
              <p class="text-white-400">{{ category.label }}</p>
              <p class="text-xs text-white-300">{{ category.count }} packages</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
