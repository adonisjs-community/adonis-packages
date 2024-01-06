<script lang="ts" setup>
import { ref } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'

import Order from '../order.vue'
import SelectMenu from '../select_menu.vue'
import ButtonGroup from '../button_group.vue'
import FilterParties from './filter_parties.vue'
import type { SortOrder } from '../../../../types'
import FilterVersions from './filter_versions.vue'
import FilterCategories from './filter_categories.vue'

const props = defineProps<{
  options: {
    categories: {
      label: string
      value: string
    }[]
    versions: {
      label: string
      value: string
    }[]
    parties: {
      label: string
      version: string
    }[]
    orderBy: {
      label: string
      value: string
      description: string
    }[]
  }
  filters: {
    category: string
    versions: string[]
    parties: string[]
    order: SortOrder
    orderBy: string
  }
}>()

const emits = defineEmits<{
  'update:filters': [
    {
      category: string
      versions: string[]
      parties: []
      order: SortOrder
      orderBy: string
    },
  ]
}>()

/**
 * Intermediary data to avoid mutating props directly
 */
const selectedCategory = ref<string>(props.filters.category)
const selectedVersions = ref<string[]>(props.filters.versions)
const selectedParties = ref<string[]>(props.filters.parties)
const order = ref<SortOrder>(props.filters.order)
const orderBy = ref<string>(props.filters.orderBy)

const isOpen = ref(false)

function closeModal() {
  emits('update:filters', {
    category: selectedCategory.value,
    versions: selectedVersions.value,
    parties: selectedParties.value,
    order: order.value,
    orderBy: orderBy.value,
  })
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}
</script>

<template>
  <button
    type="button"
    aria-label="Open filters"
    class="h-12 flex items-center rounded-xl px-3 py-2 text-base12 shadow-sm !bg-base2 focus:(outline-0 ring-0)"
    @click="openModal"
  >
    <i class="i-carbon-filter inline-block h-6 w-6" />
  </button>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="closeModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/40" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="min-h-full flex items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="max-w-md w-full transform rounded-2xl bg-base2 p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle as="h3" class="text-lg text-white font-medium leading-6">
                Filters
              </DialogTitle>

              <div class="mt-2 flex flex-col gap-2">
                <FilterCategories
                  v-model="selectedCategory"
                  class="w-full md:hidden"
                  :categories="options.categories"
                />

                <FilterVersions
                  v-model="selectedVersions"
                  class="w-full"
                  :versions="options.versions"
                />

                <FilterParties
                  v-model="selectedParties"
                  class="w-full"
                  :parties="options.parties"
                />

                <ButtonGroup>
                  <Order v-model="order" />

                  <SelectMenu
                    v-model="orderBy"
                    class="w-full"
                    :options="options.orderBy"
                    placeholder="Order by"
                  />
                </ButtonGroup>
              </div>

              <div class="mt-4 flex justify-end">
                <button
                  type="button"
                  class="rounded-2xl px-3 py-2 shadow-sm !bg-primary focus:(outline-0 ring-0)"
                  @click="closeModal"
                >
                  Validate
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
