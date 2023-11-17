<script setup lang="ts">
import AdonisLogo from './icons/adonis_logo.vue'
import Socials from '@/components/socials.vue'
</script>

<template>
  <header class="border-b border-b-gray/10 backdrop-blur sticky top-0 z-10">
    <div class="p-container py-4 flex justify-between w-full items-center">
      <a href="http://adonisjs.com">
        <AdonisLogo />
      </a>

      <Socials />
    </div>
  </header>
</template>
