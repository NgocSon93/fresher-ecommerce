<script setup lang="ts">
import type { Products } from '~/types/products'

const products = computed(() => useProductStore().newProducts as Products)
</script>

<template>
  <div class="container mb-8">
    <h2 class="title justify-content-center ls-normal mt-10 pt-1">
      NEW ARRIVALS
    </h2>
    <div class="mt-3 row cols-xl-5 cols-md-4 cols-sm-3 cols-2">
      <template v-for="product in products" :key="product.id">
        <ProductCardDefault :product="product" class="mt-4" />
      </template>
    </div>
  </div>
</template>
