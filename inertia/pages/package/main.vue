<script setup lang="ts">
import 'highlight.js/styles/felipec.min.css'
import 'github-markdown-css/github-markdown-dark.css'

import { Motion } from 'motion-v'
import { Head } from '@inertiajs/vue3'

import Toc from './components/toc.vue'
import Layout from '@/layouts/default.vue'
import Links from './components/links.vue'
import Heading from './components/heading.vue'
import type { GetPackageResponse } from '@/app/types'
import BackgroundGradient from '@/components/background_gradient.vue'

const props = defineProps<GetPackageResponse>()
</script>

<template>
  <Layout>
    <Head :title="`${props.package.name} - AdonisJS Packages`" />

    <div class="pb-28 pt-6">
      <div class="relative z-10 p-container">
        <BackgroundGradient
          class="hidden md:block"
          variant="red"
          intensity="normal"
          :position="{ top: '00px', right: '-100px' }"
          :size="{ width: '600px', height: '600px' }"
          :opacity="0.4"
        />
        <BackgroundGradient
          variant="purple"
          intensity="normal"
          :position="{ top: '200px', right: '-400px' }"
          :size="{ width: '500px', height: '500px' }"
          :opacity="0.5"
        />

        <!-- Heading -->
        <Motion
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, ease: 'easeOut' }"
        >
          <Heading :package="package" />
        </Motion>

        <!-- Content Layout -->
        <div
          class="mt-6 flex z-20 flex-col-reverse lg:grid lg:grid-cols-[1fr_280px] lg:gap-6 relative"
        >
          <Motion
            :initial="{ opacity: 0, y: 30 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.7, delay: 0.2, ease: 'easeOut' }"
            class="overflow-hidden"
          >
            <div
              v-if="readme"
              class="bg-base3 overflow-hidden border border-base5 rounded p-6 overflow-hidden"
            >
              <article class="markdown-body max-w-none" v-html="readme"></article>
            </div>
            <div v-else class="bg-base3 border border-base5 rounded p-6">
              <div class="text-center py-12">
                <h3 class="text-2xl font-title text-white mb-4">README not found</h3>
                <p class="text-gray-400 max-w-2xl mx-auto text-sm mb-6">
                  No README could be found for this package. The repository link might be broken or
                  the branch may no longer exist. Feel free to open a PR to fix it.
                </p>
                <a
                  :href="`https://github.com/adonisjs-community/adonis-packages/blob/main/content/packages/${package.name}.yml`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <div class="i-tabler-external-link w-4 h-4"></div>
                  Fix package configuration
                </a>
              </div>
            </div>
          </Motion>

          <!-- Sidebar -->
          <aside class="mb-8 lg:mt-0 relative z-20">
            <div class="sticky top-25 space-y-6">
              <Motion
                :initial="{ opacity: 0, y: 20 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.6, delay: 0.4, ease: 'easeOut' }"
              >
                <Toc :markdown="readme" />
              </Motion>
              <Motion
                :initial="{ opacity: 0, y: 20 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.6, delay: 0.5, ease: 'easeOut' }"
              >
                <Links :package="package" />
              </Motion>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style lang="postcss">
.markdown-body {
  color: rgb(229 231 235);
  background-color: transparent;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply font-title text-white border-b border-white/10;
    margin-top: 2rem;
    margin-bottom: 1rem;
    scroll-margin-top: 5rem;
  }

  h1 {
    @apply text-3xl;
  }
  h2 {
    @apply text-2xl;
  }
  h3 {
    @apply text-xl;
  }

  p {
    margin-bottom: 1rem;
    line-height: 1.7;
    display: flex;
    gap: 0.25rem;
    align-items: center;
    flex-wrap: wrap;
  }

  ul,
  ol {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
    list-style-position: outside;
    list-style-type: disc;
  }

  pre {
    @apply rounded border border-base6 bg-base4 p-4 font-mono text-sm;
    overflow-x: auto;
    margin: 1.5rem 0;
  }

  code {
    @apply rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm overflow-hidden;
  }

  pre code {
    @apply bg-transparent p-0 overflow-hidden;
  }

  a {
    @apply text-blue-400 hover:text-blue-300 transition-colors;
  }

  blockquote {
    @apply border-l-4 border-blue-500/50 bg-blue-500/5 pl-4 py-2 my-4 italic;
  }

  table {
    @apply w-full border-collapse border border-white/10 my-4;
  }

  th,
  td {
    @apply border border-white/10 px-3 py-2 text-left;
  }

  th {
    @apply bg-white/5 font-semibold;
  }

  img {
    @apply rounded-lg border border-white/10 my-4;
    max-width: 100%;
    height: auto;
  }
}
</style>
