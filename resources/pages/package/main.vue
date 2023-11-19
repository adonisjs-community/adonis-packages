<script setup lang="ts">
import 'highlight.js/styles/felipec.min.css'
import 'github-markdown-css/github-markdown-dark.css'
import { Head } from '@inertiajs/vue3'
import Toc from './components/toc.vue'
import Links from './components/links.vue'
import Heading from './components/heading.vue'
import type { GetPackageResponse } from '@/types'

import Layout from '@/layouts/default.vue'

const props = defineProps<GetPackageResponse>()
</script>

<template>
  <Layout>
    <Head :title="`AdonisJS packages - ${props.package.name}`" />

    <div class="pb-28 pt-6" md="pt-12">
      <div class="overflow-hidden absolute inset-0">
        <span class="bg-gradient"></span>
      </div>

      <div class="p-container z-1">
        <!-- Heading -->
        <Heading :package="package" />

        <!-- Readme & Toc -->
        <div class="relative flex flex-col-reverse gap-12" md="grid grid-cols-[1fr_18em] gap-24">
          <section class="markdown-body" v-html="readme"></section>
          <div class="overflow-auto z-13 toc" md="sticky top-90px">
            <div md="border-l border-white/6 pl-6 pr-4">
              <Toc :markdown="readme" />
              <Links class="mt-4" :package="package" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style lang="postcss">
.toc {
  max-height: calc(100vh - 90px);
  height: fit-content;
}

.bg-gradient::before {
  position: absolute;
  z-index: 0;
  content: '';
  top: -403px;
  bottom: 0%;
  left: 150px;
  height: 1250px;
  width: 100%;
  pointer-events: none;
  background:
    url(@/assets/noise.webp) repeat,
    linear-gradient(83.21deg, #3245ff 0%, #bc52ee 100%);
  background-blend-mode: overlay;
  -webkit-mask-image: radial-gradient(rgba(0, 0, 0, 0.5), transparent 70%);
  mask-image: radial-gradient(rgba(0, 0, 0, 0.5), transparent 70%);
  opacity: 0.5;
}

.bg-mask {
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 1) 620px);
  mask-image: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 1) 8%);
}

.bg-topography {
  background-size: 620px;
  background-image: url('@/assets/topography.svg');
}

.markdown-body {
  background-color: transparent;

  h1,
  h2,
  h3 {
    @apply font-title;
    @apply border-white/6;
  }

  ul,
  ol {
    list-style: disc !important;
    padding-left: 2em;
  }

  pre {
    background-color: #171717 !important;
    @apply font-mono font-bold;
  }

  a,
  img {
    display: inline-block;
  }

  img {
    background-color: transparent;
  }
}
</style>
