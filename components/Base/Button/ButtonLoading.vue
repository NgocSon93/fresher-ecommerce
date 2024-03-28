<script setup lang="ts">
defineProps<{
  isLoading: boolean
}>()
</script>

<template>
  <div class="relative">
    <template v-if="isLoading">
      <div class="loading-wrapper" />
    </template>
    <slot />
  </div>
</template>

<style lang="postcss" scoped>
.loading-wrapper {
  @apply absolute w-full h-full top-0 left-0 bg-white opacity-50 z-10 cursor-wait;
  @apply flex items-center justify-center;

  &::after {
    @apply content-[''] block w-10 h-10 z-20;
    @apply rounded-full animate-spin border-2 border-primary border-x-transparent;
  }
}
</style>
