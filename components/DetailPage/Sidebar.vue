<script setup lang="ts">
import type { Product, Products } from '~/types/products'
import { formatMoney, getMainImagePath } from '~/utils'
import { processPrice } from '~/utils/product'

const props = defineProps<{
  product: Product
}>()

// relate products
const { data: relateProducts } = useCustomFetch<Products>(`/products/${props.product.id}/relate`, {
  params: {
    limit: 3,
  },
})
</script>

<template>
  <aside class="sidebar product-sidebar sidebar-fixed right-sidebar sticky-sidebar-wrapper">
    <div class="sidebar-overlay" />
    <div class="sidebar-content scrollable">
      <div class="sticky-sidebar">
        <AssuranceInfo direction="vertical" />
        <!-- End of Widget Icon Box -->

        <div v-if="relateProducts && relateProducts.length > 0" class="widget widget-products">
          <div class="title-link-wrapper mb-2">
            <h4 class="title title-link font-weight-bold">
              More Products
            </h4>
          </div>

          <div class="nav-top">
            <div class="widget-col">
              <template v-for="relateProduct in relateProducts" :key="relateProduct.id">
                <div class="product product-widget">
                  <figure class="product-media">
                    <NuxtLink :to="`/products/${relateProduct.slug}/${relateProduct.id}`">
                      <BaseCustomNuxtImage
                        :src="getMainImagePath(relateProduct.images)"
                        :alt="relateProduct.name"
                        :width="100"
                        :height="113"
                      />
                    </NuxtLink>
                  </figure>
                  <div class="product-details">
                    <h4 class="product-name">
                      <NuxtLink :to="`/products/${relateProduct.slug}/${relateProduct.id}`">
                        {{ relateProduct.name }}
                      </NuxtLink>
                    </h4>
                    <ProductRating :product="relateProduct" />
                    <div class="product-price">
                      <template v-if="processPrice(relateProduct).discountedPrice">
                        {{ formatMoney(processPrice(relateProduct).originalPrice) }}
                      </template>
                      <template v-else>
                        {{ formatMoney(processPrice(relateProduct).minPrice) }} - {{ formatMoney(processPrice(relateProduct).maxPrice) }}
                      </template>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
