<script setup lang="ts">
import { getTotal } from '~/utils/cart.helper'
import type { CartProducts } from '~/types/cartProducts'

definePageMeta({
  middleware: ['auth'],
})

useSeoMeta({
  title: 'Shopping cart',
})

const router = useRouter()
const cartStore = useCartStore()
const commonStore = useCommonStore()

const cartProducts = computed<CartProducts>(() => cartStore.cartProducts)
const cartTotals = computed<number>(() => getTotal(cartProducts.value))
const updateCartArray = ref<number[]>([])
const errorCartArray = ref<number[]>([])
const isShowAlert = ref<string>('')

// Fetch cart products when mounted
async function updateCartProducts() {
  commonStore.setIsLoading(true)
  await cartStore.fetchAllCarts()

  if (cartProducts.value.length) {
    errorCartArray.value = []
    cartProducts.value.forEach(async (value) => {
      const isSuccess = await cartStore.fetchUpdateCartProduct(value.id, {
        productId: value.productId,
        sizeId: value.sizeId,
        quantity: value.quantity,
      })
      if (!isSuccess) {
        errorCartArray.value.push(value.id)
        isShowAlert.value = 'product-update'
      }
    })
  }
  commonStore.setIsLoading(false)
}
await updateCartProducts()

// Page function
function onUpdateCartArray(id: number) {
  if (!updateCartArray.value.includes(id))
    updateCartArray.value.push(id)
}
function onErrorCartArray(id: number) {
  if (errorCartArray.value.includes(id))
    errorCartArray.value = errorCartArray.value.filter(value => value !== id)
}
async function onToggleDeleteProduct(id: number) {
  commonStore.setIsLoading(true)
  const isSuccess = await cartStore.fetchDeleteCart(id)
  if (isSuccess) {
    cartStore.setCartProducts(cartProducts.value.filter(value => value.id !== id))
    updateCartArray.value.filter(value => value !== id)
    errorCartArray.value.filter(value => value !== id)
  }
  else {
    isShowAlert.value = 'product-delete'
  }
  commonStore.setIsLoading(false)
}
async function onToggleClearCart() {
  commonStore.setIsLoading(true)
  const isSuccess = await cartStore.fetchDeleteAllCart()
  if (isSuccess) {
    cartStore.setCartProducts([])
    updateCartArray.value = []
    errorCartArray.value = []
  }
  else {
    isShowAlert.value = 'clear'
  }
  commonStore.setIsLoading(false)
}
async function onToggleUpdateCart() {
  if (!updateCartArray.value.length)
    return

  commonStore.setIsLoading(true)
  errorCartArray.value = []

  const idArray = await Promise.all(updateCartArray.value.map(async (value) => {
    const product = cartProducts.value.find(product => product.id === value)
    if (product) {
      const isSuccess = await cartStore.fetchUpdateCartProduct(product.id, {
        productId: product.productId,
        sizeId: product.sizeId,
        quantity: product.quantity,
      })
      return isSuccess ? product.id : -1
    }
    return -1
  }))

  idArray.forEach((value, index) => {
    if (value === -1)
      errorCartArray.value.push(updateCartArray.value[index])
  })

  updateCartArray.value = []
  if (errorCartArray.value.length)
    isShowAlert.value = 'product-update'

  commonStore.setIsLoading(false)
}
async function onToggleCheckout() {
  const isValidRequest = cartProducts.value.every(value => value.price > 0)
  if (!isValidRequest) {
    isShowAlert.value = 'product'
    return
  }

  await onToggleUpdateCart()

  if (!isShowAlert.value && !errorCartArray.value.length)
    router.push('/checkout')
}
function confirmModel() {
  isShowAlert.value = ''
}
</script>

<template>
  <div>
    <!-- Start of Main -->
    <main class="main cart-page">
      <!-- Start of Breadcrumb -->
      <nav class="breadcrumb-nav">
        <div class="container">
          <ul class="breadcrumb shop-breadcrumb bb-no">
            <li class="active">
              <NuxtLink to="/cart">
                Shopping Cart
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/checkout">
                Checkout
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/cart">
                Order Complete
              </NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
      <!-- End of Breadcrumb -->

      <!-- Start of PageContent -->
      <div class="page-content">
        <div class="container">
          <div class="row gutter-lg mb-10">
            <div class="col-lg-8 pr-lg-4 mb-6">
              <ShoppingCartTable
                :cart-products="cartProducts"
                :update-cart-array="updateCartArray"
                :error-cart-array="errorCartArray"
                @on-update-cart-array="onUpdateCartArray"
                @on-error-cart-array="onErrorCartArray"
                @on-toggle-delete-product="onToggleDeleteProduct"
                @on-toggle-clear-cart="onToggleClearCart"
                @on-toggle-update-cart="onToggleUpdateCart"
              />
            </div>
            <div class="col-lg-4 sticky-sidebar-wrapper">
              <div class="pin-wrapper">
                <div class="sticky-sidebar sticky-sidebar-fixed">
                  <ShoppingCartSummary
                    :sub-total="cartTotals"
                    @on-toggle-checkout="onToggleCheckout"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End of PageContent -->
    </main>
    <!-- End of Main -->

    <!-- Start of Confirm Popup -->
    <BaseConfirm :is-confirm="isShowAlert" @click="confirmModel()">
      <template #content>
        <div class="text-center icon-box icon-box-side icon-box-light">
          <div class="icon-box-content">
            <h4 class="mb-2 leading-normal">
              Shopping Cart Alert
            </h4>
            <div class="input-form">
              <p v-if="isShowAlert === 'product'" class="!text-[1.4rem] !leading-normal text-gray-500">
                There is a product that is no longer available.
                Please remove that product and continue with your order.
              </p>
              <p v-else-if="isShowAlert === 'product-update'" class="!text-[1.4rem] !leading-normal text-gray-500">
                Some items are out of stock. Please remove that product and try again!
              </p>
              <p v-else-if="isShowAlert === 'product-delete'" class="!text-[1.4rem] !leading-normal text-gray-500">
                Delete product failed. Please try again!
              </p>
              <p v-else-if="isShowAlert === 'clear'" class="!text-[1.4rem] !leading-normal text-gray-500">
                Clear all cart failed. Please try again!
              </p>
              <p v-else class="!text-[1.4rem] !leading-normal text-gray-500">
                Something went wrong. Please try again!
              </p>
            </div>
          </div>
        </div>
      </template>
      <template #button>
        <button
          type="button" class="btn btn-normal btn-round !px-4 !py-2 !my-2"
          @click="confirmModel()"
        >
          close
        </button>
      </template>
    </BaseConfirm>
    <!-- End of Confirm Popup -->
  </div>
</template>

<style scoped lang="scss">
.cart-page {
  & .breadcrumb-nav {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;

    & .breadcrumb {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      border-bottom: 1px solid #eeeeee;
      color: #333;
      font-size: 1.3rem;
      line-height: 1.5;

      padding: 3rem 0;
      margin: 2.5rem 0 2.3rem;

      & a {
        color: inherit;
      }

      &.bb-no {
        border-bottom: none !important;
      }

      & li {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        font-size: 2rem;
        font-weight: 700;
        letter-spacing: -0.025em;
        opacity: 1;
        color: #666;

        &.active {
          color: #336699;
        }

        &:not(:last-child) {
          &::after {
            content: ">";
            position: relative;
            display: inline-block;
            margin-left: 1rem;
            font-size: 2rem;
            font-weight: 700;
            color: #999;
            bottom: 3px;
            line-height: 1;
            vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>
