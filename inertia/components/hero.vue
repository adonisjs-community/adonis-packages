<script setup lang="ts">
import Button from '@/components/ui/button.vue'
</script>

<template>
  <div class="relative md:mb-12 overflow-visible">
    <div class="absolute inset-0 grid-pattern" />

    <div class="relative p-container py-6">
      <div class="mx-auto">
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div class="flex flex-col justify-center gap-4">
            <div class="flex">
              <div
                class="inline-flex items-center rounded-full bg-yellow/10 border border-yellow/20 px-4 py-1 text-xs text-yellow"
              >
                <i class="i-tabler:sparkles text-yellow-300 mr-2" />
                New Design !
              </div>
            </div>

            <div class="">
              <h1 class="text-5xl font-semibold tracking-tight text-base12 lg:text-6xl xl:text-7xl">
                Discover the best
                <span
                  class="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent"
                >
                  AdonisJS
                </span>
                packages
              </h1>

              <p class="text-base mt-4 text-base11 leading-relaxed max-w-2xl">
                Supercharge your AdonisJS projects with curated packages from the official team and
                vibrant community.
              </p>
            </div>

            <div class="flex flex-col gap-4 sm:flex-row sm:items-center mt-4">
              <Button
                as="a"
                href="https://github.com/adonisjs-community/adonis-packages"
                theme="primary"
                left-icon="i-fa6-brands-github"
              >
                Contribute on GitHub
              </Button>
            </div>

            <!-- Stats -->
            <div class="flex items-center gap-8 pt-4">
              <div class="text-left">
                <div class="text-2xl font-bold text-base12">50+</div>
                <div class="text-xs text-base10">Packages</div>
              </div>
              <div class="text-left">
                <div class="text-2xl font-bold text-base12">500k+</div>
                <div class="text-xs text-base10">Downloads</div>
              </div>
              <div class="text-left">
                <div class="text-2xl font-bold text-base12">50+</div>
                <div class="text-xs text-base10">Contributors</div>
              </div>
            </div>
          </div>

          <!-- 3D Model -->
          <div class="relative flex justify-center">
            <div class="w-full">
              <!-- Glow effect -->
              <div
                class="absolute inset-0 rounded-full left-30 bg-gradient-to-r from-primary/10 to-yellow-500/10 blur-3xl scale-150"
              />

              <model-viewer
                alt="AdonisJS 3d logo"
                class="hidden h-110 flex-1 transition-opacity duration-4000 ease-in-out w-full"
                :class="{
                  'opacity-0': modelViewerScriptLoaded.value === false,
                  'opacity-100': modelViewerScriptLoaded.value === true,
                }"
                md="block"
                auto-rotate
                disable-zoom
                interaction-prompt="none"
                orientation="0deg 0deg 0deg"
                auto-rotate-delay="400"
                rotation-per-second="30deg"
                disable-pan
                src="/adonisjs.glb"
                camera-controls
                touch-action="pan-y"
                camera-orbit="30.24deg 95.94deg 18.36m"
                field-of-view="30deg"
                shadow-intensity="0.6"
                shadow-softness="1"
                tone-mapping="commerce"
                environment-image="neutral"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
model-viewer {
  --progress-bar-color: transparent;
}
</style>
