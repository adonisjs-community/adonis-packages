<script setup lang="ts">
import { computed } from 'vue'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'
import type { PackagesFilters } from '@/types'

const sortOptions = [
  { label: 'Newest', value: 'created', description: 'Check out the newest packages on the block' },
  { label: 'Top stars', value: 'stars', description: 'See the packages that are crowd favorites' },
  {
    label: 'Most downloads',
    value: 'downloads',
    description: 'Find packages that everyone is downloading',
  },
  {
    label: 'Recently updated',
    value: 'updated',
    description: 'Look at packages that just got updated',
  },
] as Array<{ label: string; value: PackagesFilters['sort']; description: string }>

const value = defineModel<PackagesFilters['sort']>({ default: 'downloads' })
const selectedOption = computed(() => sortOptions.find((option) => option.value === value.value))
</script>

<template>
  <Listbox v-model="value" as="div">
    <div class="relative">
      <ListboxButton
        v-slot="{ open }"
        class="relative md:w-[230px] w-full cursor-pointer rounded-xl !bg-base2 py-3 pl-5 pr-10 text-left text-base12 shadow-sm sm:leading-6"
      >
        <span class="inline-flex text-base-11 w-full truncate">
          <span class="truncate">{{ selectedOption?.label }}</span>
        </span>
        <span class="pointer-events-none absolute inset-y-0 right-3 flex items-center pr-2">
          <i
            class="i-fa6-solid-chevron-down text-sm text-base-11 transform transition-transform duration-200"
            :class="[open ? 'transform rotate-180' : '']"
          />
        </span>
      </ListboxButton>

      <Transition
        enter-active-class="transition ease-out duration-400"
        enter-from-class="opacity-0 -translate-y-3"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition transform ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-3"
      >
        <ListboxOptions
          class="absolute z-10 mt-2 w-full bg-base2 overflow-auto rounded-xl py-2 text-base shadow-lg px-2"
        >
          <ListboxOption
            v-for="option in sortOptions"
            :key="option.value"
            v-slot="{ active, selected }"
            as="template"
            :value="option.value"
          >
            <li
              class="relative cursor-default rounded-lg select-none py2 pl-3 pr-4 transition-colors duration-200 cursor-pointer"
              :class="[active ? 'bg-primary' : '']"
            >
              <div class="flex flex-col font-content">
                <span class="text-base">
                  {{ option.label }}
                </span>
                <span
                  class="text-xs font-thin pr-8"
                  :class="[active ? 'text-indigo-200' : 'text-gray-500']"
                >
                  {{ option.description }}
                </span>
              </div>

              <span
                v-if="selected"
                class="absolute inset-y-0 right-0 flex items-center pr-4"
                :class="[active ? 'text-base12' : 'text-indigo-600']"
              >
                <i class="i-fa6-solid-check text-base-11 text-sm" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </Transition>
    </div>
  </Listbox>
</template>
