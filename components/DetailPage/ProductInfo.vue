<script setup lang="ts">
import { toast } from 'vue3-toastify'
import { formatMoney } from '~/utils'
import { getActiveDiscounts, getDiscountedPrice } from '~/utils/product'
import { getSlugWithId } from '~/utils/slug'
import type { Product } from '@/types/products'

const props = defineProps<{
  product: Product
}>()

const authStore = useAuthStore()
const cartStore = useCartStore()

const cartQuantity = ref<number>(1)

const quantityIndex = ref<number>(0)

const activeDiscounts = getActiveDiscounts(props.product)

const productListPrice = computed(() => props.product.quantities.length > 0 ? props.product.quantities[quantityIndex.value].price : 0)

const productPrice = computed(() => getDiscountedPrice(activeDiscounts, productListPrice.value))

const isAbleAddtoCart = computed<boolean>(() => {
  if (props.product.quantities.length > 0)
    return props.product.quantities.every(value => value.quantity > 0)
  return false
})

const addToCartLoading = ref<boolean>(false)

// handle when click add to cart button
async function addToCart() {
  if (isAbleAddtoCart.value) {
    if (!authStore.isAuthenticated) {
      authStore.setIsLogin(true)
      authStore.setIsShowLoginPopup(true)
      return
    }

    addToCartLoading.value = true

    const cartInfo = {
      productId: props.product.id,
      quantity: cartQuantity.value,
      sizeId: props.product.quantities[quantityIndex.value].sizeId,
    }

    const { data } = await useCustomFetch<{ message: string }>('/carts/add-to-cart', {
      method: 'POST',
      body: JSON.stringify(cartInfo),
    })

    if (data.value?.message) {
      await cartStore.fetchAllCarts()
      cartQuantity.value = 1
      toast.success('Add to cart successfully')
    }
    else {
      toast.error('Add to cart failed')
    }

    addToCartLoading.value = false
  }
}
</script>

<template>
  <div class="product-details" data-sticky-options="{'minWidth': 767}">
    <h1 class="product-title">
      {{ product.name }}
    </h1>
    <div class="product-bm-wrapper !flex-nowrap">
      <figure class="brand">
        <BaseCustomNuxtImage
          :src="product.brand.image"
          alt="Brand"
          :width="102"
          :height="48"
        />
      </figure>
      <div class="product-meta">
        <div class="product-categories">
          Category:
          <span
            v-for="category in product.categories" :key="category.id"
            class="product-category"
          >
            <NuxtLink
              :to="`/categories/${getSlugWithId(category.id, category.slug)}`"
              class="cursor-pointer ml-1"
            >
              {{ category.name }}
            </NuxtLink>
          </span>
        </div>
      </div>
    </div>

    <hr class="product-divider">
    <div class="custom-product-price mb-2">
      <div class="flex item-start text-black">
        <span class="text-4xl font-bold">{{ formatMoney(productPrice) }}</span>
      </div>
      <template v-if="activeDiscounts.length > 0">
        <span class="block mt-px mb-1">
          List price:
          <span class="line-through">{{ formatMoney(productListPrice) }}</span>
        </span>
      </template>
    </div>

    <ProductRating :product="product" />

    <div class="product-short-desc">
      <ul class="list-type-check list-style-none">
        <li v-for="featureObject in product.features" :key="featureObject.id">
          {{ featureObject.feature }}
        </li>
      </ul>
    </div>

    <hr class="product-divider">

    <div class="product-form product-variation-form product-size-swatch">
      <label class="mb-1">Size:</label>
      <div class="flex-wrap d-flex align-items-center product-variations">
        <NuxtLink
          v-for="(quantity, index) in product.quantities" :key="quantity.id"
          class="size cursor-pointer"
          :class="{
            active: quantityIndex === index,
          }"
          @click="quantityIndex = index"
        >
          {{ quantity.sizeName }}
        </NuxtLink>
      </div>
    </div>

    <div class="fix-bottom product-sticky-content sticky-content">
      <div class="product-form container mb-3">
        <div class="product-qty-form">
          <div class="input-group">
            <input
              v-model="cartQuantity"
              class="quantity form-control" type="number" min="1"
              max="10000000"
            >
            <button class="quantity-plus w-icon-plus" @click="cartQuantity += 1" />
            <button class="quantity-minus w-icon-minus" @click="cartQuantity -= 1" />
          </div>
        </div>
        <BaseButtonLoading :is-loading="addToCartLoading">
          <button
            class="btn btn-primary btn-cart"
            :class="{ disabled: !isAbleAddtoCart }"
            @click="addToCart"
          >
            <i class="w-icon-cart" />
            <span>Add to Cart</span>
          </button>
        </BaseButtonLoading>
      </div>
    </div>

    <DetailPageSocial
      :product="product"
    />
  </div>
</template>
