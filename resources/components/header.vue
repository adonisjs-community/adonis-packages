<template>
  <header class="border-b border-b-[#454545] backdrop-blur-[6px] sticky top-0 z-10">
    <div class="container mx-auto py-4 flex justify-between w-full items-center">
      <span>
        <img src="@/assets/adonis_logo.svg" alt="Adonis Logo" class="w-[7.1875rem]" />
      </span>

      <!-- <nav class="text-white">
        <a class="text-white no-underline font-light" v-for="link in links" :key="link.href" :href="link.href">
          {{ link.text }}
        </a>
      </nav> -->

      <Socials />
    </div>
  </header>
</template>

<script setup lang="ts">
import Socials from '@/components/socials.vue'

const links = [
  {
    href: 'https://docs.adonisjs.com/',
    text: 'Documentation'
  },
  {
    href: 'https://adonisjs.com/blog',
    text: 'Blog'
  },
  {
    href: '',
    text: 'Community'
  }
]
</script>
