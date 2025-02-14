<script lang="ts" setup>
import { computed, useSlots } from 'vue'

const properties = withDefaults(
  defineProps<{
    as?: 'button' | 'a'
    size?: 'l' | 'm' | 's'
    theme?: 'primary' | 'outline'
    type?: 'button' | 'submit'
    loading?: boolean
    disabled?: boolean
    tooltip?: string
    align?: 'left' | 'center' | 'right'
    rightIcon?: string
    leftIcon?: string
    iconClass?: string
  }>(),
  {
    variant: 'button',
    size: 'm',
    color: 'primary',
    type: 'button',
    align: 'center',
    as: 'button',
  },
)

const slots: any = useSlots()

const component = computed(() => properties.as)
const isDisabled = computed(
  () => (properties.loading || properties.disabled) && component.value === 'button',
)
const cursorClass = computed(() => (isDisabled.value ? '--cursor-disabled' : '--cursor-pointer'))
const buttonType = computed(() => (component.value === 'button' ? properties.type : undefined))
const alignClass = computed(() => `--align-${properties.align}`)
const hasLeftIcon = computed(() => !!slots['left-icon'] || properties.leftIcon)
const hasRightIcon = computed(() => !!slots['right-icon'] || properties.rightIcon)
const hasIcon = computed(() => hasLeftIcon.value || hasRightIcon.value)
</script>

<template>
  <Component
    v-bind="$attrs"
    :is="component"
    :disabled="isDisabled"
    :aria-disabled="isDisabled"
    class="btn text-button-m shrink-0"
    :class="[
      `--${size}`,
      `--${theme}`,
      cursorClass,
      alignClass,
      {
        '--loading': loading,
        '--disabled': isDisabled,
        '--icon': hasIcon,
      },
    ]"
    :type="buttonType"
  >
    <div v-if="hasLeftIcon" class="btn__icon-left flex">
      <slot name="left-icon">
        <i v-if="leftIcon" :class="`inline-block text-xl ${leftIcon} ${iconClass}`" />
      </slot>
    </div>
    <span class="w-full flex">
      <slot />
    </span>
    <div v-if="hasRightIcon" class="btn__icon-right flex">
      <slot name="right-icon">
        <i v-if="rightIcon" :class="`inline-block text-xl ${rightIcon} ${iconClass}`" />
      </slot>
    </div>
  </Component>
</template>

<style lang="postcss" scoped>
.btn {
  @apply inline-flex items-center cursor-pointer overflow-hidden rounded-xl cursor-pointer;
  transition: all 0.2s ease-in-out;

  &.--m {
    padding: 0.55rem 1rem;
  }

  &__icon-left {
    @apply ml-1 mr-2 leading-none;
  }

  &__icon-right {
    @apply mr-1 ml-2 leading-none;
  }

  &.--align-left {
    @apply text-left justify-start;
  }

  &.--align-center {
    @apply text-center justify-center;

    & > span {
      @apply justify-center;
    }
  }

  &.--align-right {
    @apply text-right justify-end;
  }

  &.--cursor-disabled {
    @apply cursor-not-allowed;
  }

  &.--primary {
    @apply bg-primary text-base12;
    box-shadow: 0px 0px 31px 11px rgba(84, 104, 255, 0.3);

    &:hover {
      @apply bg-primary-600;
      box-shadow: 0px 0px 40px 11px rgba(84, 104, 255, 0.3);
    }

    &:focus {
      @apply outline-1 outline-primary-400;
    }

    &&.--disabled {
      @apply bg-primary-200 text-primary-400;
    }
  }

  &.--outline {
    @apply border border-white;

    &:hover {
      @apply bg-brand-300;
    }

    &:focus {
      @apply bg-brand-300;
    }
  }
}
</style>
