<template>
  <div ref="elem" class="observer" />
</template>

<script setup lang="ts">
const props = defineProps<{ options?: {} }>()
const emit = defineEmits<{
  (...args:any[]): void,
  intersect: (e: IntersectionObserverEntry) => void
}>()

const observer = ref<IntersectionObserver | null>(null)

const elem = ref(null)

onMounted(() => {
  observer.value = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting) {
      emit('intersect')
    }
  }, props.options)

  observer.value.observe(elem.value!)
})

onUnmounted(() => { observer.value!.disconnect() })
</script>
