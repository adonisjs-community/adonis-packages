<script lang="ts" setup>
import SelectMenu from '../select_menu.vue'

defineProps<{
  categories: {
    value: string
    label: string
  }[]
}>()

const category = defineModel<string>({
  required: true,
})
</script>

<template>
  <SelectMenu v-model="category" :options="categories" placeholder="Select a category" />
</template>
