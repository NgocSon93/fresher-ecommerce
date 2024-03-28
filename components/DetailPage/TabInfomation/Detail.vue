<script setup lang="ts">
import type { Product } from '~/types/products'
import { filterReviewsByRating } from '~/utils/product'

const props = defineProps<{
  product: Product
}>()

const productReviews = computed(() => filterReviewsByRating(props.product.reviews))
const numberOfReviews = computed(() => props.product.reviews.length)
function percentageOfReviews(index: number): number {
  if (numberOfReviews.value === 0)
    return 0
  return (productReviews.value[index].length / numberOfReviews.value) * 100
}
</script>

<template>
  <TabView
    wrapper-class="tab tab-nav-boxed tab-nav-underline product-tabs"
    navigation-class="nav nav-tabs"
    item-class="nav-item"
    link-class="nav-link cursor-pointer duration-300"
    active-class="active"
  >
    <TabPanel id="product-tab-description" label="Description">
      <div class="row mb-4 mt-5">
        <div class="col-md-8 mb-5">
          <h4 class="title tab-pane-title font-weight-bold mb-2">
            Detail
          </h4>
          <p class="mb-4" v-html="product.description" />
        </div>
        <div class="col-md-4 mb-5">
          <NuxtLink>
            <BaseCustomNuxtImage
              :src="product.brand.image"
              :alt="product.brand.name"
              :height="250"
              :width="400"
            />
          </NuxtLink>
        </div>
      </div>
      <div class="row cols-md-3">
        <div class="mb-3">
          <h5 class="sub-title font-weight-bold">
            <span class="mr-3">1.</span>Free
            Shipping &amp; Return
          </h5>
          <p class="detail pl-5">
            We offer free shipping for products on orders
            above 50$ and offer free delivery for all orders in US.
          </p>
        </div>
        <div class="mb-3">
          <h5 class="sub-title font-weight-bold">
            <span>2.</span>Free and Easy
            Returns
          </h5>
          <p class="detail pl-5">
            We guarantee our products and you could get back
            all of your money anytime you want in 30 days.
          </p>
        </div>
        <div class="mb-3">
          <h5 class="sub-title font-weight-bold">
            <span>3.</span>Special Financing
          </h5>
          <p class="detail pl-5">
            Get 20%-50% off items over 50$ for a month or
            over 250$ for a year with our special credit card.
          </p>
        </div>
      </div>
    </TabPanel>
    <TabPanel id="product-tab-specification" label="Specification">
      <DetailPageTabInfomationSpecification :product="product" />
    </TabPanel>
    <TabPanel id="product-tab-reviews" label="Customer Reviews">
      <div class="row mb-4 mt-5">
        <div class="col-xl-6 mb-4">
          <div class="ratings-wrapper">
            <div class="avg-rating-container">
              <h4 class="avg-mark font-weight-bolder ls-50">
                {{ product.averageRating }}
              </h4>
              <div class="avg-rating">
                <p class="text-dark mb-1">
                  Average Rating
                </p>
                <ProductRating :product="product" />
              </div>
            </div>

            <div class="ratings-list mt-2">
              <div
                v-for="index in 5"
                :key="index"
                class="ratings-container"
              >
                <div class="ratings-full">
                  <span class="ratings" :style="`width: ${(6 - index) * 20}%`" />
                  <span class="tooltiptext tooltip-top min-w-max">
                    {{ 6 - index }} stars
                  </span>
                </div>
                <div
                  class="progress-bar progress-bar-sm"
                >
                  <span :style="`width: ${percentageOfReviews(6 - index)}%`" />
                </div>
                <div class="progress-value">
                  <mark>{{ (Math.round(percentageOfReviews(6 - index) * 2) / 2) ?? 0 }}%</mark>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-6 mb-4">
          <DetailPageTabInfomationReviewForm :product-id="product.id" />
        </div>
      </div>
      <div class="row mb-8">
        <DetailPageTabInfomationComments :product="product" />
      </div>
    </TabPanel>
  </TabView>
</template>
