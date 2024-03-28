<script setup lang="ts">
import { getPriceDiscount } from '~/utils/cart.helper'
import type { CartProduct, CartProducts } from '~/types/cartProducts'

interface CartTableProps {
  cartProducts: CartProducts
  updateCartArray: number[]
  errorCartArray: number[]
}
interface CartTableEmits {
  (e: 'onUpdateCartArray', id: number): void
  (e: 'onErrorCartArray', id: number): void
  (e: 'onToggleDeleteProduct', id: number): void
  (e: 'onToggleClearCart'): void
  (e: 'onToggleUpdateCart'): void
}
const props = defineProps<CartTableProps>()
const emits = defineEmits<CartTableEmits>()

const commonStore = useCommonStore()
const ordersStore = useOrdersStore()

const isShowAlert = ref<boolean>(false)
const isUpdateCart = computed<boolean>(() => props.updateCartArray.length > 0)
const coupon = ref<string>(ordersStore.coupon)
const applyCouponMessage = reactive({
  success: '',
  error: '',
})

function onToggleDeleteProduct(id: number) {
  emits('onToggleDeleteProduct', id)
}
function onTogglePlusQuantity(productCart: CartProduct) {
  if (productCart.quantity >= 0) {
    productCart.quantity++
    emits('onUpdateCartArray', productCart.id)
    emits('onErrorCartArray', productCart.id)
  }
}
function onToggleMinusQuantity(productCart: CartProduct) {
  if (productCart.quantity > 1) {
    productCart.quantity--
    emits('onUpdateCartArray', productCart.id)
    emits('onErrorCartArray', productCart.id)
  }
}
function onChangeQuantity(productCart: CartProduct) {
  if (productCart.quantity <= 0)
    productCart.quantity = 1

  emits('onUpdateCartArray', productCart.id)
  emits('onErrorCartArray', productCart.id)
}
function onToggleContinueShopping() {
  const router = useRouter()
  router.back()
}
function onToggleClearCart() {
  if (props.cartProducts.length)
    emits('onToggleClearCart')
  isShowAlert.value = false
}
async function onToggleUpdateCart() {
  if (isUpdateCart.value)
    emits('onToggleUpdateCart')
}
function onFocusCoupon() {
  applyCouponMessage.success = ''
  applyCouponMessage.error = ''
}
async function onToggleApplyCoupon() {
  commonStore.setIsLoading(false)
  if (coupon.value) {
    const isSuccess = await ordersStore.fetchCheckCoupon(coupon.value)
    if (isSuccess) {
      applyCouponMessage.error = ''
      applyCouponMessage.success = 'Apply coupon success.'
    }
    else {
      applyCouponMessage.error = 'This coupon is no longer valid.'
      applyCouponMessage.success = ''
    }
  }
  else {
    ordersStore.resetCoupon()
  }
  commonStore.setIsLoading(false)
}
function confirmModel() {
  isShowAlert.value = !isShowAlert.value
}
</script>

