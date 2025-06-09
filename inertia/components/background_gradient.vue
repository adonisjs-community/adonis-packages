<script setup lang="ts">
interface PositionConfig {
  top?: string
  left?: string
  right?: string
  bottom?: string
}

interface SizeConfig {
  width: string
  height: string
}

interface Props {
  variant?: 'blue' | 'purple' | 'cyan' | 'red' | 'green' | 'orange'
  intensity?: 'subtle' | 'normal' | 'vibrant'
  position?: PositionConfig
  size?: SizeConfig
  opacity?: number
  enabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'blue',
  intensity: 'normal',
  position: () => ({ top: '-200px', right: '-100px' }),
  size: () => ({ width: '600px', height: '600px' }),
  opacity: 1,
  enabled: true,
})
</script>

<template>
  <div v-if="enabled" class="pointer-events-none absolute inset-0 z-0">
    <div
      class="gradient-splash"
      :class="[`gradient-splash--${variant}`, `gradient-splash--${intensity}`]"
      :style="{
        top: position?.top,
        left: position?.left,
        right: position?.right,
        bottom: position?.bottom,
        width: size?.width,
        height: size?.height,
        opacity,
      }"
    />
  </div>
</template>

<style lang="postcss" scoped>
.gradient-splash {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
}

/* Color variants with intensities */
/* Blue variants */
.gradient-splash--blue.gradient-splash--subtle {
  background: radial-gradient(
    circle,
    rgba(59, 130, 246, 0.08) 0%,
    rgba(99, 102, 241, 0.05) 50%,
    transparent 70%
  );
}

.gradient-splash--blue.gradient-splash--normal {
  background: radial-gradient(
    circle,
    rgba(59, 130, 246, 0.15) 0%,
    rgba(99, 102, 241, 0.1) 50%,
    transparent 70%
  );
}

.gradient-splash--blue.gradient-splash--vibrant {
  background: radial-gradient(
    circle,
    rgba(59, 130, 246, 0.25) 0%,
    rgba(99, 102, 241, 0.18) 50%,
    transparent 70%
  );
}

/* Purple variants */
.gradient-splash--purple.gradient-splash--subtle {
  background: radial-gradient(
    circle,
    rgba(139, 92, 246, 0.08) 0%,
    rgba(168, 85, 247, 0.05) 50%,
    transparent 70%
  );
}

.gradient-splash--purple.gradient-splash--normal {
  background: radial-gradient(
    circle,
    rgba(139, 92, 246, 0.15) 0%,
    rgba(168, 85, 247, 0.1) 50%,
    transparent 70%
  );
}

.gradient-splash--purple.gradient-splash--vibrant {
  background: radial-gradient(
    circle,
    rgba(139, 92, 246, 0.25) 0%,
    rgba(168, 85, 247, 0.18) 50%,
    transparent 70%
  );
}

/* Cyan variants */
.gradient-splash--cyan.gradient-splash--subtle {
  background: radial-gradient(
    circle,
    rgba(6, 182, 212, 0.08) 0%,
    rgba(14, 165, 233, 0.05) 50%,
    transparent 70%
  );
}

.gradient-splash--cyan.gradient-splash--normal {
  background: radial-gradient(
    circle,
    rgba(6, 182, 212, 0.15) 0%,
    rgba(14, 165, 233, 0.1) 50%,
    transparent 70%
  );
}

.gradient-splash--cyan.gradient-splash--vibrant {
  background: radial-gradient(
    circle,
    rgba(6, 182, 212, 0.25) 0%,
    rgba(14, 165, 233, 0.18) 50%,
    transparent 70%
  );
}

/* Red variants */
.gradient-splash--red.gradient-splash--subtle {
  background: radial-gradient(
    circle,
    rgba(239, 68, 68, 0.08) 0%,
    rgba(220, 38, 38, 0.05) 50%,
    transparent 70%
  );
}

.gradient-splash--red.gradient-splash--normal {
  background: radial-gradient(
    circle,
    rgba(239, 68, 68, 0.15) 0%,
    rgba(220, 38, 38, 0.1) 50%,
    transparent 70%
  );
}

.gradient-splash--red.gradient-splash--vibrant {
  background: radial-gradient(
    circle,
    rgba(239, 68, 68, 0.25) 0%,
    rgba(220, 38, 38, 0.18) 50%,
    transparent 70%
  );
}

/* Green variants */
.gradient-splash--green.gradient-splash--subtle {
  background: radial-gradient(
    circle,
    rgba(34, 197, 94, 0.08) 0%,
    rgba(22, 163, 74, 0.05) 50%,
    transparent 70%
  );
}

.gradient-splash--green.gradient-splash--normal {
  background: radial-gradient(
    circle,
    rgba(34, 197, 94, 0.15) 0%,
    rgba(22, 163, 74, 0.1) 50%,
    transparent 70%
  );
}

.gradient-splash--green.gradient-splash--vibrant {
  background: radial-gradient(
    circle,
    rgba(34, 197, 94, 0.25) 0%,
    rgba(22, 163, 74, 0.18) 50%,
    transparent 70%
  );
}

/* Orange variants */
.gradient-splash--orange.gradient-splash--subtle {
  background: radial-gradient(
    circle,
    rgba(249, 115, 22, 0.08) 0%,
    rgba(234, 88, 12, 0.05) 50%,
    transparent 70%
  );
}

.gradient-splash--orange.gradient-splash--normal {
  background: radial-gradient(
    circle,
    rgba(249, 115, 22, 0.15) 0%,
    rgba(234, 88, 12, 0.1) 50%,
    transparent 70%
  );
}

.gradient-splash--orange.gradient-splash--vibrant {
  background: radial-gradient(
    circle,
    rgba(249, 115, 22, 0.25) 0%,
    rgba(234, 88, 12, 0.18) 50%,
    transparent 70%
  );
}
</style>
