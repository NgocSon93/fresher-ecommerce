<script setup lang="ts">
import { getPriceDiscount, getTotal } from '~/utils/cart.helper'
import type { CartProducts } from '~/types/cartProducts'

interface CartProps { show: boolean; cartProducts: CartProducts }
interface CartEmits {
  (e: 'update:show', value: boolean): void
  (e: 'removeProductFromCart', id: number): void
}
const props = defineProps<CartProps>()
const emits = defineEmits<CartEmits>()

const cartElement = ref<HTMLElement | null>(null)

const subTotal = computed<number>(() => {
  return getTotal(props.cartProducts)
})

onClickOutside(cartElement, () => {
  emits('update:show', false)
})

function removeProductFromCart(productId: number) {
  emits('removeProductFromCart', productId)
}

function closeCart() {
  emits('update:show', false)
}
</script>

<template>
  <div ref="cartElement" class="dropdown-box transition-all">
    <div class="cart-header">
      <span>Shopping Cart</span>
      <NuxtLink class="btn-close cursor-pointer" @click="closeCart">
        Close<i class="w-icon-long-arrow-right" />
      </NuxtLink>
    </div>

    <template v-if="cartProducts.length">
      <div class="products overflow-x-auto pr-[1.2rem] scrollable">
        <div v-for="product in cartProducts" :key="product.id" class="product product-cart">
          <div class="product-detail">
            <NuxtLink
              :to="`products/${product.slug}/${product.id}`"
              class="product-name mr-4 cursor-pointer"
              @click="closeCart"
            >
              {{ product.productName }}
            </NuxtLink>
            <div class="price-box">
              <span class="product-quantity">
                {{ product.quantity }}
              </span>
              <span class="product-price">{{
                formatMoney(getPriceDiscount(product))
              }}</span>
            </div>
            <div class="product-size">
              <span>Size: </span>
              <span>{{ product.sizeName }}</span>
            </div>
          </div>
          <figure class="product-media">
            <BaseImage :slug="product.slug" :images="product.images" :name="product.productName" />
          </figure>
          <button class="btn btn-link btn-close" aria-label="button" @click="removeProductFromCart(product.id)">
            <i class="fas fa-times" />
          </button>
        </div>
      </div>
      <div class="cart-total">
        <label>Subtotal:</label>
        <span class="price">{{ formatMoney(subTotal) }}</span>
      </div>

      <div class="cart-action">
        <NuxtLink to="/cart" class="btn btn-dark btn-outline btn-rounded" @click="closeCart">
          View Cart
        </NuxtLink>
        <NuxtLink to="/checkout" class="btn btn-primary btn-rounded" @click="closeCart">
          Checkout
        </NuxtLink>
      </div>
    </template>
    <template v-else>
      <div class="py-[2.1rem] pr-[1.2rem] mb-[1.4rem]">
        There are no products in your shopping cart
      </div>
      <div class="cart-action">
        <button class="btn btn-primary btn-rounded btn-continue" @click="closeCart">
          Continue Shopping
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.dropdown-box {
  & .products {
    max-height: calc(100vh - 24rem);

    &.scrollable {
      -webkit-overflow-scrolling: touch;

      &::-webkit-scrollbar-thumb {
        margin-right: 2px;
        background: rgba(0, 0, 0, 0.25);
        border-radius: 5px;
        cursor: pointer;
      }

      &::-webkit-scrollbar {
        height: 0;
        width: 0;
      }
    }

    & .product-size {
      font-size: 1.3rem;
      font-weight: 400;
      color: #666;
      margin-top: 1rem;
    }
  }

  & .cart-action {
    & .btn:last-child.btn-continue {
      margin-left: 0;
      width: 100%;
    }
  }
}
</style>
