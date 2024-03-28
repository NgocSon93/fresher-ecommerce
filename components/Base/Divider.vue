<script setup lang="ts">
interface DividerProps {
  direction?: 'horizontal' | 'vertical'
  type?: 'solid' | 'dashed' | 'dotted'
  dividerClasses?: string
}

const props = withDefaults(defineProps<DividerProps>(), {
  direction: 'horizontal',
  type: 'solid',
})

const classes = computed(() => {
  return [
    'divider',
    `divider--${props.direction}`,
    `divider--${props.type}`,
    props.direction === 'horizontal' ? 'border-t w-full' : 'border-l h-full',
    props.type === 'solid' ? 'border-solid' : '',
    props.type === 'dotted' ? 'border-dotted' : '',
    props.type === 'dashed' ? 'border-dashed' : '',
    props.dividerClasses,
  ].join(' ')
})
</script>

<template>
  <div class="divider-wrapper">
    <div :class="classes">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@scss/mixins" as m;

.divider-wrapper {
  @include m.flex-center;
}
</style>
