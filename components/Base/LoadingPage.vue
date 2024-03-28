<script setup lang="ts">
const props = defineProps<{
  isLoading: boolean
}>()
</script>

<template>
  <div v-if="props.isLoading">
    <div class="overlay" />
    <div class="custom-loading" />
  </div>
</template>

<style lang="postcss" scoped>
.overlay {
    @apply fixed top-0 left-0 z-[9999];
    @apply h-screen w-screen bg-gray-200 opacity-30;
}

.custom-loading {
    @apply h-16 w-16 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100;
    @apply z-[9999];

    &::after {
        @apply content-[''] block w-full h-full;
        @apply animate-spin;
        @apply rounded-full border-[5px] border-primary border-x-secondary-200;
    }
}
</style>
