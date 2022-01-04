<template>
  <div class="flex items-center gap-4 justify-between w-full container mx-auto px-4 py-2 h-16">
    <slot name="head" />
    <div class="flex" :class="isSearchOpen ? 'hidden': ''">
      <a href="/" class="inline-flex text-2xl">
        <IconAdonisLogo alt="AdonisJS logo" width="120" />
      </a>
    </div>
    <div class="flex shadow-sm w-full max-w-xl flex-auto">
      <label class="relative flex-1" :class="isSearchOpen ? 'flex' : 'hidden md:flex'">
        <input
          ref="searchEl"
          v-model="searchModel"
          type="search"
          aria-label="Search"
          class="block bg-gray-200/40 dark:bg-secondary-dark/50 w-full py-1 px-3 h-10 text-base leading-6 placeholder-white dark:placeholder-white transition duration-150 ease-in-out appearance-none md:pr-10 rounded-lg focus:ring-3 focus:ring-primary-700  focus:ring-opacity-50 focus:outline-none focus:placeholder-gray-300 sm:flex-1"
          placeholder="Search a package (name, category, username, etc.)"
        >
        <span
          class="absolute hidden px-2 text-gray opacity-50 bg-gray-200 dark:bg-secondary-dark rounded-md md:inline-block text-md top-2 bottom-2 right-2"
        >/</span>
      </label>
    </div>
    <button
      aria-label="Search"
      class="block md:hidden !outline-none text-xl h-1.2em my-auto"
      @click="toggleSearch()"
    >
      <UnoIcon class="i-carbon-search text-white" />
    </button>
    <button aria-label="Toggle theme" class="!outline-none text-xl h-1.2em my-auto" @click="toggleDarkMode()">
      <ColorScheme placeholder="..." tag="span">
        <UnoIcon v-if="$colorMode.preference === 'system'" class="text-white i-carbon-laptop" />
        <UnoIcon v-else-if="$colorMode.value === 'dark'" class="text-white i-carbon-moon" />
        <UnoIcon v-else class="text-white i-carbon-sun" />
      </ColorScheme>
    </button>
    <slot name="tail" />
  </div>
</template>

<script setup lang="ts">
import { isMobile } from '~/utils/detectUserAgent'

const props = defineProps<{ search: string }>()
const emit = defineEmits<{(e: 'update:search', v: string): void }>()

const searchEl = ref<HTMLInputElement>()
const searchModel = computed<string>({
  get () {
    return props.search
  },
  set (v) {
    emit('update:search', v)
  }
})

const isSearchOpen = ref(false)

const toggleNext = {
  system: 'dark', // TODO
  dark: 'light',
  light: 'dark'
}

async function toggleSearch () {
  isSearchOpen.value = !isSearchOpen.value

  if (isSearchOpen.value) {
    await nextTick()
    focusSearchInput()
  }
}

function focusSearchInput () {
  searchEl.value?.focus()
}

const vm = getCurrentInstance().proxy
function toggleDarkMode () {
  vm.$colorMode.preference = toggleNext[vm.$colorMode.preference] || 'system'
}

onMounted(() => {
  useEventListener('keypress', (event) => {
    // Add `/` shortcut for search input only if not already focused
    if (event.key === '/' && !(event.target instanceof HTMLInputElement)) {
      event.preventDefault()
      focusSearchInput()
    }
  })

  // In case of desktop, auto focus the search input
  if (!isMobile()) {
    focusSearchInput()
  }
})
</script>
