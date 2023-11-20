<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useEventListener } from '@vueuse/core'

type TocElement = { id: string; level: number; textContent: string | null }

const props = defineProps<{ markdown: string }>()
const elements = ref<TocElement[]>([])
const activeSections = ref<string>()

watchEffect(() => parseMarkdown())
useEventListener('scroll', handleScroll)

/**
 * Handle scroll event and set active section
 */
function handleScroll() {
  const sections = elements.value.map((element) => document.querySelector(`#${element.id}`))
  activeSections.value = undefined

  for (const section of sections) {
    const rect = section!.getBoundingClientRect()
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
      activeSections.value = section!.id
      break
    }
  }
}

/**
 * Parse the markdown and extract the headings
 */
function parseMarkdown() {
  const parser = new DOMParser()
  const doc = parser.parseFromString(props.markdown, 'text/html')
  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')

  elements.value = [...headings].flatMap(({ id, textContent, tagName }) => {
    const level = Number.parseInt(tagName[1])
    if (level > 2) return []
    if (!id.trim()) return []

    return { id, level, textContent }
  })
}

/**
 * Go to the section when clicked on the TOC
 * We add some offset to the scroll position, so that the header
 * does not overlap the section
 */
function onTocClick(id: string) {
  const element = document.querySelector(`#${id}`)

  const elementPosition = element!.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.scrollY - 90

  window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
}
</script>

<template>
  <div>
    <p class="mb-2 text-lg font-bold">Table of contents</p>
    <div v-for="element in elements" :key="element.id" class="flex flex-col gap-12 font-content">
      <a
        :href="`#${element.id}`"
        class="block py-1 text-sm text-base10 transition duration-300 hover:text-white"
        :class="{
          'ml-2': element.level === 2,
          'ml-4': element.level === 3,
          'ml-6': element.level === 4,
          'text-indigo': activeSections === element.id,
        }"
        @click.prevent="onTocClick(element.id)"
      >
        {{ element.textContent }}
      </a>
    </div>
  </div>
</template>

<style scoped></style>
