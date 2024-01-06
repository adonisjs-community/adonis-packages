<script lang="ts" setup>
import SelectMenu from '../select_menu.vue'

defineProps<{
  versions: {
    value: string
    label: string
  }[]
}>()

const version = defineModel<string[]>({
  required: true,
})
</script>

<template>
  <SelectMenu v-model="version" :options="versions" multiple placeholder="Select a version" />
</template>
