<script setup lang="ts">
import type { PackageInfo } from '@/app/types'
import SideCard from '@/pages/package/components/side_card.vue'

defineProps<{
  package: PackageInfo
}>()
</script>

<template>
  <SideCard title="Links">
    <div class="flex flex-col">
      <a
        class="flex items-center gap-2 py-1 text-sm text-base11 transition duration-300 hover:text-base12"
        :href="package.github"
      >
        <i class="i-jam-github inline-block" />
        <span>Check repository</span>
      </a>
      <a
        v-if="package.npm"
        class="flex items-center gap-2 py-1 text-sm text-base11 transition duration-300 hover:text-base12"
        :href="`https://www.npmjs.com/package/${package.npm}`"
      >
        <i class="i-mdi-npm-variant-outline inline-block" />
        <span>Npm package</span>
      </a>
      <a
        v-if="package.website"
        class="flex items-center gap-2 py-1 text-sm text-base11 transition duration-300 hover:text-base12"
        :href="package.website"
      >
        <i class="i-jam-arrow-square-up-right inline-block" />
        <span>See website</span>
      </a>
    </div>
  </SideCard>
</template>

<style scoped></style>
