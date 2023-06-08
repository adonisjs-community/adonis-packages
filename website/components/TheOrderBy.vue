<template>
  <div class="flex items-center text-mauve12">
    <label
      for="options-menu"
      class="mr-3"
      @click="toggleOrderByMenu"
    >Order by</label>
    <div class="flex border border-mauve5 rounded-md">
      <div class="relative w-28 my-auto">
        <button
          type="button"
          :aria-label="`change sort`"
          class="flex items-center justify-center w-full p-1 px-2 focus:border-mauve-6 focus:outline-none hover:border-mauve-7"
          @click="toggleOrderByMenu"
        >
          {{ currentOrderByLabel }}
        </button>
        <div
          v-show="displayOrderByMenu"
          class="absolute left-0 py-1 z-10 origin-top-right rounded-b-md shadow-lg border border-mauve4 shadow-xs bg-mauve2"
        >
          <div
            id="options-menu"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              v-for="(option, key) of orderByFieldsExceptCurrent"
              :key="key"
              type="button"
              :aria-label="`sort by ${key}`"
              class="flex text-sm mx-1 justify-center p-1 px-2 w-28 hover:bg-violet4 focus:text-mauve10 text-mauve12 focus:outline-none rounded-md"
              @click="selectOrderBy(key)"
            >
              {{ option }}
            </button>
          </div>
        </div>
      </div>
      <div class="relative">
        <button
          type="button"
          :aria-label="sortBy === 'asc' ? 'sort ascending' : 'sort descending'"
          class="flex items-center p-2 hover:bg-violet4 focus:bg-skborder-sky-lightest focus:outline-none rounded-r-md"
          @click="toggleSortBy"
        >
          <UnoIcon :class="sortBy === 'asc' ? 'i-carbon-sort-ascending' : 'i-carbon-sort-descending'" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ORDER_BY_FIELDS } from '~/composables/constants'

const props = defineProps<{ sortBy: string, orderBy: string }>()
const emit = defineEmits<{(...args:any[]): void }>()

const displayOrderByMenu = ref<boolean>(false)

const currentOrderByLabel = computed<string>(() => ORDER_BY_FIELDS[props.orderBy])

const orderByFieldsExceptCurrent = computed<{ }>(() => {
  const result = { ...ORDER_BY_FIELDS }
  delete result[props.orderBy]
  return result
})

const orderByModel = computed({
  get () {
    return props.orderBy
  },
  set (orderBy) {
    emit('update:order-by', orderBy)
  }
})
const sortByModel = computed({
  get () {
    return props.sortBy
  },
  set (sortBy) {
    emit('update:sort-by', sortBy)
  }
})

const selectOrderBy = (field): void => {
  orderByModel.value = field
  displayOrderByMenu.value = false
}

const toggleOrderByMenu = (): void => {
  displayOrderByMenu.value = !displayOrderByMenu.value
}

const toggleSortBy = (): void => {
  sortByModel.value = (sortByModel.value === 'asc') ? 'desc' : 'asc'
}
</script>
