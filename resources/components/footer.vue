<script setup lang="ts">
import Socials from '@/components/socials.vue'
</script>

<template>
  <div>
    <div class="flex items-center">
      <hr class="flex-1 border-0 bg-primary/40 h-0.2 footer-separator" />
      <div class="relative w-12 flex items-center justify-center">
        <i
          class="absolute inline-block text-5xl i-custom-adonis-icon transition duration-1500 ease-in-out"
          hover="rotate-360"
        />
      </div>
      <hr class="flex-1 border-0 bg-primary/40 h-0.2 footer-separator" />
    </div>

    <div class="bg-base1 py-12 pb-0">
      <div class="p-container">
        <div
          class="flex flex-col justify-between items-center text-center gap-y-8"
          md="flex-row items-start text-left"
        >
          <div class="flex flex-col gap-x-24 gap-y-8" md="flex-row">
            <div class="flex flex-col font-content text-sm gap-y-2">
              <p class="text-base12 text-lg font-title mb-2">General Resources</p>
              <a href="https://docs.adonisjs.com" class="item">Documentation</a>
              <a href="https://packages.adonisjs.com" class="item">Packages</a>
              <a href="https://buttondown.email/adonisjs" class="item">Newsletter</a>
              <a href="https://github.com/adonisjs/core/discussions" class="item"> Discussions </a>
            </div>
            <div class="flex flex-col font-content text-sm gap-y-2">
              <p class="text-base12 text-lg font-title mb-2">Documentations</p>
              <a href="https://docs.adonisjs.com" class="item">AdonisJS</a>
              <a href="https://japa.dev/" class="item">Japa</a>
              <a href="https://edgejs.dev/docs/introduction" class="item">EdgeJS</a>
              <a href="https://vinejs.dev/docs/introduction" class="item"> VineJS </a>
              <a href="https://bentocache.julr.dev" class="item"> BentoCache </a>
            </div>
            <div class="flex flex-col font-content text-sm gap-y-2">
              <p class="text-base12 text-lg font-title mb-2">Others</p>
              <a href="https://blog.adonisjs.com" class="item">Blog</a>
              <a href="https://about.adonisjs.com" class="item">About</a>
              <a href="https://support.adonisjs.com" class="item">Entreprise Support</a>
            </div>
          </div>

          <Socials />
        </div>
      </div>

      <p class="text-center font-content text-base10 text-xs mt-8 py-2 pb-4">
        Created with
        <i
          class="inline-block text-base mx1 align-sub i-fluent-emoji-sparkling-heart text-red-500"
        />
        by
        <a href="https://twitter.com/julien_rpt" class="underline"> Julien Ripouteau </a>
      </p>
    </div>
  </div>
</template>

<style scoped>
.footer-separator {
  box-shadow: 0px 0px 10px 1px rgba(84, 104, 255, 0.1);
}

.item {
  transition: color 0.2s ease-in-out;
  @apply text-base10 text-sm hover:text-base12;
}
</style>
