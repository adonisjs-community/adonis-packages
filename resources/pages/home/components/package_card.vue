<script setup lang="ts">
import { computed } from 'vue'
import { Link } from '@inertiajs/vue3'

import Tag from '@/components/tag.vue'
import type { PackageInfo } from '@/types'
import PackageLogo from '@/components/package_logo.vue'
import PackageStats from '@/components/package_stats.vue'
import AdonisIcon from '@/components/icons/adonis_icon.vue'

const props = defineProps<{
  package: PackageInfo
}>()

const isV6Compatible = computed(() => props.package.compatibility?.adonis.includes('^6'))
</script>

<template>
  <Link
    class="group card relative flex cursor-pointer gap-y-2 rounded-xl px-5 py-5"
    :href="`/packages/${package.slug}`"
    target="_blank"
  >
    <div class="w-full flex items-center justify-between">
      <div class="flex gap-2">
        <Tag data-testid="package-category">{{ package.category }}</Tag>
        <Tag v-if="isV6Compatible" class="bg-primary bg-opacity70">V6 support</Tag>
      </div>
      <i
        class="i-icon-park-outline-share inline-block text-xs text-base10 opacity-0 transition duration-500 hover:text-white group-hover:opacity-100"
      />
    </div>
    <PackageLogo size="12" :package="package" />

    <div class="flex flex-col gap-y-1">
      <div class="pointer-events-none absolute inset-0 m-1 overflow-hidden rounded-xl">
        <AdonisIcon
          v-if="package.type === 'official'"
          class="absolute top-2 scale-600 opacity-2 -right-2 -rotate-20"
        />
      </div>
      <div class="flex items-baseline gap-2">
        <p data-testid="package-name" class="line-clamp-1 text-2xl font-bold">
          {{ package.name }}
        </p>
        <i
          v-if="package.type === 'official'"
          v-tooltip="{ content: 'Official package', distance: 10 }"
          class="i-fluent-emoji-military-medal relative top-[2px] inline-block text-lg"
        />
      </div>
      <p class="line-clamp-2 text-sm text-base10">
        {{ package.description }}
      </p>
    </div>

    <PackageStats class="mt-4" :package="package" />
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