<template>
  <div class="cart-table">
    <div class="table-wrapper">
      <table class="shop-table cart-table w-full">
        <thead>
          <tr>
            <th class="product-header-name">
              <span>Product</span>
            </th>
            <th />
            <th class="product-header-size">
              <span>Size</span>
            </th>
            <th class="product-header-price">
              <span>Price</span>
            </th>
            <th class="product-header-quantity">
              <span>Quantity</span>
            </th>
            <th class="product-header-subtotal">
              <span>Subtotal</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="cartProducts.length > 0">
            <tr v-for="product in props.cartProducts" :key="product.id">
              <td class="product-thumbnail">
                <div class="thumbnail-wrapper">
                  <BaseImage :slug="product.slug" :images="product.images" :name="product.productName" />
                  <button class="btn btn-close" @click="onToggleDeleteProduct(product.id)">
                    <Icon name="ep:close-bold" class="custom-icon" />
                  </button>
                </div>
              </td>
              <td class="product-name">
                <NuxtLink :to="`/products/${product.slug}/${product.id}`">
                  {{ product.productName }}
                </NuxtLink>
              </td>
              <td class="product-size">
                <span>{{ product.sizeName }}</span>
              </td>
              <td class="product-price">
                <span class="amount">{{
                  formatMoney(getPriceDiscount(product))
                }}</span>
              </td>
              <td class="product-quantity">
                <div class="input-group" :class="{ error: props.errorCartArray.includes(product.id) }">
                  <input
                    v-model="product.quantity" type="number" min="1" max="100000" class="quantity form-control"
                    @change="onChangeQuantity(product)"
                  >
                  <button class="quantity-plus" @click="onTogglePlusQuantity(product)">
                    <Icon name="cil:plus" />
                  </button>
                  <button class="quantity-minus" @click="onToggleMinusQuantity(product)">
                    <Icon name="cil:minus" />
                  </button>
                </div>
              </td>
              <td class="product-subtotal">
                <span class="amount">{{
                  formatMoney(getPriceDiscount(product) * product.quantity)
                }}</span>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr class="cart-text">
              <td>There are no products in your shopping cart</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div class="cart-action mb-12">
      <button class="btn btn-dark btn-rounded btn-icon-left btn-shopping mr-auto" @click="onToggleContinueShopping">
        <Icon name="cil:arrow-left" class="mr-2.5" />Continue Shopping
      </button>
      <button
        type="submit" name="clear_cart" value="Clear Cart" class="btn btn-rounded btn-default btn-clear mr-4"
        :class="{ disabled: props.cartProducts.length <= 0 }" @click="confirmModel"
      >
        Clear Cart
      </button>
      <button
        type="submit" name="update_cart" value="Update Cart" class="btn btn-rounded btn-update"
        :class="{ disabled: !isUpdateCart }" @click="onToggleUpdateCart"
      >
        Update Cart
      </button>
    </div>

    <form class="coupon">
      <h5 class="title coupon-title font-weight-bold text-uppercase">
        Coupon Discount
      </h5>
      <input
        id="coupon_code" v-model="coupon" type="text" name="coupon_code" class="form-control mb-4"
        placeholder="Enter coupon code here..." @focus="onFocusCoupon"
      >
      <div class="message">
        <div v-if="applyCouponMessage.success" class="success">
          {{ applyCouponMessage.success }}
        </div>
        <div v-if="applyCouponMessage.error" class="error">
          {{ applyCouponMessage.error }}
        </div>
      </div>
      <button class="btn btn-dark btn-outline btn-rounded btn-apply" @click.prevent="onToggleApplyCoupon">
        Apply Coupon
      </button>
    </form>

    <!-- Start of Confirm Popup -->
    <BaseConfirm :is-confirm="isShowAlert" @click="confirmModel">
      <template #content>
        <div class="text-center icon-box icon-box-side icon-box-light">
          <div class="icon-box-content">
            <h4 class="mb-2 leading-normal">
              Clear cart Alert
            </h4>
            <div class="input-form">
              <p class="!text-[1.4rem] !leading-normal text-gray-500">
                Do you want to clear all cart?
              </p>
            </div>
          </div>
        </div>
      </template>
      <template #button>
        <button
          type="button"
          class="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-xl font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          @click="onToggleClearCart"
        >
          Clear
        </button>
        <button
          type="button"
          class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-xl font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          @click="confirmModel"
        >
          Cancel
        </button>
      </template>
    </BaseConfirm>
    <!-- End of Confirm Popup -->
  </div>
</template>

