<script setup lang="ts">
import Button from '@/components/ui/button.vue'

const categories = [
  {
    label: 'Authentication',
    icon: 'i-carbon-two-factor-authentication',
  },
  {
    label: 'Authorization',
    icon: 'i-carbon-virtual-column-key',
  },
  {
    label: 'Communication',
    icon: 'i-carbon-network-4',
  },
  {
    label: 'Database',
    icon: 'i-carbon-data-base',
  },
  {
    label: 'Deployment',
    icon: 'i-carbon-3rd-party-connected',
  },
  {
    label: 'Devtools',
    icon: 'i-carbon-code',
  },
  {
    label: 'Extensions',
    icon: 'i-carbon-model-alt',
  },
  {
    label: 'Messaging',
    icon: 'i-carbon-content-view',
  },
  {
    label: 'Monitoring',
    icon: 'i-carbon-chat',
  },
  {
    label: 'Payment',
    icon: 'i-carbon-wallet',
  },
  {
    label: 'Rendering',
    icon: 'i-carbon-layers',
  },
  {
    label: 'Security',
    icon: 'i-carbon-block-storage-alt',
  },
  {
    label: 'Storage',
    icon: 'i-carbon-security',
  },
  {
    label: 'Testing',
    icon: 'i-carbon-task-complete',
  },
]
</script>

<template>
  <div class="flex flex-col gap-y-8">
    <div>
      <p class="text-3xl font-bold">AdonisJS version</p>
      <div class="flex mt-6 gap-x-6">
        <Button class="flex-1" theme="outline"> Adonis 6 </Button>
        <Button class="flex-1" theme="outline"> Adonis 5 </Button>
      </div>
    </div>
    <div>
      <p class="text-3xl font-bold">Categories</p>
      <div class="flex mt-6 gap-x-6">
        <div class="flex flex-col gap-y-4 font-content">
          <button
            v-for="category in categories"
            :key="category.label"
            class="flex text-left items-center gap-x-4 transition-all ease-in-out duration-200 cursor-pointer"
            hover="translate-x-2"
          >
            <div class="bg-#171717 text-sm px-2.4 py-2 flex items-center rounded-xl">
              <i class="text-white-300 inline-block" :class="category.icon" />
            </div>
            <div>
              <p class="text-white-400">
                {{ category.label }}
              </p>
              <p class="text-xs text-white-300">{{ (Math.random() * 100).toFixed() }} packages</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
