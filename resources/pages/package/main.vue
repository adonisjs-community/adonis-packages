<script setup lang="ts">
import 'highlight.js/styles/felipec.min.css'
import 'github-markdown-css/github-markdown-dark.css'
import { Head } from '@inertiajs/vue3'
import Toc from './components/toc.vue'
import type { GetPackageResponse } from '@/types'

import Layout from '@/layouts/default.vue'
import PackageLogo from '@/components/package_logo.vue'

const props = defineProps<GetPackageResponse>()
</script>

<template>
  <Layout>
    <Head :title="`AdonisJS packages - ${props.package.name}`" />

    <div class="pb-28 pt-12">
      <div class="overflow-hidden absolute inset-0">
        <span class="bg-gradient"></span>
      </div>

      <div class="p-container z-1">
        <!-- Heading -->
        <div class="text-left flex flex-col">
          <div class="flex items-center gap-6">
            <PackageLogo size="16" :package="package" />
            <h1 class="text-5xl font-bold relative top-2">{{ package.name }}</h1>
          </div>
          <span class="text-base mt-2 font-content text-white-400">
            {{ package.description }}
          </span>
          <hr class="my-7 border-b-1 border-t-0 border-white/6" />
        </div>

        <!-- Readme & Toc -->
        <div class="grid grid-cols-[1fr_18em] gap-24 relative">
          <section class="markdown-body" v-html="readme"></section>
          <Toc :markdown="readme" />
        </div>
      </div>
    </div>
  </Layout>
</template>

<style lang="postcss">
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