<style scoped lang="scss">
.cart-table {
  & .table-wrapper {
    position: relative;
    overflow-x: auto;

    & .cart-table {
      text-align: center;

      & img {
        display: block;
        max-width: 10rem;
      }

      & .product-thumbnail {
        width: 11rem;
        padding-right: 1rem;

        & .thumbnail-wrapper {
          position: relative;
          display: block;
          max-width: 10rem;
          width: 100%;

          & a {
            position: relative;
            cursor: pointer;
          }

          & .btn-close {
            position: absolute;
            padding: 0;
            background: #fff;
            border: 2px solid #fff;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.4);
            box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.4);
            top: -14px;
            right: -8px;

            display: flex;
            align-items: center;
            justify-content: center;

            &:hover {
              & .custom-icon {
                color: #336699;
              }
            }

            & .custom-icon {
              margin: 0;
              width: 1.2rem;
              height: 1.2rem;
            }
          }
        }
      }

      & .product-name {
        margin-bottom: 0.7rem;
        font-size: 1.3rem;
        font-weight: 500;
        white-space: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        text-align: start;

        & a {
          cursor: pointer;

          &:hover {
            color: #336699;
          }
        }
      }

      & .product-price {
        -webkit-box-align: baseline;
        -ms-flex-align: baseline;
        align-items: baseline;
        font-weight: 400;
        font-size: 1.6rem;
        letter-spacing: -0.05em;
        line-height: 1.6;
        -webkit-transition: visibility 0.4s, opacity 0.4s;
        transition: visibility 0.4s, opacity 0.4s;
      }

      & .product-quantity {
        & .input-group {
          border: 1px solid #ccc;
          color: #666;
          border-radius: 3px;
          max-width: 120px;

          &.error {
            border-color: red;
          }

          & .form-control {
            appearance: none;
            padding: 0 0.4rem 0 1.6rem;
            max-width: 50%;
            border: none;
          }

          & button {
            display: flex;
            align-items: center;
            justify-content: center;

            &+button {
              margin-right: 3.3rem;
            }
          }
        }
      }

      & .product-subtotal {
        font-size: 1.6rem;
        font-weight: 600;
        color: #333;
        letter-spacing: -0.05em;

        & .amount {
          color: #333;
          text-decoration: none;
        }
      }

      & th {
        padding: 1rem 0 1.2rem;
        font-size: 1.6rem;
        font-weight: 600;
        color: #333;
        text-transform: capitalize;
        line-height: 1.6;
        letter-spacing: -0.025em;
      }

      & td {
        padding: 2rem 0 2rem 0;
        border-top: 1px solid #eee;
        font-size: 1.4rem;
      }

      & td:not(:first-child),
      th:not(:first-child) {
        padding-left: 1rem;
      }

      & tbody {
        border-bottom: 1px solid #eee;
      }
    }
  }

  & .cart-text {
    font-size: 1.4rem;
    padding: 2.2rem 0;
    text-align: start;
  }

  & .cart-action {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 2rem 0;

    & .btn {
      margin-bottom: 1rem;

      &.btn-clear,
      &.btn-update {
        padding: 1em 2em;
        border: 1px solid #ccc;
        background-color: #fff;
        color: #333;

        &:hover {
          border-color: #e1e1e1;
          background-color: #e1e1e1;
        }

        &.disabled {
          border-color: #eee;
          background-color: #eee;
          color: #666;
          cursor: not-allowed;
        }
      }
    }
  }

  & .coupon {
    & .title {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      position: relative;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      text-align: center;
      margin-bottom: 1.7rem;
      font-size: 2rem;
      font-weight: 700;
      line-height: 1.2;

      &.coupon-title {
        font-size: 1.6rem;
        font-weight: 600;
        text-transform: uppercase;
      }
    }

    & .form-control {
      display: block;
      width: 100%;
      min-height: 4.7rem;
      padding: 0.85rem 2rem;
      border: 1px solid #eee;
      font-size: 1.4rem;
      font-family: Poppins, sans-serif;
      line-height: 1.5;
      font-weight: 400;
      color: #999;
      background-color: transparent;
      border-radius: 0;
      -webkit-box-shadow: none;
      box-shadow: none;
      outline: 0;

      width: 100%;
      max-width: 100%;
      border: none;
      border-bottom: 1px solid #eee;
      border-radius: 0;
    }

    & .message {
      margin-bottom: 1.5rem;

      & .success {
        color: green;
      }

      & .error {
        color: red;
      }
    }

    & .btn-apply {
      padding: 1em 2em;
      border-width: 1px;
    }
  }
}
</style>
