<script setup lang="ts">
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import BackgroundGradient from '@/components/background_gradient.vue'
</script>

<template>
  <div class="min-h-full relative flex flex-col">
    <Header />

    <slot />

    <BackgroundGradient
      variant="orange"
      intensity="normal"
      :position="{ top: '800px', right: '-100px' }"
      :size="{ width: '600px', height: '600px' }"
      :opacity="0.3"
    />
    <BackgroundGradient
      variant="cyan"
      intensity="subtle"
      :position="{ top: '400px', left: '-200px' }"
      :size="{ width: '800px', height: '800px' }"
    />

    <Footer />
  </div>
</template>

<style scoped></style>
