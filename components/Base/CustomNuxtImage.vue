<script setup lang="ts">
const props = defineProps<{
  src: string | undefined | null
  alt: string
  width?: number
  height?: number
  aspectRatio?: string
  quality?: number
}>()

const imgSrc = computed(() => props.src || '/no-image-icon.png')
const imgWidth = computed(() => props.width ? `${props.width}px` : '100%')
const imgHeight = computed(() => props.height ? `${props.height}px` : '100%')
const imgStyle = computed(() => ({
  width: imgWidth.value,
  height: imgHeight.value,
  aspectRatio: props.aspectRatio || 'auto',
}))

const placeholder = computed(() => {
  if (!props.width || !props.height)
    return ''

  return [props.width, props.height]
})
</script>

<template>
  <NuxtImg
    :src="imgSrc"
    :alt="props.alt"
    :style="imgStyle"
    loading="lazy"
    :placeholder="placeholder"
    :quality="props.quality || 70"
  />
</template>
