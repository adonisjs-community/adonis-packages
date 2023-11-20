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
  <nav v-if="pages" aria-label="Page navigation example">
    <ul class="list-style-none flex items-center gap-2">
      <li>
        <a
          class="flex cursor-pointer items-center justify-center rounded bg-transparent text-2xl font-sans text-base11"
          :class="{
            'text-base4': currentPage === 1,
            'hover:text-indigo': currentPage !== 1,
          }"
          @click="handlePrevClick"
        >
          <i class="i-ic-sharp-keyboard-arrow-left inline-block"></i>
        </a>
      </li>

      <p class="text-sm font-content text-base11">{{ currentPage }} / {{ pages }}</p>

      <li>
        <a
          class="flex cursor-pointer items-center justify-center rounded bg-transparent text-2xl font-sans text-base11"
          :class="{
            'text-base4': currentPage === pages,
            'hover:text-indigo': currentPage !== pages,
          }"
          @click="handleNextClick"
        >
          <i class="i-ic-sharp-keyboard-arrow-right inline-block"></i>
        </a>
      </li>
    </ul>
  </nav>
</template>
