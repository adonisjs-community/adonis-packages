<script setup lang="ts">
const model = defineModel<string>()
</script>

<template>
  <div class="relative">
    <i class="i-tabler:search text-base10 absolute left-[18px] top-[9px] inline-block" />
    <input
      v-model="model"
      type="text"
      placeholder="Search for a package"
      class="w-full border text-sm border-base5 rounded bg-base3 px-6 py-2 pl-12"
      focus-visible="outline-base5 border-base5 outline-offset-2 outline-1 ring-base3"
    />
  </div>
</template>
