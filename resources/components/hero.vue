<template>
  <div class="relative py-32 mt-12">
    <div class="hero w-full">
      <div class="container mx-auto flex relative items-center">
        <div class="flex flex-col space-y-6 flex-1">
          <h1 class="text-7xl font-black">
            Discover the best<br/>
            <span class="text-primary">AdonisJS</span> packages
          </h1>

          <p class="font-content leading-7">
            Discover our list of packages to supercharge your AdonisJS project.<br/>
            Created by the AdonisJS team and community.
          </p>

          <div class="max-w-xl">
            <Button as="a" theme="primary" left-icon="i-fa6-brands-github">
              Contribute on github
            </Button>
          </div>
        </div>

        <model-viewer alt="AdonisJS 3d logo"
          class="flex-1 h-110"
          auto-rotate
          disable-zoom
          orientation="0deg 0deg 0deg"
          auto-rotate-delay="400"
          rotation-per-second="30deg"
          disable-pan
          src="/adonisjs.glb"
          shadow-intensity="1"
          camera-controls
          touch-action="pan-y">
        </model-viewer>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import Button from '@/components/ui/button.vue'
</script>

<style scoped>
.hero::before {
  position: absolute;
  z-index: 0;
  content: "";
  top: -15%;
  bottom: 0%;
  height: 130%;
  width: 100%;
  /* left: -5%; */
  pointer-events: none;
  background: url(@/assets/noise.webp) repeat,linear-gradient(83.21deg,#3245ff 0%,#bc52ee 100%);
  background-blend-mode: overlay;
  -webkit-mask-image: radial-gradient(rgba(0,0,0,.5),transparent 70%);
  mask-image: radial-gradient(rgba(0,0,0,.5),transparent 70%);  opacity: .5;

}
</style>
