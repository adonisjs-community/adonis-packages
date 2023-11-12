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

      <div class="flex space-x-2 text-lg">
        <a href="https://twitter.com/adonisframework">
          <i class="inline-block i-fa6-brands-x-twitter text-white" />
        </a>
        <a href="https://github.com/adonisjs">
          <i class="inline-block i-fa6-brands-github text-white" />
        </a>
        <a href="https://discord.gg/vDcEjq6">
          <i class="inline-block i-fa6-brands-discord text-white" />
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
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
