<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import type { PackageInfo } from '@/types'

import Hero from '@/components/hero.vue'
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import Filters from '@/components/filters.vue'
import MainSection from '@/components/main_section.vue'

defineProps<{
  packages: PackageInfo[]
}>()
</script>

<template>
  <div class="flex flex-col min-h-full">
    <Head title="AdonisJS packages" />

    <Header />
    <Hero />

    <div class="container mx-auto">
      <div class="grid grid-cols-[18em_1fr] gap-24">
        <Filters />
        <MainSection :packages="packages" />
      </div>
    </div>

    <Footer class="mt-28" />
  </div>
</template>

<style scoped></style>
