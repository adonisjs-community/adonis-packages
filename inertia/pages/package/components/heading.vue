<script setup lang="ts">
import Tag from '@/components/tag.vue'
import type { PackageInfo } from '@/app/types'
import PackageLogo from '@/components/package_logo.vue'
import PackageStats from '@/components/package_stats.vue'

defineProps<{
  package: PackageInfo
}>()

function goBack() {
  window.history.back()
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>

<template>
  <div class="flex flex-col text-left">
    <!-- Back button -->
    <button
      class="mb-4 flex items-center gap-2 text-sm text-base10 transition duration-300 hover:text-base12 w-fit"
      @click="goBack"
    >
      <i class="i-jam-arrow-left inline-block" />
      <span>Back to packages</span>
    </button>

    <div class="flex flex-col items-start text-left space-y-4">
      <div class="flex items-center gap-4 min-w-0">
        <PackageLogo class="flex-shrink-0 flex" :package="package" />
        <div class="flex flex-col min-w-0 flex-1">
          <div class="flex flex-wrap items-start gap-3 mb-1">
            <h1 class="text-4xl font-bold min-w-0 flex-shrink">{{ package.name }}</h1>
            <Tag :variant="package.type === 'official' ? 'green' : 'blue'" class="flex-shrink-0">
              {{ package.type === 'official' ? 'Official' : '3rd Party' }}
            </Tag>
          </div>

          <div
            v-if="package.keywords && package.keywords.length"
            class="flex items-center gap-1 mt-2 flex-wrap"
          >
            <span
              v-for="keyword in package.keywords.slice(0, 5)"
              :key="keyword"
              class="px-1.5 py-0.5 bg-base4 border border-base6 text-base11 rounded text-xs"
            >
              {{ keyword }}
            </span>
            <span v-if="package.keywords.length > 5" class="text-xs text-base10">
              +{{ package.keywords.length - 5 }} more
            </span>
          </div>
        </div>
      </div>

      <!-- Description -->
      <span class="text-lg text-base11 font-content max-w-2xl">
        {{ package.description }}
      </span>

      <!-- Meta info -->
      <div class="flex items-center gap-3 flex-wrap">
        <Tag variant="default">
          {{ package.category }}
        </Tag>

        <div class="flex items-center gap-3 text-sm text-base10">
          <span v-if="package.firstReleaseAt" class="flex items-center gap-1">
            <i class="i-jam-calendar inline-block text-xs" />
            Created {{ formatDate(package.firstReleaseAt) }}
          </span>
          <span v-if="package.lastReleaseAt" class="flex items-center gap-1">
            <i class="i-jam-refresh inline-block text-xs" />
            Updated {{ formatDate(package.lastReleaseAt) }}
          </span>
        </div>
      </div>

      <!-- Stats and actions -->
      <div class="flex items-center justify-between w-full flex-wrap gap-3">
        <PackageStats :package="package" />

        <a
          :href="package.github"
          target="_blank"
          class="flex items-center gap-2 px-4 py-2 bg-base3 border border-base5 rounded hover:bg-base4 transition-colors text-sm font-medium"
        >
          <i class="i-jam-github inline-block" />
          View on GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
