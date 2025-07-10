<script setup lang="ts">
import { ref } from 'vue'
import { Motion, AnimatePresence } from 'motion-v'

defineProps<{
  title: string
  defaultCollapsed?: boolean
}>()

const isCollapsed = ref(false)
function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <div class="rounded border bg-base3 border border-base5 p-4">
    <button
      class="flex items-center justify-between w-full text-left hover:text-white transition-colors"
      @click="toggleCollapse"
    >
      <p>{{ title }}</p>
      <i
        class="inline-block i-tabler:chevron-down text-base11 transition-transform duration-300"
        :class="{ 'rotate-180': isCollapsed }"
      />
    </button>

    <AnimatePresence>
      <Motion
        v-if="!isCollapsed"
        :initial="{ height: 0, opacity: 0 }"
        :animate="{ height: 'auto', opacity: 1 }"
        :exit="{ height: 0, opacity: 0 }"
        :transition="{ duration: 0.3, ease: 'easeInOut' }"
        style="overflow: hidden"
      >
        <div class="mt-2 border-t border-base5 border-dashed pt-2">
          <slot />
        </div>
      </Motion>
    </AnimatePresence>
  </div>
</template>

<style scoped></style>
