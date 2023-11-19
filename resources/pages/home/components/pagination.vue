<script setup lang="ts">
defineProps<{
  pages: number
  currentPage: number
  total: number
}>()

defineEmits(['update:currentPage'])
</script>

<template>
  <nav v-if="pages" aria-label="Page navigation example">
    <ul class="list-style-none flex items-center gap-1">
      <li>
        <a
          class="rounded font-sans cursor-pointer bg-transparent px-2 py-1.5 text-sm text-white transition-all duration-300 hover:bg-primary"
          aria-label="Previous"
          @click="$emit('update:currentPage', 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-for="page in pages" :key="page">
        <a
          class="rounded font-sans cursor-pointer px-2 py-1.5 text-xs text-white-400 transition-all duration-300 hover:bg-primary/50"
          :class="{
            '!text-white !bg-primary': page === currentPage,
          }"
          @click="$emit('update:currentPage', page)"
        >
          {{ page }}
        </a>
      </li>

      <li>
        <a
          class="rounded font-sans cursor-pointer bg-transparent px-2 py-1.5 text-sm text-white transition-all duration-300 hover:bg-primary"
          @click="$emit('update:currentPage', pages)"
          ><span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
