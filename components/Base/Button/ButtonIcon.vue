<script setup lang="ts">
const props = withDefaults(defineProps<{
  iconName: string
  isLoading: boolean
  iconClass?: string
  size: string
}>(), {
  size: '20px',
})
</script>

<template>
  <div>
    <template v-if="props.isLoading">
      <div class="loading-wrapper" :style="{ width: props.size, height: props.size }" />
    </template>
    <template v-else>
      <Icon :name="iconName" :class="iconClass" :size="size" />
    </template>
  </div>
</template>

<style lang="postcss" scoped>
.loading-wrapper {
  @apply relative;

  &::after {
    @apply content-[''] block w-full h-full;
    @apply animate-spin;
    @apply rounded-full border-2 border-primary border-x-transparent;
  }
}
</style>
