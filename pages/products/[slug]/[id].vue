<script setup lang="ts">
import { useCustomFetch } from '~/composables/useCustomFetch'
import type { Product, Products } from '~/types/products'

const { slug, id } = useRoute().params

const { data: product } = await useCustomFetch<Product>(`/products/${id}`)

const { data: productsByBrand } = await useCustomFetch('/products', {
  params: {
    'brand[]': product.value?.brand.name,
    'perPage': 3,
  },
  transform: (response: { data: Products }): Products => response.data,
})

const { data: relatedProducts } = await useCustomFetch<Products>(`/products/${product.value?.id}/relate`, {
  params: {
    limit: 3,
  },
})

const productBreadcrumb = computed(() => ([
  { name: 'Home', route: '/' },
  { name: 'Products', route: '/categories' },
  { name: product.value?.name ?? '', route: `/products/${slug}` },
]))
</script>

<template>
  <div v-if="product" class="container">
    <BaseBreadcrumb :items="productBreadcrumb" />

    <div class="page-content">
      <div class="row gutter-lg">
        <div class="main-content">
          <div class="product product-single row">
            <div class="col-md-6 mb-6">
              <DetailPageProductGallery :product="product" />
            </div>
            <div class="col-md-6 mb-4 mb-md-6">
              <DetailPageProductInfo :product="product" />
            </div>
          </div>
          <DetailPageTabInfomationDetail :product="product" />
          <DetailPageListProductHorizontal
            v-if="productsByBrand"
            :products="productsByBrand"
            title="More Products From This Brand"
          />
          <DetailPageListProductHorizontal
            v-if="relatedProducts"
            :products="relatedProducts"
            title="Related Products"
          />
        </div>
        <DetailPageSidebar :product="product" />
      </div>
    </div>
  </div>
</template>
