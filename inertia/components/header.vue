<script setup lang="ts">
import { Link } from '@inertiajs/vue3'

import Socials from '@/components/socials.vue'
import AdonisLogo from './icons/adonis_logo.vue'
</script>

<template>
  <header class="sticky top-0 z-20 border-b border-b-gray/10 border-dashed backdrop-blur-lg">
    <div class="w-full flex items-center justify-between py-4 p-container">
      <Link href="/" :preserve-scroll="true" :preserve-state="true" aria-label="Homepage">
        <AdonisLogo />
      </Link>

      <Socials />
    </div>
  </header>
</template>
