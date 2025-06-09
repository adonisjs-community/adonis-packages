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

const props = defineProps<GetPackageResponse>()
</script>

<template>
  <Layout>
    <Head :title="`${props.package.name} - AdonisJS Packages`" />

    <div class="pb-28 pt-6 relative">
      <div class="pointer-events-none absolute inset-0">
        <div class="gradient-splash-1"></div>
        <div class="gradient-splash-2"></div>
        <div class="gradient-splash-3"></div>
      </div>

      <div class="z-1 relative p-container">
        <!-- Heading -->
        <Motion
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, ease: 'easeOut' }"
        >
          <Heading :package="package" />
        </Motion>

        <!-- Content Layout -->
        <div class="mt-6 flex flex-col-reverse lg:grid lg:grid-cols-[1fr_280px] lg:gap-6">
          <Motion
            :initial="{ opacity: 0, y: 30 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.7, delay: 0.2, ease: 'easeOut' }"
            class="overflow-hidden"
          >
            <div class="bg-base3 overflow-hidden border border-base5 rounded p-6 overflow-hidden">
              <article class="markdown-body max-w-none" v-html="readme"></article>
            </div>
          </Motion>

          <!-- Sidebar -->
          <Motion
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, delay: 0.4, ease: 'easeOut' }"
          >
            <aside class="mb-8 lg:mt-0">
              <div class="sticky top-25 space-y-6">
                <Toc :markdown="readme" />
                <Links :package="package" />
              </div>
            </aside>
          </Motion>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style lang="postcss">
.gradient-splash-1 {
  position: absolute;
  top: -200px;
  right: -100px;
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    rgba(50, 69, 255, 0.15) 0%,
    rgba(188, 82, 238, 0.1) 50%,
    transparent 70%
  );
  border-radius: 50%;
  filter: blur(80px);
}

.gradient-splash-2 {
  position: absolute;
  top: 400px;
  left: -200px;
  width: 800px;
  height: 800px;
  background: radial-gradient(
    circle,
    rgba(6, 182, 212, 0.12) 0%,
    rgba(59, 130, 246, 0.08) 50%,
    transparent 70%
  );
  border-radius: 50%;
  filter: blur(100px);
}

.gradient-splash-3 {
  position: absolute;
  top: 200px;
  right: -150px;
  width: 500px;
  height: 500px;
  background: radial-gradient(
    circle,
    rgba(239, 68, 68, 0.15) 0%,
    rgba(220, 38, 38, 0.1) 50%,
    transparent 70%
  );
  border-radius: 50%;
  filter: blur(70px);
}

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
