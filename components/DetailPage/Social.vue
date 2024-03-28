<script setup lang="ts">
import type { Product } from '~/types/products'

const props = defineProps<{
  product: Product
}>()

const detailProductLink = computed(() => `${useRuntimeConfig().public.baseUrl}${useRoute().path}`)

const socialItems = [
  {
    icon: 'social-facebook w-icon-facebook',
    link: `https://www.facebook.com/sharer/sharer.php?u=${detailProductLink.value}`,
  },
  {
    icon: 'social-twitter w-icon-twitter',
    link: `https://twitter.com/intent/tweet?text=${props.product.name}&url=${detailProductLink.value}`,
  },
  {
    icon: 'social-pinterest fab fa-pinterest-p',
    link: `https://pinterest.com/pin/create/button/?url=${detailProductLink.value}`,
  },
  {
    icon: 'social-whatsapp fab fa-whatsapp',
    link: `https://wa.me/?text=${detailProductLink.value}`,
  },
  {
    icon: 'social-linkedin fab fa-linkedin-in',
    link: `https://www.linkedin.com/shareArticle?mini=true&url=${detailProductLink.value}`,
  },
]
</script>

<template>
  <div class="social-links-wrapper">
    <div class="social-links">
      <div class="social-icons social-no-color border-thin">
        <NuxtLink
          v-for="item in socialItems" :key="item.link"
          class="cursor-pointer social-icon"
          target="_blank"
          :class="item.icon"
          :to="item.link"
        />
      </div>
    </div>
    <span class="divider d-xs-show" />
    <div class="product-link-wrapper d-flex">
      <!-- Wish List Icon -->
      <ProductCardButtonWishlist :product="product" />
    </div>
  </div>
</template>
