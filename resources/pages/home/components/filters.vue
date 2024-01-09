<script setup lang="ts">
import type { PackageCategories, PackageCategory } from '@/types'

const props = defineProps<{
  categories: PackageCategories
}>()

const versionsOptions = [
  {
    value: '6',
    label: 'AdonisJS 6',
    color: 'bg-purple5 group-hover:bg-purple5',
    icon: 'i-mynaui-six-hexagon',
    subline: 'Compatible with AdonisJS 6',
  },
  {
    value: '5',
    label: 'AdonisJS 5',
    color: 'bg-violet5 group-hover:bg-violet5',
    icon: 'i-mynaui-five-hexagon',
    subline: 'Compatible with AdonisJS 5',
  },
]

const categoryModel = defineModel<PackageCategory | null>('category')
const versionModel = defineModel<string | null>('version')
</script>

<template>
  <div class="hidden flex-col gap-y-8" md="flex">
    <div>
      <p class="text-3xl font-bold">Version</p>
      <div class="mt-6 flex gap-x-6">
        <div class="flex flex-col gap-y-4 font-content">
          <button
            v-for="version in versionsOptions"
            :key="version.value"
            class="group flex cursor-pointer items-center gap-x-4 text-left transition-all duration-200 ease-in-out"
            hover="translate-x-2"
            data-testid="category-button"
            @click="versionModel = versionModel === version.value ? null : version.value"
          >
            <div
              class="flex items-center rounded-xl px-2.4 py-2 text-sm transition-colors duration-500"
              :class="[
                versionModel === version.value ? version.color : 'bg-base2',
                `group-hover:${version.color}`,
              ]"
            >
              <i
                class="inline-block group-hover:text-base12"
                :class="[
                  version.icon,
                  versionModel !== version.label ? 'text-base12' : 'text-base12',
                ]"
              />
            </div>
            <div>
              <p data-testid="category-label" class="text-base12">{{ version.label }}</p>
              <p class="text-xs text-base10">{{ version.subline }}</p>
            </div>
          </button>
        </div>
      </div>
    </div>

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
            @click="categoryModel = categoryModel === category.label ? null : category.label"
          >
            <div
              class="flex items-center rounded-xl px-2.4 py-2 text-sm transition-colors duration-500"
              :class="[
                categoryModel === category.label ? category.color : 'bg-base2',
                `group-hover:${category.color}`,
              ]"
            >
              <i
                class="inline-block group-hover:text-base12"
                :class="[
                  category.icon,
                  categoryModel !== category.label ? 'text-base12' : 'text-base12',
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
