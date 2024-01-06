<script lang="ts" setup>
import SelectMenu from '../select_menu.vue'

defineProps<{
  parties: {
    value: string
    label: string
  }[]
}>()

const party = defineModel<string[]>({
  required: true,
})
</script>

<template>
  <SelectMenu v-model="party" :options="parties" multiple placeholder="Select a party" />
</template>
