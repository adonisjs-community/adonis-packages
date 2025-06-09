<script setup lang="ts">
interface FilterItem {
  value?: string
  label: string
  icon: string
  subline?: string
  count?: number
}

defineProps<{
  item: FilterItem
  isSelected: boolean
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    class="group flex cursor-pointer items-center gap-x-4 text-left transition-all duration-200 ease-in-out"
    hover="translate-x-2"
    data-testid="category-button"
    @click="emit('click')"
  >
    <div
      class="flex items-center rounded bg-base3 px-2 border border-base4 py-2 text-sm transition-colors duration-500 group-hover:bg-base5"
      :class="[isSelected ? 'border-primary-400/70' : '']"
    >
      <i
        class="inline-block group-hover:text-base12 transition-colors duration-500"
        :class="[item.icon, !isSelected ? 'text-base9' : 'text-base12']"
      />
    </div>
    <div>
      <p data-testid="category-label" class="text-base12 text-sm">{{ item.label }}</p>
      <p class="text-xs text-base10">
        {{ item.subline || `${item.count} packages` }}
      </p>
    </div>
  </button>
</template>

<style scoped></style>
