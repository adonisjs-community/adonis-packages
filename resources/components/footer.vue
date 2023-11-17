<script setup lang="ts">
import Socials from '@/components/socials.vue'
</script>

<template>
  <div>
    <div class="flex items-center">
      <hr class="flex-1 border-0 bg-primary h-0.2 footer-separator" />
      <div class="relative w-15 flex items-center justify-center">
        <i class="absolute inline-block text-7xl i-custom-adonis-icon" />
      </div>
      <hr class="flex-1 border-0 bg-primary h-0.2 footer-separator" />
    </div>

    <div class="bg-[#1C1C1C] py-12">
      <div class="container mx-auto">
        <div class="flex justify-between">
          <div class="flex gap-x-24">
            <div class="flex flex-col font-sans text-sm gap-y-1">
              <p class="text-white text-lg font-title mb-2">General Resources</p>
              <a class="text-white-300">Documentation</a>
              <a class="text-white-300">Packages</a>
              <a class="text-white-300">Newsletter</a>
              <a class="text-white-300">VSCode Extensions</a>
            </div>
            <div class="flex flex-col font-sans text-sm gap-y-1">
              <p class="text-white text-lg font-title mb-2">General Resources</p>
              <p class="text-white-300">Documentation</p>
              <p class="text-white-300">Packages</p>
              <p class="text-white-300">Newsletter</p>
              <p class="text-white-300">VSCode Extensions</p>
            </div>
            <div class="flex flex-col font-sans text-sm gap-y-1">
              <p class="text-white text-lg font-title mb-2">General Resources</p>
              <p class="text-white-300">Documentation</p>
              <p class="text-white-300">Packages</p>
              <p class="text-white-300">Newsletter</p>
              <p class="text-white-300">VSCode Extensions</p>
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
  box-shadow: 0px 0px 10px 1px rgba(84, 104, 255, 0.4);
}
</style>
