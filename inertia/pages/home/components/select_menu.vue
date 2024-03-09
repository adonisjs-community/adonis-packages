<script lang="ts" setup>
import { computed, inject } from 'vue'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'

const props = defineProps<{
  options: {
    label: string
    value: string
    description?: string
  }[]
  placeholder: string
  multiple?: boolean
}>()

const group = inject<boolean>('group', false)
const model = defineModel<string | string[]>({ required: true })

const display = computed(() => {
  if (Array.isArray(model.value) && model.value.length > 0) {
    return `${model.value.length} selected`
  }

  if (model.value) {
    const option = props.options.find((option) => option.value === model.value)
    if (option) return option.label
  }

  return props.placeholder
})
</script>

<template>
  <Listbox v-model="model" :multiple="multiple" as="div">
    <div class="relative">
      <ListboxButton
        v-slot="{ open }"
        class="relative w-full cursor-pointer py-3 pl-5 pr-10 text-left text-base12 shadow-sm md:w-[230px] sm:leading-6"
        :class="{ '!bg-base2 rounded-xl': !group }"
      >
        <span class="w-full inline-flex truncate text-base-11">
          <span class="truncate">
            {{ display }}
          </span>
        </span>
        <span class="pointer-events-none absolute inset-y-0 right-3 flex items-center pr-2">
          <i
            class="i-fa6-solid-chevron-down transform text-sm text-base-11 transition-transform duration-200"
            :class="[open ? 'transform rotate-180' : '']"
          />
        </span>
      </ListboxButton>

      <Transition
        enter-active-class="transition ease-out duration-400"
        enter-from-class="opacity-0 -translate-y-3"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition transform ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-3"
      >
        <ListboxOptions
          class="absolute z-10 mt-2 w-full overflow-auto rounded-xl bg-base2 px-2 py-2 text-base shadow-lg"
        >
          <ListboxOption
            v-for="option in options"
            :key="option.value"
            v-slot="{ active, selected }"
            as="template"
            :value="option.value"
          >
            <li
              class="relative cursor-default cursor-pointer select-none rounded-lg py2 pl-3 pr-4 transition-colors duration-200"
              :class="[active ? 'bg-primary' : '']"
            >
              <div class="flex flex-col font-content">
                <span class="text-base">
                  {{ option.label }}
                </span>
                <span
                  v-if="option.description"
                  class="pr-8 text-xs font-thin"
                  :class="[active ? 'text-indigo-200' : 'text-gray-500']"
                >
                  {{ option.description }}
                </span>
              </div>

              <span
                v-if="selected"
                class="absolute inset-y-0 right-0 flex items-center pr-4"
                :class="[active ? 'text-base12' : 'text-indigo-600']"
              >
                <i class="i-fa6-solid-check text-sm text-base-11" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </Transition>
    </div>
  </Listbox>
</template>
