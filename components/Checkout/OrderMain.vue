<script setup lang="ts">
import { OrderStatusEnum, paymentMethods } from '~/utils/const'
import type { Order } from '~/types/orders'
import type { Address, PaymentMethod } from '~/types/user'

interface OrderProps { orderCode: string }
const props = defineProps<OrderProps>()

const commonStore = useCommonStore()
const orderStore = useOrdersStore()

const order = computed<Order | null>(() => orderStore.order)
const address = computed<Address | null>(() => {
  const address: Address = {
    id: 0,
    receiver: order.value?.receiver ?? '',
    phone: order.value?.phone ?? '',
    address: order.value?.shippingAddress ?? '',
  }
  return address
})
const paymentMethod = computed<PaymentMethod | null>(() => {
  const paymentMethod: PaymentMethod = {
    id: 0,
    provider: order.value?.payment?.provider ?? '',
    accountNumber: order.value?.payment?.accountNumber ?? '',
  }
  return paymentMethod
})

// Fetch cart products and profile when mounted
;(async function getOrders() {
  commonStore.setIsLoading(true)
  await orderStore.fetchOrderByOrderCode(props.orderCode)
  commonStore.setIsLoading(false)
})()

function getOrderStatus(id: number) {
  if (id === OrderStatusEnum.Pending)
    return 'Pending'
  if (id === OrderStatusEnum.Approved)
    return 'Approved'
  if (id === OrderStatusEnum.Delivered)
    return 'Delivered'
  return ''
}
function getOrderDate(dateString: string) {
  const date = new Date(dateString)
  return date.toDateString()
}
function getPaymentMethod(id: number) {
  const payment = paymentMethods.find(value => value.id === id)
  return payment?.text ?? ''
}
function onToggleBackToList() {
  useRouter().push(`/profile#orders`)
}
</script>

<template>
  <div class="order-wrapper">
    <div class="order-success text-center font-bold text-dark">
      <Icon name="mdi:check-bold" class="check-icon" />
      Thank you. Your order has been received.
    </div>
    <!-- End of Order Success -->

    <template v-if="order">
      <ul class="order-view list-none">
        <li>
          <label>Order number</label>
          <strong>{{ order.code }}</strong>
        </li>
        <li>
          <label>Status</label>
          <strong>{{ getOrderStatus(order.status) }}</strong>
        </li>
        <li>
          <label>Date</label>
          <strong>{{ getOrderDate(order.orderDate) }}</strong>
        </li>
        <li>
          <label>Total</label>
          <strong>{{ formatMoney(order.total) }}</strong>
        </li>
        <li>
          <label>Payment method</label>
          <strong>{{ getPaymentMethod(order.paymentMethod) }}</strong>
        </li>
      </ul>
      <!-- End of Order View -->

      <CheckoutOrderDetails :order="order" />

      <div class="account-addresses">
        <div class="row">
          <div class="col-sm-6 mb-8">
            <MyAccountAddressInformation :address="address" :is-editable="false" />
          </div>
          <div class="col-sm-6 mb-8">
            <MyAccountPaymentMethodsInformation :payment-method="paymentMethod" :is-editable="false" />
          </div>
        </div>
      </div>

      <button class="btn btn-dark btn-rounded btn-icon-left btn-back mt-6" @click="onToggleBackToList">
        <i class="w-icon-long-arrow-left" />
        Back To List
      </button>
    </template>
  </div>
</template>

<style scoped lang="scss">
.order-wrapper {
  & .order-success {
    padding: 3.6rem 1.5rem;
    border: 2px solid #e1e1e1;
    font-size: 2.4rem;

    color: #333;

    & .check-icon {
      font-size: 28px;
      vertical-align: middle;
      margin-right: 0.8rem;
    }
  }

  & .order-view {
    padding: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin: 3.2rem 0;

    & li {
      -webkit-box-flex: 1;
      -ms-flex-positive: 1;
      flex-grow: 1;
      padding: 1rem;
      text-align: center;
      font-size: 1.8rem;
      line-height: 1.6;

      & strong {
        color: #333;
        display: block;
      }
    }
  }

  & .btn-back {
    padding: 0.85em 1.4em;
  }
}
</style>
