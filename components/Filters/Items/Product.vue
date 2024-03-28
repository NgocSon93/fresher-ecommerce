<script setup lang="ts">
import type { Product } from '~/types/products'

interface ProductProps { products: Product[] }
const props = defineProps<ProductProps>()
</script>

<template>
  <div class="widget-product">
    <template v-if="props.products.length > 0">
      <ProductCardFeatured v-for="product in props.products" :key="product.id" :product="product" />
    </template>
    <div v-else class="filter-items">
      There are no product!
    </div>
  </div>
</template>
