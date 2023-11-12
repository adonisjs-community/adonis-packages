<template>
  <div class="flex flex-col min-h-full">
    <Header />
    <Hero />

    <div class="container mx-auto">
      <div class="grid grid-cols-[18em_1fr]">
        <Filters />
        <MainSection />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/header.vue'
import Hero from '@/components/hero.vue'
import Filters from '@/components/filters.vue'
import MainSection from '@/components/main_section.vue'
</script>

<style scoped>

</style>
