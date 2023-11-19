<script setup lang="ts">
import { millify } from 'millify'
import { Link } from '@inertiajs/vue3'
import type { PackageInfo } from '@/types'
import AdonisIcon from '@/components/icons/adonis_icon.vue'
import Tag from '@/components/tag.vue'
import PackageLogo from '@/components/package_logo.vue'

defineProps<{
  package: PackageInfo
}>()

function numberFormatter(num: number) {
  return millify(num || 0, { precision: 1 })
}
</script>

<template>
  <Link
    class="card relative flex rounded-xl gap-y-2 px-5 py-5 group cursor-pointer"
    :href="`/packages/${package.name}`"
    target="_blank"
  >
    <div class="flex items-center justify-between w-full">
      <Tag>{{ package.category }}</Tag>
      <i
        class="inline-block i-icon-park-outline-share text-xs text-base10 opacity-0 group-hover:opacity-100 transition duration-500 hover:text-white"
      />
    </div>
    <PackageLogo size="12" :package="package" />

    <div class="flex flex-col gap-y-1">
      <div class="absolute inset-0 overflow-hidden rounded-xl m-1 pointer-events-none">
        <AdonisIcon
          v-if="package.type === 'official'"
          class="absolute opacity-2 scale-600 top-2 -rotate-20 -right-2"
        />
      </div>
      <div class="flex items-baseline gap-2">
        <p class="text-2xl font-bold line-clamp-1">
          {{ package.name }}
        </p>
        <i
          v-if="package.type === 'official'"
          class="inline-block text-lg relative top-[2px] i-fluent-emoji-military-medal"
        />
      </div>
      <p class="text-base10 text-sm line-clamp-2">
        {{ package.description }}
      </p>
    </div>

    <div class="flex text-md text-base10 gap-6 mt-4">
      <a
        class="flex items-center gap-1.3 transition-colors duration-600 hover:text-white"
        :href="package.github"
        target="_blank"
      >
        <i class="inline-block i-fluent-emoji-star" />
        <span class="text-sm relative top-0.4">{{ package.stars }} stars</span>
      </a>

      <a
        class="flex items-center gap-1.3 transition-colors duration-600 hover:text-white"
        :href="`https://www.npmjs.com/package/${package.npm}`"
        target="_blank"
      >
        <i class="inline-block i-fluent-emoji-chart-increasing" />
        <span class="text-sm relative top-0.4">
          {{ numberFormatter(package.downloads) }} installs
        </span>
      </a>
    </div>
  </Link>
</template>

<style scoped lang="postcss">
.card {
  @apply bg-base2;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  transition: all 0.6s ease-in-out;
  border: 1px solid transparent;
}
</style>
