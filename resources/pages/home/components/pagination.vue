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
          class="rounded font-sans flex items-center justify-center cursor-pointer bg-transparent text-2xl text-base11"
          :class="{
            'text-base4': currentPage === 1,
            'hover:text-indigo': currentPage !== 1,
          }"
          @click="handlePrevClick"
        >
          <i class="inline-block i-ic-sharp-keyboard-arrow-left"></i>
        </a>
      </li>

      <p class="font-content text-sm text-base11">{{ currentPage }} / {{ pages }}</p>

      <li>
        <a
          class="rounded font-sans flex items-center justify-center cursor-pointer bg-transparent text-2xl text-base11"
          :class="{
            'text-base4': currentPage === pages,
            'hover:text-indigo': currentPage !== pages,
          }"
          @click="handleNextClick"
        >
          <i class="inline-block i-ic-sharp-keyboard-arrow-right"></i>
        </a>
      </li>
    </ul>
  </nav>
</template>
