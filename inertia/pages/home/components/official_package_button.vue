<script setup lang="ts">
import { Motion, AnimatePresence } from 'motion-v'

const officialPackagesOnly = defineModel<boolean>()
</script>

<template>
  <button
    aria-label="Official packages"
    theme="primary"
    size="s"
    class="flex items-center justify-center rounded border border-base5 bg-base3 px-4 text-base transition-all space-x-2 text-sm transition duration-300"
    hover="bg-base4"
    :class="{
      'bg-base border-yellow-500/30': officialPackagesOnly,
    }"
    @click="officialPackagesOnly = !officialPackagesOnly"
  >
    <i class="i-tabler:crown inline-block text-yellow-500" />
    <AnimatePresence :initial="false">
      <Motion
        v-if="officialPackagesOnly"
        :initial="{ width: 0, opacity: 0 }"
        :animate="{ width: 'auto', opacity: 1 }"
        :exit="{ width: 0, opacity: 0 }"
        :transition="{ duration: 0.2, ease: 'easeInOut' }"
        class="overflow-hidden"
      >
        <p class="text-sm text-base11 whitespace-nowrap">Official packages</p>
      </Motion>
    </AnimatePresence>
  </button>
</template>
