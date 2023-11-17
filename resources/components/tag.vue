<script setup lang="ts"></script>

<template>
  <div class="tag rounded-full text-sm font-thin px-2 py-0.2">
    <slot />
  </div>
</template>

<style scoped>
.tag {
  background: rgba(43, 43, 43, 0.53);
  color: #c6c6c6;
}
</style>
