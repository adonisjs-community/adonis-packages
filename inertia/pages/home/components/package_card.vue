<script setup lang="ts">
import { Link } from '@inertiajs/vue3'

import Tag from '@/components/tag.vue'
import type { PackageInfo } from '@/app/types'
import PackageLogo from '@/components/package_logo.vue'
import PackageStats from '@/components/package_stats.vue'

defineProps<{
  package: PackageInfo
}>()
</script>

<template>
  <div
    class="group relative overflow-hidden rounded bg-base3 border border-base5 transition-all h-full"
    hover="border-base7 bg-base3"
  >
    <Link class="relative block p-6 h-full flex flex-col" :href="`/packages/${package.slug}`">
      <!-- Header with category and logo -->
      <div class="flex items-start justify-between mb-2">
        <Tag data-testid="package-category" variant="accent">
          {{ package.category }}
        </Tag>
        <PackageLogo
          size="12"
          :package="package"
          class="transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
        />
      </div>

      <!-- Main content -->
      <div class="flex-1 flex flex-col justify-center space-y-0">
        <div class="flex items-center gap-3">
          <h3
            data-testid="package-name"
            class="text-2xl font-bold text-base12 line-clamp-1 transition-colors duration-300 group-hover:text-primary-500"
          >
            {{ package.name }}
          </h3>
          <i
            v-if="package.type === 'official'"
            v-tooltip="{ content: 'Official package', distance: 10 }"
            class="i-tabler:crown text-yellow-500 text-xl"
          />
        </div>

        <p
          class="text-base10 text-sm leading-relaxed line-clamp-2 transition-colors duration-300 group-hover:text-base11"
        >
          {{ package.description }}
        </p>
      </div>

      <div class="mt-4 pt-4 border-t border-base5 border-dashed">
        <PackageStats :package="package" />
      </div>
    </Link>
  </div>
</template>
