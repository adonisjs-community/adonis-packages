<script setup lang="ts">
defineProps<{
  modelValue?: string
}>()

const emits = defineEmits<{
  'update:modelValue': [string]
}>()

const onChange = function (event: Event) {
  const target = event.target as HTMLInputElement
  emits('update:modelValue', target.value)
}
</script>

<template>
  <div class="relative shadow-sm">
    <i
      class="i-fluent-emoji-magnifying-glass-tilted-right absolute left-[18px] top-[14px] inline-block"
    />
    <input
      :value="modelValue"
      type="text"
      placeholder="Search for a package"
      class="w-full border-0 rounded-xl bg-base2 px-6 py-3 pl-12 focus:(outline-0 ring-0)"
      @input="onChange($event)"
    />
  </div>
</template>
