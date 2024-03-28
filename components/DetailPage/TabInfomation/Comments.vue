<script setup lang="ts">
import type { Product } from '~/types/products'

const props = defineProps<{
  product: Product
}>()

const currentPage = ref<number>(1)

const reviewsPerPage = 5

const filterProductReviews = computed(() => props.product.reviews.slice(
  (currentPage.value - 1) * reviewsPerPage,
  currentPage.value * reviewsPerPage,
))
</script>

<template>
  <ul class="comments list-style-none">
    <li
      v-for="review in filterProductReviews" :key="review.id"
      class="comment"
    >
      <div class="comment-body">
        <figure class="comment-avatar">
          <BaseAvatar :size="90" :name="review.user.name" :path="review.user.avatar" />
        </figure>
        <div class="comment-content">
          <h4 class="comment-author">
            <NuxtLink>{{ review.user.name }}</NuxtLink>
            <span class="comment-date">
              {{
                new Date(review.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })
              }}
            </span>
          </h4>
          <div class="ratings-container">
            <div class="ratings-full">
              <span class="ratings" :style="{ width: `${review.rating * 20}%` }" />
              <span class="tooltiptext tooltip-top">{{ review.rating }}</span>
            </div>
          </div>
          <p>{{ review.comment }}</p>
          <div class="comment-action">
            <div class="review-image">
              <NuxtLink
                v-for="image in review.images" :key="image.id"
              >
                <figure>
                  <BaseCustomNuxtImage
                    :src="image.path"
                    :width="60"
                    :height="60"
                    alt="Comment image"
                  />
                </figure>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </li>
    <BasePaginations
      v-if="product.reviews.length > 0"
      :total="product.reviews.length"
      :page-size="reviewsPerPage"
      :current-page="currentPage"
      @on-page-change="currentPage = $event"
    />
  </ul>
</template>
