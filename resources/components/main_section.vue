<template>
  <section class="grid grid-cols-3">
    <div v-for="pkg in packages" :key="pkg.name">
      {{ pkg.name }}
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  packages: ModuleInfo[]
}>()
</script>

<style scoped>

</style>
