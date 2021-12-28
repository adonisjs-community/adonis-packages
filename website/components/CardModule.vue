<template>
  <div class="relative flex flex-col group p-5 nuxt-card-border nuxt-card-bg nuxt-text-default rounded-lg transition-transform duration-150 ease-in-out transform">
    <a
      :href="mod.website"
      :aria-label="mod.website"
      target="_blank"
      rel="noopener"
      class="absolute inset-0"
    >
      <div
        class="transition-opacity duration-200 ease-in-out rounded-full opacity-0 group-hover:opacity-100 absolute top-3 right-3 cursor-pointer"
      >
        <UnoIcon
          class="i-carbon-arrow-up-right text-xl leading-none !block group-hover:text-primary-800 dark:group-hover:text-white"
        />
      </div>
    </a>

    <div class="flex items-start w-full h-20">
      <div
        class="relative border  bg-white border-gray-200 dark:bg-secondary-dark dark:border-secondary-dark w-20 h-20 rounded-lg flex flex-none items-center justify-center"
      >
        <!-- TODO: use <nuxt-img> -->
        <img
          v-if="!coverError && iconUrl(mod)"
          :src="iconUrl(mod)"
          :alt="mod.name"
          class="w-10 h-10 object-contain"
          width="40px"
          height="40px"
          @error="coverError = true"
        >
        <UnoIcon v-else :class="iconPlaceholder(mod)" class="text-4xl opacity-20" />
      </div>
      <div class="ml-6 w-full h-full">
        <h2
          class="flex text-lg font-semibold items-center dark:text-white h-9 line-2 leading-tight"
        >
          <span>{{ mod.name }}</span>
          <UnoIcon
            v-if="mod.type === 'official'"
            v-tooltip="{ content: 'Official',classes: tooltipClass }"
            class="i-carbon-badge text-yellow-600 text-lg ml-1 my-auto opacity-85"
          />
        </h2>
      </div>
    </div>

    <div class="h-20 mt-4">
      <p
        class="text-sky-dark dark:text-white dark:opacity-85 text-sm font-normal line-clamp-3 mt-2"
      >
        {{ mod.description }}
      </p>
    </div>

    <div class="flex w-full z-30 relative">
      <div class="flex flex-none">
        <a
          :href="mod.github"
          aria-label="stars"
          target=" _blank"
          rel="noopener"
          class="flex whitespace-nowrap w-full mr-4 text-sky-dark hover:text-primary dark:hover:text-primary-300 dark:text-white"
        >
          <UnoIcon class="mr-2 i-carbon-star" />
          <div class="text-sm leading-5 font-medium truncate">
            {{ numberFormat(mod.stars) }}
            <span
              class="hidden md:inline-block"
            >star{{ mod.stars !== 1 ? 's' : '' }}</span>
          </div>
        </a>
        <a
          :href="npmUrl(mod)"
          aria-label="npm"
          target=" _blank"
          rel="noopener"
          class="flex whitespace-nowrap w-full mr-4 text-sky-dark hover:text-primary dark:hover:text-primary-300 dark:text-white"
        >
          <UnoIcon class="mr-2 i-carbon-download" />
          <div
            class="text-sm leading-5 font-medium truncate"
          >{{ numberFormat(mod.downloads) }} installs</div>
        </a>
      </div>
      <div class="flex -space-x-3 hover:space-x-0 absolute right-0 -bottom-1 hover:bg-white  dark:hover:bg-secondary-darkest">
        <a
          v-for="contributor of mod.contributors.slice(0, 5).reverse()"
          :key="contributor.login"
          v-tooltip="{ content: contributor.name || contributor.login, classes: ['bg-primary', 'text-white', 'px-2', 'py-1', 'rounded', 'text-sm', 'mb-2'] }"
          :aria-label="contributor.name || contributor.login"
          :href="`https://github.com/${contributor.login}`"
          target="_blank"
          rel="noopener"
        >
          <!-- TODO: use <nuxt-img> -->
          <img
            class="w-7 h-7 flex rounded-full text-white border-4 border-white dark:border-primary-900"
            :src="'https://api.nuxtjs.org/api/ipx/s_44,f_webp/gh_avatar/' + contributor.login"
            :alt="contributor.name|| contributor.login"
            format="jpg"
            width="28"
            height="28"
          >
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModuleInfo, MaintainerInfo } from '~/../lib/types'
import { numberFormatter } from '~/utils/format'
import { CATEGORIES_ICONS } from '~/composables/constants'

defineProps<{ mod: ModuleInfo }>()

const coverError = ref(false)
const tooltipClass = 'bg-secondary-dark text-white px-2 py-1 m-1 rounded text-sm shadow'

function numberFormat (num: number, options = { precision: 1 }) {
  return numberFormatter(num, options)
}

function iconUrl ({ icon }: ModuleInfo) {
  if (icon) {
    return `/icons/${icon}`
  }
}

function iconPlaceholder ({ category }: ModuleInfo) {
  return CATEGORIES_ICONS[category] || 'i-carbon-circle-dash'
}

function npmUrl ({ npm }: ModuleInfo) {
  return `https://npmjs.com/package/${npm}`
}
</script>
