<script setup lang="ts">
import type { Images } from '~/types'

interface ImageProps { slug?: string; images: Images; name?: string }
const props = defineProps<ImageProps>()
</script>

<template>
  <div class="image-wrapper">
    <NuxtLink :to="props.slug ? `/products/${props.slug}` : ''">
      <figure v-if="getMainImagePath(props.images)">
        <NuxtImg
          :src="getMainImagePath(props.images)"
          :alt="props.name || 'Main image'" width="300" height="340"
        />
      </figure>
      <div v-else class="overlay">
        <Icon name="bi:camera" class="icon" />
      </div>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.image-wrapper {
  @apply relative block w-full h-full max-w-[30rem] max-h-[34rem] overflow-hidden transition-opacity duration-[400ms];

  &:hover img{
    @apply scale-[1.08];
  }

  & img {
    @apply aspect-[100/113] transition-all duration-[400ms];
  }

  & .overlay {
    @apply flex items-center justify-center aspect-[100/113] bg-secondary-50 rounded-[3px];

    & .icon {
      @apply text-secondary-500 text-[6rem] font-bold;
    }
  }
}
</style>
