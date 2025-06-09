<script setup lang="ts">
import Socials from '@/components/socials.vue'
</script>

<template>
  <div class="p-container mb-4 footer">
    <div class="flex flex-col gap-5">
      <div class="grid grid-cols-1 gap-8" md="grid-cols-4">
        <div class="bg-base2 rounded p-4 border border-base3 group">
          <div class="h-full flex flex-col justify-between">
            <div class="space-y-4">
              <div>
                <h3 class="mb-3 flex items-center gap-2 border-b border-base4 border-dashed pb-3">
                  <div
                    class="p-1 flex items-center justify-center rounded border border-primary/30"
                  >
                    <i class="i-tabler-book-2 text-xs text-base11"></i>
                  </div>
                  <span class="text-sm font-semibold text-base12">Resources</span>
                </h3>
                <div class="flex flex-col text-[0.8rem] text-base11 gap-2">
                  <a href="https://docs.adonisjs.com">• Documentation</a>
                  <a href="https://adonisjs.com/blog/">• Newsletter</a>
                  <a href="https://github.com/adonisjs/core/discussions">• Discussions</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-base2 rounded p-4 border border-base3 group" md="col-span-2">
          <div class="h-full flex flex-col justify-between">
            <div class="space-y-4">
              <div>
                <h3 class="mb-3 flex items-center gap-2 border-b border-base4 border-dashed pb-3">
                  <div
                    class="p-1 flex items-center justify-center rounded border border-primary/30"
                  >
                    <i class="i-tabler-network text-xs text-base11"></i>
                  </div>
                  <span class="text-sm font-semibold text-base12">Ecosystem</span>
                </h3>
                <div class="grid grid-cols-3 gap-x-6 gap-y-2 text-[0.8rem] text-base11">
                  <a href="https://docs.adonisjs.com">• AdonisJS</a>
                  <a href="https://japa.dev/">• Japa</a>
                  <a href="https://lucid.adonisjs.com/">• Lucid</a>
                  <a href="https://edgejs.dev/docs/introduction">• EdgeJS</a>
                  <a href="https://vinejs.dev/docs/introduction">• VineJS</a>
                  <a href="https://bentocache.dev">• Bentocache</a>
                  <a href="https://verrou.dev">• Verrou</a>
                  <a href="https://flydrive.dev/docs/introduction">• Flydrive</a>
                  <a href="https://tuyau.julr.dev/">• Tuyau</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-base2 rounded p-4 pb-0 border border-base3 pt-4 border group">
          <div class="h-full flex flex-col justify-between">
            <div class="space-y-4">
              <div>
                <h3 class="mb-3 flex items-center gap-2 border-b border-base4 border-dashed pb-3">
                  <div
                    class="p-1 flex items-center justify-center rounded border border-primary/30"
                  >
                    <i class="i-tabler-plus text-xs text-base11"></i>
                  </div>
                  <span class="text-sm font-semibold text-base12">More</span>
                </h3>
                <div class="flex flex-col text-[0.8rem] text-base11 gap-2">
                  <a href="https://adonisjs.com/blog/">• Blog</a>
                  <a href="https://adonisjs.com/about">• About</a>
                </div>
              </div>

              <div
                class="py-3 border-t border-base4 border-dashed flex justify-between items-center"
              >
                <p class="text-xs text-base10">Connect with us</p>
                <Socials />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-base2 text-xs p-3 rounded border border-base3 text-base11">
        <div class="flex flex-col items-center justify-between gap-4" sm="flex-row gap-2">
          <div class="flex items-center gap-1">
            <span>©</span>
            <span>{{ new Date().getFullYear() }}</span>
            <span>AdonisJS</span>
            <span>•</span>
            <span>Made with</span>
            <i class="i-tabler-heart text-red-500"></i>
            <span>by the community</span>
          </div>
          <div class="flex items-center gap-2">
            <i class="i-custom-adonis-icon text-xs text-primary"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.footer a {
  @apply text-base11 hover:text-base-12 transition-colors duration-500;
}
</style>
