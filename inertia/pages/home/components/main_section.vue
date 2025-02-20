<script setup lang="ts">
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
    v-auto-animate
    class="grid grid-cols-1 gap-5"
    :class="$attrs.class"
    md="grid-cols-1"
    lg="grid-cols-2"
    xl="grid-cols-3"
  >
    <PackageCard v-for="pkg in packages" :key="pkg.name" :package="pkg" />
  </section>
  <!-- Not found package section -->
  <div v-else class="h-96 flex flex-col items-center justify-center" :class="$attrs.class">
    <p class="text-2xl">No packages found !</p>
    <div class="mt-4 text-center text-base10">
      If you think a package is missing here,
      <br />
      please feel free to create a PR on the repository to add it !
    </div>
    <Button href="https://github.com/adonisjs-community/adonis-packages" class="mt-6" as="a" theme="primary" left-icon="i-fa6-brands-github">
      Contribute on GitHub
    </Button>
  </div>
</template>
@/app/types
