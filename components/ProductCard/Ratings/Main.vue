<script setup lang="ts">
interface RatingsProps { stars?: number; reviews?: number }
const props = defineProps<RatingsProps>()

const stars = ref<number>((!props.stars || props.stars < 0) ? 0 : props.stars > 5 ? 5 : props.stars)
</script>

<template>
  <div class="ratings-container">
    <div class="ratings-full">
      <div class="ratings" :style="`width: ${stars * 20}%`" />
      <span class="tooltiptext tooltip-top">
        {{ stars.toFixed(2) }}
      </span>
    </div>
    <NuxtLink v-if="reviews !== undefined" to="" class="rating-reviews cursor-pointer">
      {{ `(${reviews} reviews)` }}
    </NuxtLink>
  </div>
</template>
