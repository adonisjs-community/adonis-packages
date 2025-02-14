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

    <div class="mb-8 bg-base1 py-12 pb-0">
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
              <a href="https://adonisjs.com/blog/" class="item">Newsletter</a>
              <a href="https://github.com/adonisjs/core/discussions" class="item">Discussions</a>
            </div>
            <div class="flex flex-col gap-y-2 text-sm font-content">
              <p class="mb-2 text-lg text-base12 font-title">Documentations</p>
              <a href="https://docs.adonisjs.com" class="item">AdonisJS</a>
              <a href="https://japa.dev/" class="item">Japa</a>
              <a href="https://lucid.adonisjs.com/" class="item">Lucid</a>
              <a href="https://edgejs.dev/docs/introduction" class="item">EdgeJS</a>
              <a href="https://vinejs.dev/docs/introduction" class="item">VineJS</a>
              <a href="https://bentocache.dev" class="item">Bentocache</a>
              <a href="https://verrou.dev" class="item">Verrou</a>
              <a href="https://flydrive.dev/docs/introduction" class="item">Flydrive</a>
            </div>
            <div class="flex flex-col gap-y-2 text-sm font-content">
              <p class="mb-2 text-lg text-base12 font-title">Others</p>
              <a href="https://adonisjs.com/blog/" class="item">Blog</a>
              <a href="https://adonisjs.com/about" class="item">About</a>
            </div>
          </div>

          <Socials />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer-separator {
  box-shadow: 0px 0px 10px 1px rgba(84, 104, 255, 0.1);
}

.item {
  transition: color 0.2s ease-in-out;
  @apply text-base11 text-sm hover:text-base12;
}
</style>
