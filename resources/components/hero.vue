<script setup lang="ts">
import Button from '@/components/ui/button.vue'
</script>

<template>
  <div class="relative mb-14 py-24">
    <div class="hero w-full">
      <div
        class="relative flex flex-col items-center text-center p-container"
        md="text-left flex-row"
      >
        <div class="flex flex-1 flex-col space-y-6">
          <h1 class="text-6xl font-black" sm="text-7xl">
            Discover the best
            <br />
            <span class="text-primary">AdonisJS</span>
            packages
          </h1>

          <p class="leading-6 font-content">
            Discover our list of packages to supercharge your AdonisJS project.
            <br />
            Created by the AdonisJS team and community.
          </p>

          <div class="max-w-xl">
            <Button
              href="https://github.com/adonisjs-community/adonis-packages"
              as="a"
              theme="primary"
              left-icon="i-fa6-brands-github"
            >
              Contribute on GitHub
            </Button>
          </div>
        </div>

        <model-viewer
          alt="AdonisJS 3d logo"
          class="hidden h-110 flex-1"
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
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero::before {
  position: absolute;
  z-index: 0;
  content: '';
  top: -15%;
  bottom: 0%;
  height: 130%;
  width: 100%;
  pointer-events: none;
  background:
    url(@/assets/noise.webp) repeat,
    linear-gradient(83.21deg, #3245ff 0%, #bc52ee 100%);
  background-blend-mode: overlay;
  -webkit-mask-image: radial-gradient(rgba(0, 0, 0, 0.5), transparent 70%);
  mask-image: radial-gradient(rgba(0, 0, 0, 0.5), transparent 70%);
  opacity: 0.5;
}

model-viewer {
  --progress-bar-color: transparent;
}
</style>
