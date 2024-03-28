<script setup lang="ts">
import {
  CouponType,
  PaymentMethodEnum,
  paymentMethods,
  shippingMethods,
} from '~/utils/const'
import { getPriceDiscount, getTotal } from '~/utils/cart.helper'
import type { CartProducts } from '~/types/cartProducts'
import type { PaymentMethods } from '~/types/user'

interface OrderSummaryProps {
  products: CartProducts
  activePaymentMethod: number
}
interface OrderSummaryEmits {
  (e: 'onTogglePlaceOrder',
    subTotal: number,
    coupon: string,
    discount: number,
    total: number,
    shipping: number,
    payment: number
  ): void
  (e: 'update:activePaymentMethod', id: number): void
  (e: 'showPopup', bool: boolean): void
}
const props = defineProps<OrderSummaryProps>()
const emits = defineEmits<OrderSummaryEmits>()

const ordersStore = useOrdersStore()
const profileStore = useProfileStore()

const activePayment = ref<number>(PaymentMethodEnum.Cod)
const activeShipping = computed<number>(() => ordersStore.shippingType)
const error = reactive({
  payment: false,
})

const subTotal = computed<number>(() => getTotal(props.products))

const coupon = computed<string>(() => ordersStore.coupon)
const couponAmount = computed<number>(() => {
  if (ordersStore.couponType === CouponType.Fixed)
    return ordersStore.couponAmount ?? 0
  if (ordersStore.couponType === CouponType.Rate)
    return Math.round(subTotal.value * ordersStore.couponAmount) / 100
  return 0
})
const shippingFee = computed<number>(() => {
  const shippingMethod = shippingMethods.find(value => value.id === activeShipping.value)
  return shippingMethod?.value ?? 0
})
const total = computed<number>(() => subTotal.value + shippingFee.value - couponAmount.value)
const payment = computed<PaymentMethods>(() => profileStore.paymentMethod)

watch(() => payment.value, () => {
  if (payment.value.length)
    error.payment = false
})

function onToggleShippingLabel(id: number) {
  ordersStore.setShippingType(id)
}
function onTogglePaymentHeader(id: number) {
  // activePayment.value === id ? activePayment.value = -1 : activePayment.value = id
  activePayment.value = id
}
function onTogglePaymentMethod(id?: number) {
  if (id === undefined) {
    error.payment = false
    emits('showPopup', true)
  }
  else {
    emits('update:activePaymentMethod', id)
  }
}
function onTogglePlaceOrder() {
  if (activePayment.value === PaymentMethodEnum.BankTransfer && !payment.value.length) {
    error.payment = true
  }
  else {
    emits(
      'onTogglePlaceOrder',
      subTotal.value,
      coupon.value,
      couponAmount.value,
      total.value,
      shippingFee.value,
      activePayment.value,
    )
  }
}
</script>

