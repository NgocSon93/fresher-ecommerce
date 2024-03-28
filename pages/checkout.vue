<script setup lang="ts">
import { getPriceDiscount } from '~/utils/cart.helper'
import { PaymentMethodEnum } from '~/utils/const'
import type { CartProducts } from '~/types/cartProducts'
import type { Address, Addresses, PaymentMethod } from '~/types/user'
import type { OrderApiResponse, OrderProductRequest } from '~/types/orders'

definePageMeta({
  middleware: ['auth'],
})

useSeoMeta({
  title: 'Checkout',
})

const cartStore = useCartStore()
const commonStore = useCommonStore()
const ordersStore = useOrdersStore()
const profileStore = useProfileStore()

const activeAddress = ref<number>(0)
const activePaymentMethod = ref<number>(0)

const cartProducts = computed<CartProducts>(() => cartStore.cartProducts)
const addresses = computed<Addresses>(() => profileStore.addresses)
const address = computed<Address | null>(() => {
  if (!profileStore.addresses.length)
    return null
  return profileStore.addresses[activeAddress.value] ?? null
})
const paymentMethod = computed<PaymentMethod | null>(() => {
  if (!profileStore.paymentMethod.length)
    return null
  return profileStore.paymentMethod[activePaymentMethod.value] ?? null
})
const productsRequest = computed<OrderProductRequest[]>(() => {
  if (cartStore.cartProducts.length) {
    return cartStore.cartProducts.map(((product) => {
      const req: OrderProductRequest = {
        productId: product.productId,
        quantity: product.quantity,
        price: product.price,
        sizeId: product.sizeId,
        sizeName: product.sizeName,
        discountId: product.discountId,
      }

      const price = getPriceDiscount(product)
      if (price < product.price)
        req.price = price
      else
        req.discountId = null

      return req
    }))
  }
  return []
})
const orderDetail = ref<OrderApiResponse | null>(null)

const styleObj = ref<Record<string, string>>({ display: 'none' })
const isShowCoupon = ref<boolean>(false)
const isShowAddAddress = ref<boolean>(addresses.value.length === 0)
const isShowAlert = ref<string>('')
const isShowPopup = ref<boolean>(false)
const isOrderSuccess = ref<boolean>(false)
const coupon = ref<string>(ordersStore.coupon)
const applyCouponMessage = reactive({
  success: '',
  error: '',
})

// Fetch cart products, payment method, address when mounted
commonStore.setIsLoading(true)
// Fetch all cart methods
await cartStore.fetchAllCarts()
// Fetch all payment methods
await profileStore.fetchAllPaymentMethod()
// Fetch all addresses
await profileStore.fetchAllAddress()
commonStore.setIsLoading(false)

watchEffect(() => {
  isShowAddAddress.value = addresses.value.length === 0
})

