<script setup lang="ts">
const props = defineProps<{
  label: string
}>()

const addTab = inject('addTab') as (label: string) => void
const isTabActive = inject('isTabActive') as (label: string) => boolean

addTab(props.label)
</script>

<template>
  <div v-show="isTabActive(props.label)">
    <slot />
  </div>
</template>
