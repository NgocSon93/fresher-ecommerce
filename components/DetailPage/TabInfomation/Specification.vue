<script setup lang="ts">
import type { Product } from '~/types/products'

defineProps<{
  product: Product
}>()
</script>

<template>
  <ul class="list-none mt-5">
    <li>
      <label>Model</label>
      <p>{{ product.name }}</p>
    </li>
    <li>
      <label>Brand</label>
      <p>{{ product.brand.name }}</p>
    </li>
    <li v-if="product.quantities">
      <label>Size</label>
      <p>{{ product.quantities.map(q => q.sizeName).join(', ') }}</p>
    </li>
    <li v-if="product.categories">
      <label>Categories</label>
      <p>{{ product.categories.map(c => c.name).join(', ') }}</p>
    </li>
  </ul>
</template>
