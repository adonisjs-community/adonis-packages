<script setup lang="ts">
import { computed } from 'vue'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'
import type { PackagesFilters } from '@/types'

const sortOptions = [
  { label: 'Newest', value: 'created', description: 'Sort by packages that just dropped' },
  { label: 'Most stars', value: 'stars', description: 'Sort by packages that have the most stars' },
  {
    label: 'Most downloads',
    value: 'downloads',
    description: 'Sort by packages that have the most downloads',
  },
  {
    label: 'Most recent update',
    value: 'updated',
    description: 'Sort by packages that have the most recent update',
  },
] as Array<{ label: string; value: PackagesFilters['sort']; description: string }>

const value = defineModel<PackagesFilters['sort']>({ default: 'downloads' })
const selectedOption = computed(() => sortOptions.find((option) => option.value === value.value))
</script>

<template>
  <Listbox v-model="value" as="div">
    <div class="relative mt-2">
      <ListboxButton
        v-slot="{ open }"
        class="relative w-[230px] cursor-default rounded-xl search-bar-input py-3 pl-5 pr-10 text-left text-white shadow-sm sm:leading-6"
      >
        <span class="inline-flex w-full truncate">
          <span class="truncate">{{ selectedOption?.label }}</span>
        </span>
        <span class="pointer-events-none absolute inset-y-0 right-3 flex items-center pr-2">
          <i
            class="i-fa6-solid-chevron-down text-sm text-white-400 transform transition-transform duration-200"
            :class="[open ? 'transform rotate-180' : '']"
          />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-2 w-full overflow-auto rounded-md option py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <ListboxOption
            v-for="option in sortOptions"
            :key="option.value"
            v-slot="{ active, selected }"
            as="template"
            :value="option.value"
          >
            <li
              class="relative cursor-default select-none py-2 pl-3 pr-9 transition-colors duration-200 cursor-pointer"
              :class="[active ? 'bg-primary' : '']"
            >
              <div class="flex flex-col">
                <span>
                  {{ option.label }}
                </span>
                <span
                  class="text-xs leading-3 font-thin pr-8"
                  :class="[active ? 'text-indigo-200' : 'text-gray-500']"
                >
                  {{ option.description }}
                </span>
              </div>

              <span
                v-if="selected"
                class="absolute inset-y-0 right-0 flex items-center pr-4"
                :class="[active ? 'text-white' : 'text-indigo-600']"
              >
                <i class="i-fa6-solid-check text-white-400 text-sm" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<style scoped>
.search-bar-input {
  background: rgba(20, 20, 20, 0.57);
}

.option {
  background: rgba(20, 20, 20, 1);
}
</style>
