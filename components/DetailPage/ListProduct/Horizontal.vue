<script setup lang="ts">
import type { Products } from '~/types/products'

defineProps<{
  products: Products
  title: string
}>()
</script>

<template>
  <section v-if="products.length > 0" class="vendor-product-section">
    <div class="title-link-wrapper mb-4">
      <h4 class="title text-left">
        {{ title }}
      </h4>
      <NuxtLink class="btn btn-dark btn-link btn-slide-right btn-icon-right">
        More Products
        <i class="w-icon-long-arrow-right" />
      </NuxtLink>
    </div>
    <div class="row cols-lg-3 cols-md-4 cols-sm-3 cols-2">
      <template v-for="product in products" :key="product.id">
        <ProductCardDefault :product="product" />
      </template>
    </div>
  </section>
</template>
