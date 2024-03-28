<script setup lang="ts">
import { CouponType, shippingMethods } from '~/utils/const'

interface CartSummaryProps { subTotal: number }
interface CartSummaryEmits { (e: 'onToggleCheckout'): void }
const props = defineProps<CartSummaryProps>()
const emits = defineEmits<CartSummaryEmits>()

const ordersStore = useOrdersStore()

const activeShipping = computed<number>(() => ordersStore.shippingType)
const couponAmount = computed<number>(() => {
  if (ordersStore.couponType === CouponType.Fixed)
    return ordersStore.couponAmount ?? 0
  if (ordersStore.couponType === CouponType.Rate)
    return Math.round(props.subTotal * ordersStore.couponAmount) / 100
  return 0
})
const shippingFee = computed<number>(() => {
  const shippingMethod = shippingMethods.find(value => value.id === activeShipping.value)
  return shippingMethod?.value ?? 0
})
const total = computed<number>(() => props.subTotal + shippingFee.value - couponAmount.value)

watch(() => activeShipping.value, (shipping) => {
  shippingMethods.forEach((value) => {
    value.active = false
    if (value.id === shipping)
      value.active = true
  })
})

function onToggleShippingLabel(id: number) {
  ordersStore.setShippingType(id)
}
function onToggleUpdateTotals() {
  console.log('Cha? de? lam` j')
}
function onToggleCheckout() {
  emits('onToggleCheckout')
}
</script>

<template>
  <div class="cart-summary mb-8">
    <h3 class="cart-title uppercase">
      Cart Totals
    </h3>
    <div class="cart-subtotal flex items-center justify-between">
      <label class="ls-25">Subtotal</label>
      <span>{{ formatMoney(props.subTotal) }}</span>
    </div>

    <hr class="divider">

    <ul class="shipping-methods mb-4">
      <li>
        <label class="shipping-title">Shipping</label>
      </li>
      <li v-for="item in shippingMethods" :key="item.id">
        <div class="custom-radio">
          <input
            :id="item.name" type="radio" name="shipping" class="custom-control-input"
            :class="{ checked: activeShipping === item.id }" @checked="activeShipping === item.id"
          >
          <label :for="item.name" class="custom-control-label color-dark" @click="onToggleShippingLabel(item.id)">
            <span>{{ item.text }}</span>
          </label>
        </div>
      </li>
    </ul>

    <div class="shipping-calculator">
      <p class="shipping-destination lh-1">
        Shipping to <strong>VN</strong>.
      </p>

      <form class="shipping-calculator-form">
        <div class="form-group">
          <BaseButtonSelectInput name="country" active-item="vn" :items="[{ id: 1, name: 'Viet Nam', value: 'vn' }]" />
        </div>
        <div class="form-group">
          <BaseButtonSelectInput name="state" active-item="hn" :items="[{ id: 1, name: 'Ha Noi', value: 'hn' }]" />
        </div>
        <div class="form-group">
          <input class="form-control form-control-md" type="text" name="zipcode" placeholder="ZIP">
        </div>
        <button type="submit" class="btn btn-dark btn-outline btn-rounded mb-10" @click.prevent="onToggleUpdateTotals">
          Update Totals
        </button>
      </form>
    </div>

    <hr class="divider mb-12">
    <div class="order-total flex justify-between items-center">
      <label>Total</label>
      <span class="tracking-tighter">{{ formatMoney(total) }}</span>
    </div>
    <button class="btn btn-block btn-dark btn-icon-right btn-rounded btn-checkout" @click="onToggleCheckout">
      Proceed to checkout
      <Icon name="cil:arrow-right" class="ml-2.5" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.cart-summary {
  padding: 2.3rem 3rem 3rem 3rem;
  border: 1px solid #eee;
  border-radius: 4px;
  line-height: 1;

  & .cart-title {
    margin-bottom: 2.1rem;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  & .cart-subtotal {
    line-height: 1;
    font-size: 1.6rem;
    color: #333;
    font-weight: 600;
    padding-bottom: 0.8rem;
  }

  & .divider {
    margin: 0.5rem 0 1.5rem;
    border: 0;
    border-top: 1px solid #eee;
  }

  & .shipping-methods {
    & label {
      display: block;
    }

    & .shipping-title {
      font-size: 1.6rem;
      line-height: 1.5;
      letter-spacing: -0.025em;
      padding: 1.1rem 0 0.3rem;

      color: #333;
      font-weight: 600;
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

  & .shipping-calculator {
    & .shipping-destination {
      font-size: 1.5rem;
      margin-bottom: 2.2rem;
      line-height: 1;
    }

    & .shipping-calculator-form {
      & .form-group {
        margin-bottom: 1.5rem;

        & .select-box {
          position: relative;

          & .down-icon {
            position: absolute;
            right: 1rem;
            top: 50%;
            -webkit-transform: translateY(-50%);
            transform: translateY(-50%);

            font-size: 1.2rem;
            margin-top: 0.1rem;
          }

          & select {
            cursor: pointer;
          }
        }

        & .form-control {
          display: block;
          line-height: 1.5;
          font-weight: 400;
          box-shadow: none;
          outline: 0;

          position: relative;
          min-height: auto;
          height: 100%;
          border: 1px solid #e3e3e3;
          color: inherit;
          background-color: transparent;
          font-size: 1.2rem;
          font-family: inherit;
          letter-spacing: inherit;
          z-index: 1;
          appearance: none;

          width: 100%;
          max-width: 100%;
          padding: 0.85rem 2.7rem 0.85rem 1rem;
          padding-left: 1rem;
          font-size: 1.4rem;
          color: #666;
          border-color: #eee;
          border-radius: 3px;

          & option {
            font-size: 1.2rem;
          }
        }
      }

      & button {
        border-width: 1px;
      }
    }
  }

  & .order-total {
    color: #333;
    font-size: 1.6rem;
    font-weight: 600;
    letter-spacing: -0.025em;
    margin-bottom: 2.5rem;
  }
}
</style>
