<script setup lang="ts">
import { computed } from 'vue'
import { Link } from '@inertiajs/vue3'

import Tag from '@/components/tag.vue'
import type { PackageInfo } from '@/app/types'
import PackageLogo from '@/components/package_logo.vue'
import PackageStats from '@/components/package_stats.vue'
import AdonisIcon from '@/components/icons/adonis_icon.vue'

const props = defineProps<{
  package: PackageInfo
}>()

const isV6Compatible = computed(() => props.package.compatibility?.adonis.includes('^6'))
</script>

<template>
  <div class="group card gap-y-3 relative h-66 py-5 flex rounded-xl">
    <div class="w-full flex grow-0 items-center cursor-default px-5">
      <div class="flex gap-2">
        <Tag data-testid="package-category">{{ package.category }}</Tag>
        <Tag v-if="isV6Compatible" class="bg-primary bg-opacity70">V6 support</Tag>
      </div>
    </div>
    <Link
      class="flex flex-col grow gap-y-2 content-around w-full px-5"
      :href="`/packages/${package.slug}`"
    >
      <PackageLogo class="mt-3" size="12" :package="package" />

      <div class="flex flex-col gap-y-1">
        <div class="pointer-events-none absolute inset-0 m-1 overflow-hidden rounded-xl">
          <AdonisIcon
            v-if="package.type === 'official'"
            class="absolute top-3 scale-600 opacity-2 -right-2 -rotate-20"
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
        <p class="line-clamp-2 text-sm text-base10 mb-4">
          {{ package.description }}
        </p>
      </div>
    </Link>
    <PackageStats class="place-self-start justify-self-end px-5" :package="package" />
  </div>
</template>

<style scoped lang="postcss">
.card {
  @apply bg-base2;
  /*transition: all 0.6s ease-in-out;*/
  border: 1px solid transparent;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
</style>
@/app/types
