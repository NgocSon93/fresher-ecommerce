<script setup lang="ts">
import type { Category } from '~/types/categories'
import { getSlugWithId } from '~/utils/slug'
import { getMainImagePath } from '~/utils'
import { useProductStore } from '~/stores/products'

const props = defineProps<{
  category: Category
}>()

const productStore = useProductStore()
await productStore.fetchProductsByCategory(props.category.name)
const products = productStore.productsWithCategory[props.category.name]
</script>

<template>
  <div class="product-wrapper-1 mb-5">
    <div class="title-link-wrapper pb-1 mb-4">
      <h2 class="title ls-normal mb-0">
        {{ props.category.name }}
      </h2>
      <NuxtLink
        :to="`/categories/${getSlugWithId(props.category.id, props.category.slug)}`"
        class="font-size-normal font-weight-bold ls-25 mb-0"
      >
        More Products
        <i class="w-icon-long-arrow-right" />
      </NuxtLink>
    </div>
    <div class="row">
      <div class="col-lg-3 col-sm-4 mb-4">
        <div
          class="banner h-100 br-sm"
          style="background-color: #ebeced;"
        >
          <BaseCustomNuxtImage
            :src="getMainImagePath(category.images)"
            :quality="30"
            alt="Category Image"
            class="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div class="banner-content content-top">
            <h3 class="banner-title text-white font-weight-bolder ls-25 text-uppercase">
              {{ category.name }}<br> <span
                class="font-weight-normal text-capitalize"
              >Collection</span>
            </h3>
            <NuxtLink
              :to="`/categories/${getSlugWithId(props.category.id, props.category.slug)}`"
              class="btn btn-white btn-outline btn-rounded btn-sm"
            >
              shop Now
            </NuxtLink>
          </div>
        </div>
      </div>
      <!-- End of Banner -->
      <div class="col-lg-9 col-sm-8">
        <div class="product-wrap product-wrapper row cols-md-4 cols-sm-2 cols-2">
          <template v-for="product in products" :key="product.id">
            <ProductCardDefault :product="product" action="horizontal" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
