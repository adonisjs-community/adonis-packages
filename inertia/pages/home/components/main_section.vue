<script setup lang="ts">
import { motion } from 'motion-v'

import PackageCard from './package_card.vue'
import type { PackageInfo } from '@/app/types'
import Button from '@/components/ui/button.vue'

defineProps<{
  packages: PackageInfo[]
}>()

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <!-- Packages list -->
  <section
    v-if="packages.length > 0"
    class="grid grid-cols-1 gap-5"
    :class="$attrs.class"
    md="grid-cols-1"
    lg="grid-cols-2"
    xl="grid-cols-3"
  >
    <motion.div
      v-for="(pkg, index) in packages"
      :key="pkg.name"
      :initial="{ opacity: 0, x: 50, scale: 1 }"
      :animate="{
        x: 0,
        opacity: 1,
        transition: { duration: 0.3, ease: 'easeOut', delay: index * 0.05 },
      }"
      class="h-full"
    >
      <PackageCard :package="pkg" />
    </motion.div>
  </section>

  <!-- Not found package section -->
  <motion.div
    v-else
    class="h-96 flex flex-col items-center justify-center"
    :class="$attrs.class"
    :initial="{ opacity: 0, y: 30 }"
    :animate="{
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    }"
  >
    <p class="text-4xl font-semibold">No packages found !</p>
    <div class="mt-4 text-center text-base11 text-sm">
      If you think a package is missing here,
      <br />
      please feel free to create a PR on the repository to add it !
    </div>
    <Button
      href="https://github.com/adonisjs-community/adonis-packages"
      class="mt-6"
      as="a"
      theme="primary"
      left-icon="i-fa6-brands-github"
    >
      Contribute on GitHub
    </Button>
  </motion.div>
</template>