<template>
  <div class="order-summary-wrapper">
    <h3 class="title uppercase -tracking-[0.01em]">
      Your Order
    </h3>
    <div class="order-summary">
      <table class="order-table">
        <thead>
          <tr>
            <th colspan="2">
              <b>Product</b>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in props.products" :key="product.id" class="bb-no">
            <td class="product-name">
              {{ product.productName }}
              <Icon name="lucide:x" class="icon" />
              <span class="product-quantity">{{ product.quantity }}</span>
            </td>
            <td class="product-total">
              {{ formatMoney(getPriceDiscount(product) * product.quantity) }}
            </td>
          </tr>
          <tr class="cart-subtotal bb-no">
            <td>
              <b>Subtotal</b>
            </td>
            <td>
              <b>{{ formatMoney(subTotal) }}</b>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr v-if="coupon" class="coupon bb-no">
            <td colspan="2">
              <h4 class="title title-simple bb-no mb-2 pb-0 pt-3">
                Coupon
              </h4>
              <div id="coupon" class="coupon-detail">
                <span>{{ coupon }}</span>
                <span>{{ couponAmount }}</span>
              </div>
            </td>
          </tr>
          <tr class="shipping-methods">
            <td colspan="2" class="text-left">
              <h4 class="title title-simple bb-no mb-2 pb-0 pt-3">
                Shipping
              </h4>
              <ul id="shipping-method" class="mb-4">
                <li v-for="item in shippingMethods" :key="item.id">
                  <div class="custom-radio">
                    <input
                      :id="item.name" type="radio" name="shipping" class="custom-control-input"
                      :class="{ checked: activeShipping === item.id }" @checked="activeShipping === item.id"
                    >
                    <label
                      :for="item.name" class="custom-control-label color-dark"
                      @click="onToggleShippingLabel(item.id)"
                    >
                      <span>{{ item.text }}</span>
                    </label>
                  </div>
                </li>
              </ul>
            </td>
          </tr>
          <tr class="order-total">
            <th>
              <b>Total</b>
            </th>
            <td>
              <b>{{ formatMoney(total) }}</b>
            </td>
          </tr>
        </tfoot>
      </table>

      <div id="payment_method" class="payment-methods">
        <h4 class="title font-bold tracking-tight pb-0 mb-2">
          Payment Methods
        </h4>
        <div class="accordion payment-accordion">
          <div v-for="item in paymentMethods" :key="item.id" class="card">
            <div class="card-header" @click="onTogglePaymentHeader(item.id)">
              <div class="card-header-text" :class="activePayment === item.id ? 'collap' : 'expand'">
                {{ item.text }}
              </div>
            </div>
            <div class="card-body" :class="activePayment === item.id ? 'expanded' : 'collapsed'">
              <p class="mb-0">
                {{ item.desc }}
              </p>
            </div>
          </div>
          <template v-if="activePayment === PaymentMethodEnum.BankTransfer">
            <div v-if="payment?.length" class="pl-[2.7rem]">
              <div
                v-for="(item, index) in payment" :key="item.id" class="payment-detail"
                :class="{ active: props.activePaymentMethod === index }" @click="onTogglePaymentMethod(index)"
              >
                <span>{{ item.provider }}</span>
                <span>{{ item.accountNumber }}</span>
              </div>
            </div>
            <div v-else class="pl-[2.7rem]">
              <div
                class="payment-detail payment-icon"
                :class="{ error: error.payment }"
                @click="onTogglePaymentMethod()"
              >
                <Icon name="ic:round-plus" />
              </div>
            </div>
          </template>
        </div>
      </div>

      <div class="form-group place-order pt-6">
        <button type="submit" class="btn btn-dark btn-block btn-rounded" @click="onTogglePlaceOrder">
          Place Order
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.order-summary-wrapper {
  padding: 2.5rem 3rem 3rem;
  border: 1px solid #eee;
  border-radius: 3px;

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
  }

  &>.title {
    margin-bottom: 0.9rem;
    padding-bottom: 0;
  }

  & .order-summary {
    & .order-table {
      width: 100%;
      border-collapse: collapse;

      & tr {
        border-bottom: 1px solid #eee;
      }

      & th {
        text-align: start;
        padding: 0.9rem 0;
      }

      & td {
        padding-top: 1.5rem;
        padding-left: 0;
        padding-right: 0;
        vertical-align: bottom;

        &:last-child {
          text-align: end;
        }
      }

      & b {
        font-size: 1.6rem;
        font-weight: 600;
        color: #333;
        letter-spacing: 0;
        margin-bottom: 0;
      }

      & .bb-no {
        border-bottom: none;
      }

      & .product-name {
        font-size: 1.4rem;
        font-weight: 400;
        white-space: normal;

        & .icon {
          font-size: 1.2rem;
          margin-left: 0.5rem;
          margin-right: 0.5rem;
        }
      }

      & .product-total {
        font-size: 1.4rem;
        letter-spacing: -0.05em;
      }

      & .cart-subtotal {
        line-height: 1;
        font-size: 1.6rem;
        color: #333;
        font-weight: 600;
        padding-bottom: 0.8rem;

        & td {
          padding-top: 2rem;
          padding-bottom: 0.9rem;
        }
      }

      & .coupon {
        & .title {
          font-size: 1.5rem;
        }

        & .coupon-detail {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }

      & .shipping-methods {
        & .text-left {
          text-align: left !important;

          & .title {
            font-size: 1.5rem;
          }
        }

        & label {
          display: block;
        }

        & .custom-radio {
          position: relative;
          font-size: 1.4rem;
          color: #666;
          line-height: 2.7;

          & span {
            cursor: pointer;
          }

          & .custom-control-input {
            position: absolute;
            opacity: 0;
            z-index: -1;
          }

          & .custom-control-label {
            letter-spacing: 0;
            padding-left: 2.5rem;

            &::after {
              content: "";
              position: absolute;
              display: -webkit-inline-box;
              display: -ms-inline-flexbox;
              display: inline-flex;
              -webkit-box-align: center;
              -ms-flex-align: center;
              align-items: center;
              justify-content: center;
              left: 0;
              top: 50%;
              -webkit-transform: translateY(-50%);
              transform: translateY(-50%);
              border: 1px solid;
              border-radius: 2px;
              color: #ccc;
              font-family: "Font Awesome 5 Free";
              font-size: 1rem;
              font-weight: 900;
              width: 18px;
              height: 18px;
              padding-top: 1px;
              cursor: pointer;
              -webkit-transition: color 0.3s, background-color 0.3s, content 0.3s, border 0.3s;
              transition: color 0.3s, background-color 0.3s, content 0.3s, border 0.3s;
            }
          }

          & .custom-control-input:checked~.custom-control-label::after,
          & .custom-control-input.checked~.custom-control-label::after {
            content: url('~/assets/svg/check.svg');
            color: #fff;
            border: 2px solid #336699;
            padding-top: 8px;
            padding-left: 0;
            background-color: #333;
            border-color: #333;
          }
        }
      }

      & .order-total {

        & th,
        & td {
          padding-top: 1.8rem;
          padding-bottom: 1.9rem;
        }
      }
    }

    & .payment-methods {
      padding-top: 2.5rem;
      border-bottom: 1px solid #eee;

      & .title {
        font-size: 1.6rem;
      }

      & .accordion {
        overflow: hidden;

        &.payment-accordion {
          margin-bottom: 1.7rem;
        }

        & .card {
          & .card-header {
            color: #333;
            font-size: 1.6rem;
            font-weight: 600;
            letter-spacing: -0.025em;
            line-height: 1.5;

            & .card-header-text {
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              position: relative;
              -webkit-box-align: center;
              -ms-flex-align: center;
              align-items: center;
              transition: background-color 0.4s;

              padding: 1rem 2.7rem;
              font-size: 1.4rem;
              color: #666;
              font-weight: 400;

              cursor: pointer;

              &::after,
              &::before {
                position: absolute;
                top: 50%;
                right: 2rem;
                margin-top: -0.1rem;
                font-family: "wolmart";
                font-size: 1.2rem;
                font-weight: 400;
                color: #333;
              }

              &::before {
                content: "";
                position: absolute;
                left: 0;
                width: 18px;
                height: 18px;
                border: 1px solid #ccd;
                border-radius: 50%;
                -webkit-transform: translateY(-50%);
                transform: translateY(-50%);
              }

              &::after {
                content: "";
                position: absolute;
                left: 5px;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: #333;
                opacity: 0;
                -webkit-transform: translateY(-50%) rotate(180deg);
                transform: translateY(-50%) rotate(180deg);
                -webkit-transition: opacity 0.4s;
                transition: opacity 0.4s;
              }

              &.collap::after {
                opacity: 1;
              }
            }
          }

          & .card-body {
            padding: 0 0 1.5rem;

            & p {
              padding-left: 2.7rem;
              font-size: 1.4rem;
              line-height: 1.7;
              letter-spacing: -0.025em;
            }
          }
        }

        & .payment-detail {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 1.5rem;
          margin-bottom: 0.5rem;
          border: 1px solid #eee;
          border-radius: 3px;
          cursor: pointer;

          &:hover {
            border-color: #336699;
          }

          &.active {
            border-color: #336699;
          }

          &.payment-icon {
            justify-content: center;
          }

          &.error {
            color: red;
            border-color: red;
          }
        }
      }
    }

    & .btn-dark {
      color: #fff;
      border-color: #333;
      background-color: #333;

      &:hover {
        color: #fff;
        border-color: #454545;
        background-color: #454545;
      }
    }
  }
}
</style>
