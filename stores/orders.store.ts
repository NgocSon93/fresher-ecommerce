import { defineStore } from 'pinia'
import { Api } from '~/utils/api'
import { CouponType, ShippingMethodEnum } from '~/utils/const'
import type { Order, OrderApiResponse, OrderProductRequest, Orders } from '~/types/orders'

interface OrderApiRequest {
  receiver: string
  phone: string
  shippingAddress: string
  shippingFee: number
  paymentMethod: number
  provider: string | null
  accountNumber: string | null
  products: OrderProductRequest[]
  discount: number
  couponCode: string | null
  total: number
  subTotal: number
}

interface CouponApiResponse {
  discount: number
  type: CouponType
}

const api = new Api()

export const useOrdersStore = defineStore('orders', () => {
  const orders: Ref<Orders> = ref([])
  const order: Ref<Order | null> = ref(null)
  const coupon: Ref<string> = ref('')
  const couponAmount: Ref<number> = ref(0)
  const couponType: Ref<number> = ref(CouponType.Fixed)
  const shippingType: Ref<number> = ref(ShippingMethodEnum.FreeShip)

  function setOrders(newOrders: Orders) {
    orders.value = newOrders
  }

  function setOrder(newOrder: Order | null) {
    order.value = newOrder
  }

  function setCoupon(newCoupon: string) {
    coupon.value = newCoupon
  }

  function setCouponAmount(amount: number) {
    couponAmount.value = amount
  }

  function setCouponType(type: CouponType) {
    couponType.value = type
  }

  function setShippingType(type: number) {
    shippingType.value = type
  }

  function resetCoupon() {
    setCoupon('')
    setCouponAmount(0)
    setCouponType(CouponType.Fixed)
  }

  async function fetchAllOrders() {
    const { data, error } = await api.get<Orders>('/orders')

    if (error.value) {
      console.error(`Error fetching all orders: ${error.value?.message}`)
      return false
    }

    setOrders(data.value || [])
    return true
  }

  async function fetchOrderByOrderCode(code: string) {
    const { data, error } = await api.get<Order>(`/orders/${code}`)

    if (error.value) {
      console.error(`Error fetching all orders: ${error.value?.message}`)
      return false
    }

    setOrder(data.value ?? null)
    return true
  }

  async function fetchCheckout(body: OrderApiRequest) {
    const { data, error } = await api.post<OrderApiResponse>('/orders', body)

    if (error.value) {
      console.error(`Error fetching checkout: ${error.value?.message}`)
      return null
    }

    if (!data.value)
      return null

    resetCoupon()
    return data.value
  }

  async function fetchCompletePayment(orderCode: string) {
    const { error } = await api.post(`/orders/${orderCode}/payment`)

    if (error.value) {
      console.error(`Error fetching checkout: ${error.value?.message}`)
      return false
    }

    return true
  }

  async function fetchCheckCoupon(coupon: string) {
    const { data, error } = await api.get<CouponApiResponse>(`/coupon/${coupon}`)

    if (error.value) {
      console.error(`Error fetching checking coupon: ${error.value?.message}`)
      return false
    }

    if (!data.value || !data.value.discount || !data.value.type)
      return false

    setCoupon(coupon)
    setCouponAmount(data.value.discount)
    setCouponType(data.value.type)
    return true
  }

  return {
    orders,
    order,
    coupon,
    couponAmount,
    couponType,
    shippingType,
    setOrders,
    setOrder,
    setCoupon,
    setShippingType,
    resetCoupon,
    fetchAllOrders,
    fetchOrderByOrderCode,
    fetchCheckout,
    fetchCompletePayment,
    fetchCheckCoupon,
  }
})
