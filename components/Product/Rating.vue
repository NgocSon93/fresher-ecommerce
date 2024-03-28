<script setup lang="ts">
import type { Product } from '~/types/products'

const props = withDefaults(defineProps<{
  product: Product
  isShowReviews?: boolean
}>(), {
  isShowReviews: true,
})

const numberOfReviews = computed(() => props.product.reviews.length)
</script>

<template>
  <div class="ratings-container">
    <div class="ratings-full">
      <span class="ratings" :style="{ width: `${product.averageRating * 20}%` }" />
      <span class="tooltiptext tooltip-top">{{ product.averageRating }}</span>
    </div>
    <template v-if="props.isShowReviews">
      <NuxtLink class="rating-reviews cursor-pointer">
        ({{ numberOfReviews }} {{ numberOfReviews > 1 ? 'reviews' : 'review' }})
      </NuxtLink>
    </template>
  </div>
</template>
