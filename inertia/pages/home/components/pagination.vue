<script setup lang="ts">
const props = defineProps<{
  pages: number
  currentPage: number
  total: number
}>()

const emit = defineEmits(['update:currentPage'])

function handleNextClick() {
  if (props.currentPage < props.pages) emit('update:currentPage', props.currentPage + 1)
}

function handlePrevClick() {
  if (props.currentPage > 1) emit('update:currentPage', props.currentPage - 1)
}
</script>

<template>
  <nav v-if="pages" aria-label="packages navigation" class="flex items-center justify-center">
    <div class="flex items-center bg-base3 border border-base6 rounded bg-base2 overflow-hidden">
      <button
        aria-label="Previous page"
        class="flex h-8 w-10 cursor-pointer items-center justify-center text-base11 transition-all duration-200 hover:bg-base3 disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="currentPage === 1"
        @click="handlePrevClick"
      >
        <i class="i-tabler:chevron-left text-md"></i>
      </button>

      <div class="flex items-center gap-2 px-4 h-8 bg-base2 border-x border-base6">
        <span class="text-sm text-base11 font-medium">{{ currentPage }}</span>
        <span class="text-sm text-base9">/</span>
        <span class="text-sm text-base9">{{ pages }}</span>
      </div>

      <button
        aria-label="Next page"
        class="flex h-8 w-10 cursor-pointer items-center justify-center text-base11 transition-all duration-200 hover:bg-base3 disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="currentPage === pages"
        @click="handleNextClick"
      >
        <i class="i-tabler:chevron-right text-md"></i>
      </button>
    </div>
  </nav>
</template>
