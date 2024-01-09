<script setup lang="ts">
import Socials from '@/components/socials.vue'
</script>

<template>
  <div>
    <div class="flex items-center">
      <hr class="footer-separator h-0.2 flex-1 border-0 bg-primary/40" />
      <div class="relative w-12 flex items-center justify-center">
        <i
          class="i-custom-adonis-icon absolute inline-block text-5xl transition duration-500 ease-bounce"
          hover="rotate-360"
        />
      </div>
      <hr class="footer-separator h-0.2 flex-1 border-0 bg-primary/40" />
    </div>

    <div class="bg-base1 py-12 pb-0">
      <div class="p-container">
        <div
          class="flex flex-col items-center justify-between gap-y-8 text-center"
          md="flex-row items-start text-left"
        >
          <div class="flex flex-col gap-x-24 gap-y-8" md="flex-row">
            <div class="flex flex-col gap-y-2 text-sm font-content">
              <p class="mb-2 text-lg text-base12 font-title">General Resources</p>
              <a href="https://docs.adonisjs.com" class="item">Documentation</a>
              <a href="https://packages.adonisjs.com" class="item">Packages</a>
              <a href="https://buttondown.email/adonisjs" class="item">Newsletter</a>
              <a href="https://github.com/adonisjs/core/discussions" class="item">Discussions</a>
            </div>
            <div class="flex flex-col gap-y-2 text-sm font-content">
              <p class="mb-2 text-lg text-base12 font-title">Documentations</p>
              <a href="https://docs.adonisjs.com" class="item">AdonisJS</a>
              <a href="https://japa.dev/" class="item">Japa</a>
              <a href="https://edgejs.dev/docs/introduction" class="item">EdgeJS</a>
              <a href="https://vinejs.dev/docs/introduction" class="item">VineJS</a>
              <a href="https://bentocache.dev" class="item">Bentocache</a>
            </div>
            <div class="flex flex-col gap-y-2 text-sm font-content">
              <p class="mb-2 text-lg text-base12 font-title">Others</p>
              <a href="https://blog.adonisjs.com" class="item">Blog</a>
              <a href="https://about.adonisjs.com" class="item">About</a>
              <a href="https://support.adonisjs.com" class="item">Entreprise Support</a>
            </div>
          </div>

          <Socials />
        </div>
      </div>

      <p class="mt-8 py-2 pb-4 text-center text-xs text-base10 font-content">
        Created with
        <i
          class="i-fluent-emoji-sparkling-heart mx1 inline-block align-sub text-base text-red-500"
        />
        by
        <a href="https://twitter.com/julien_rpt" class="underline">Julien Ripouteau</a>
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
