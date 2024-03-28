<script setup lang="ts">
import type { CartProducts } from '~/types/cartProducts'

const authStore = useAuthStore()
const cartStore = useCartStore()
const commonStore = useCommonStore()

const showCart = ref(false)
const cartProducts = computed<CartProducts>(() => cartStore.cartProducts)
const cartCount = computed<number>(() => cartProducts.value.length)

function onToggleShoppingCart() {
  if (!authStore.isAuthenticated) {
    authStore.setIsLogin(true)
    authStore.setIsShowLoginPopup(true)
  }
  else {
    showCart.value = !showCart.value
  }
}
async function removeProductFromCart(productId: number) {
  commonStore.setIsLoading(true)
  const isSuccess = await cartStore.fetchDeleteCart(productId)
  if (isSuccess) {
    const index = cartProducts.value.findIndex(product => product.id === productId)
    if (index !== -1)
      cartStore.cartProducts.splice(index, 1)
  }
  commonStore.setIsLoading(false)
}
</script>

<template>
  <div class="header-middle">
    <div class="container">
      <div class="header-left mr-md-4">
        <NuxtLink to="/" class="logo ml-lg-0">
          <NuxtImg src="/wolmart_logo.png" alt="logo" width="144" height="45" />
        </NuxtLink>
      </div>
      <TheHeaderMiddleSearchBar class="grow" />
      <div class="header-right ml-4">
        <div class="header-call d-xs-show d-lg-flex align-items-center">
          <NuxtLink href="tel:#" class="w-icon-call" />
          <div class="call-info d-lg-show">
            <h4 class="chat font-weight-normal font-size-md text-normal ls-normal text-light mb-0">
              <NuxtLink href="mailto:#" class="text-capitalize">
                Live Chat
              </NuxtLink> or :
            </h4>
            <NuxtLink href="tel:#" class="phone-number font-weight-bolder ls-50">
              0(800)123-456
            </NuxtLink>
          </div>
        </div>
        <NuxtLink to="/wishlist" class="wishlist label-down link d-xs-show">
          <i class="w-icon-heart" />
          <span class="wishlist-label d-lg-show">Wishlist</span>
        </NuxtLink>
        <div
          class="dropdown cart-dropdown cart-offcanvas mr-0 mr-lg-2"
          :class="showCart ? 'opened' : ''"
        >
          <div class="cart-overlay" />
          <NuxtLink
            class="cart-toggle label-down link cursor-pointer"
            @click="onToggleShoppingCart"
          >
            <i class="w-icon-cart">
              <span class="cart-count">{{ cartCount }}</span>
            </i>
            <span class="cart-label">Cart</span>
          </NuxtLink>
          <TheHeaderMiddleCart
            v-model:show="showCart"
            :cart-products="cartProducts"
            @remove-product-from-cart="removeProductFromCart"
          />
          <!-- End of Dropdown Box -->
        </div>
      </div>
    </div>
  </div>
</template>