// Page function
function onToggleShowCoupon() {
  if (isShowCoupon.value) {
    isShowCoupon.value = false
    setTimeout(() => {
      styleObj.value.display = 'none'
    }, 490)
  }
  else {
    styleObj.value.display = 'block'
    isShowCoupon.value = true
  }
}
function onFocusCoupon() {
  applyCouponMessage.success = ''
  applyCouponMessage.error = ''
}
async function onToggleApplyCoupon() {
  commonStore.setIsLoading(true)
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
function onToggleAddress(id: number) {
  activeAddress.value = id
}
function onToggleShowAddAddress() {
  isShowAddAddress.value = !isShowAddAddress.value
}
function onToggleShowPopup(bool: boolean) {
  isShowPopup.value = bool
}
async function onAddAddress() {
  commonStore.setIsLoading(true)
  await profileStore.fetchAllAddress()
  commonStore.setIsLoading(false)
}
async function onAddPayment() {
  commonStore.setIsLoading(true)
  await profileStore.fetchAllPaymentMethod()
  commonStore.setIsLoading(false)
}
async function onTogglePlaceOrder(
  subTotal: number,
  coupon: string,
  discount: number,
  total: number,
  shipping: number,
  payment: number,
) {
  if (!address.value) {
    isShowAlert.value = 'address'
    return
  }
  if (!productsRequest.value.length) {
    isShowAlert.value = 'product'
    return
  }
  const isValidRequest = productsRequest.value.every(value => value.price > 0)
  if (!isValidRequest) {
    isShowAlert.value = 'product-price'
    return
  }

  commonStore.setIsLoading(true)
  const res = await ordersStore.fetchCheckout({
    receiver: address.value.receiver,
    phone: address.value.phone,
    shippingAddress: address.value.address,
    shippingFee: shipping,
    paymentMethod: payment,
    provider: paymentMethod.value?.provider ?? null,
    accountNumber: paymentMethod.value?.accountNumber ?? null,
    products: productsRequest.value,
    discount,
    couponCode: coupon || null,
    total,
    subTotal,
  })

  if (res) {
    orderDetail.value = res
    isOrderSuccess.value = true
    const isSuccess = await cartStore.fetchDeleteAllCart()
    if (isSuccess)
      cartStore.setCartProducts([])
    if (res.paymentMethod === PaymentMethodEnum.BankTransfer)
      await ordersStore.fetchCompletePayment(res.orderCode)
  }
  else {
    isShowAlert.value = 'fail'
  }

  commonStore.scrollToNav()
  commonStore.setIsLoading(false)
}
function confirmModel() {
  if (isShowAlert.value === 'fail')
    cartStore.fetchAllCarts()
  isShowAlert.value = ''
}
</script>

<template>
  <div>
    <!-- Start of Main -->
    <main class="main checkout-page">
      <!-- Start of Breadcrumb -->
      <nav class="breadcrumb-nav">
        <div class="container">
          <ul class="breadcrumb shop-breadcrumb bb-no">
            <li>
              <NuxtLink to="/cart">
                Shopping Cart
              </NuxtLink>
            </li>
            <li :class="{ active: !isOrderSuccess }">
              <NuxtLink to="/checkout">
                Checkout
              </NuxtLink>
            </li>
            <li :class="{ active: isOrderSuccess }">
              <NuxtLink to="/checkout">
                Order Complete
              </NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
      <!-- End of Breadcrumb -->

      <!-- Start of PageContent -->
      <div class="page-content">
        <div v-if="!isOrderSuccess" class="container mb-20">
          <div class="coupon-toggle">
            Have a coupon?
            <button class="show-coupon font-weight-bold text-uppercase text-dark" @click="onToggleShowCoupon">
              Enter your code
            </button>
          </div>
          <div class="coupon-content" :class="{ open: isShowCoupon }" :style="styleObj">
            <p>If you have a coupon code, please apply it below.</p>
            <div class="input-wrapper-inline">
              <input
                id="coupon_code" v-model="coupon" type="text" name="coupon_code"
                class="form-control form-control-md mr-1 mb-2" placeholder="Coupon code" @focus="onFocusCoupon"
              >
              <button
                type="submit" class="btn button btn-rounded btn-coupon mb-2" name="apply_coupon"
                value="Apply coupon" @click="onToggleApplyCoupon"
              >
                Apply Coupon
              </button>
            </div>
            <div class="message">
              <div v-if="applyCouponMessage.success" class="success">
                {{ applyCouponMessage.success }}
              </div>
              <div v-if="applyCouponMessage.error" class="error">
                {{ applyCouponMessage.error }}
              </div>
            </div>
          </div>
          <div class="flex -mx-[15px]">
            <div class="flex-[2] px-[15px] pr-8">
              <div class="billing-wrapper">
                <h3 class="title billing-title text-uppercase ls-10 pt-1 pb-3 mb-2">
                  Billing Details
                </h3>
                <div class="account-addresses">
                  <div class="add-address">
                    <button class="btn btn-outline btn-dark btn-rounded mb-2" @click="onToggleShowAddAddress">
                      Add Address
                    </button>
                    <MyAccountAddressForm
                      v-if="isShowAddAddress"
                      @on-close="onToggleShowAddAddress"
                      @on-update-data="onAddAddress"
                    />
                  </div>
                  <div v-if="addresses.length" class="row mt-4">
                    <div v-for="(item, index) in addresses" :key="item.id" class="col-sm-6">
                      <div
                        class="address-wrapper cursor-pointer" :class="{ active: activeAddress === index }"
                        @click="onToggleAddress(index)"
                      >
                        <MyAccountAddressInformation
                          :address="item"
                          :is-editable="false"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-[1] px-[15px]">
              <CheckoutSummary
                v-model:active-payment-method="activePaymentMethod"
                :products="cartProducts"
                @on-toggle-place-order="onTogglePlaceOrder"
                @show-popup="onToggleShowPopup"
              />
            </div>
          </div>
        </div>

        <div v-else class="container mb-20">
          <CheckoutOrderMain v-if="orderDetail" :order-code="orderDetail.orderCode" />
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
              Checkout Alert
            </h4>
            <div class="input-form">
              <p v-if="isShowAlert === 'address'" class="!text-[1.4rem] !leading-normal text-gray-500">
                You must select a shipping address before completing your order.
                If you do not have an address, please add one to your shipping information.
              </p>
              <p v-else-if="isShowAlert === 'product'" class="!text-[1.4rem] !leading-normal text-gray-500">
                You need to add products to your cart before you can check out.
                Please add products to your cart and continue with your order.
              </p>
              <p v-else-if="isShowAlert === 'product-price'" class="!text-[1.4rem] !leading-normal text-gray-500">
                There is a product that is no longer available.
                Please remove that product and continue with your order.
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
          type="button" class="btn btn-normal btn-round !px-4 !py-2 !my-2 !ml-2"
          @click="confirmModel()"
        >
          close
        </button>
        <button
          type="button" class="btn btn-primary btn-normal btn-round !px-4 !py-2 !my-2"
          @click="useRouter().push('/cart')"
        >
          Back to cart
        </button>
      </template>
    </BaseConfirm>
    <!-- End of Confirm Popup -->
    <!-- Start of Modal Popup -->
    <BaseModal v-model:is-show="isShowPopup">
      <template #content>
        <div class="px-20 py-12 w-[50rem]">
          <MyAccountPaymentMethodsForm
            :list-payment-methods="paymentMethods"
            @on-close="onToggleShowPopup(false)"
            @on-update-data="onAddPayment"
          />
        </div>
      </template>
    </BaseModal>
    <!-- End of Modal Popup -->
  </div>
</template>

<style scoped lang="scss">
.checkout-page {
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

  & .page-content {
    & .coupon-toggle {
      margin-bottom: 2.8rem;
      line-height: 1.1;
    }

    & .coupon-content {
      display: none;
      margin-bottom: 2.4rem;
      padding: 3rem;
      border: 1px solid #eee;
      border-top-width: 3px;
      overflow: hidden;
      animation: collapsing 0.5s;

      &.open {
        animation: expanding 0.5s;
      }

      & p {
        margin-bottom: 1.9rem;
        line-height: 1.7;
      }

      & .input-wrapper-inline {
        max-width: 40rem;

        & .form-control {
          margin-bottom: 1.3rem;
          padding-left: 2rem;
          border-radius: 0.3rem;
          font-size: 1.4rem;

          &:focus {
            border-color: #999;
          }
        }

        & .btn-coupon {
          border-color: #eee;
          background-color: #eee;
          color: #333;

          &:hover {
            background-color: #336699;
            border-color: #336699;
            color: #fff;
          }
        }
      }

      & .message {
        margin-top: 1.5rem;

        & .success {
          color: green;
        }

        & .error {
          color: red;
        }
      }
    }

    & .billing-wrapper {
      & .account-addresses {
        & .address-wrapper {
          border-radius: 3rem;
          padding: 2rem;
          margin-bottom: 4rem;
          transition: all 0.3s;

          &.active {
            box-shadow: 5px 5px 10px 3px rgba(0, 0, 0, 0.2);
          }

          & .info-address {
            margin: 0 !important;
          }
        }
      }
    }
  }
}

@keyframes expanding {
  0% {
    height: 0;
    opacity: 0.1;
    padding: 0 3rem;
    margin-bottom: 0;
  }

  100% {
    height: 176px;
    opacity: 1;
    padding: 3rem;
    margin-bottom: 2rem;
  }
}

@keyframes collapsing {
  0% {
    height: 176px;
    opacity: 1;
    padding: 3rem;
    margin-bottom: 2rem;
  }

  100% {
    height: 0;
    opacity: 0.1;
    padding: 0 3rem;
    margin-bottom: 0;
  }
}
</style>
