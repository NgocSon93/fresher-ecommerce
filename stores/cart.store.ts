import { defineStore } from 'pinia'
import { Api } from '~/utils/api'
import type { CartProducts } from '~/types/cartProducts'

interface CartApiRequest {
  productId: number
  sizeId: number
  quantity: number
}

const api = new Api()

export const useCartStore = defineStore('cart', () => {
  const cartProducts: Ref<CartProducts> = ref([])

  function setCartProducts(products: CartProducts) {
    cartProducts.value = products
  }

  async function fetchAllCarts() {
    const { data, error } = await api.get<CartProducts>('/carts')

    if (error.value) {
      console.error(`Error fetching all cart: ${error.value?.message}`)
      return false
    }

    setCartProducts(data.value || [])
    return true
  }

  async function fetchAddToCart(body: CartApiRequest) {
    const { error } = await api.post('/carts/add-to-cart', body)

    if (error.value) {
      console.error(`Error fetching add to cart: ${error.value?.message}`)
      return false
    }

    return true
  }

  async function fetchUpdateCartProduct(id: number, body: CartApiRequest) {
    const { error } = await api.patch(`/carts/${id}`, body)

    if (error.value) {
      console.error(`Error fetching delete from cart: ${error.value?.message}`)
      return false
    }

    return true
  }

  async function fetchDeleteCart(id: number) {
    const { error } = await api.delete(`/carts/${id}`)

    if (error.value) {
      console.error(`Error fetching delete from cart: ${error.value?.message}`)
      return false
    }

    return true
  }

  async function fetchDeleteAllCart() {
    const { error } = await api.delete(`/carts`)

    if (error.value) {
      console.error(`Error fetching delete all from cart: ${error.value?.message}`)
      return false
    }

    return true
  }

  return {
    cartProducts,
    setCartProducts,
    fetchAllCarts,
    fetchAddToCart,
    fetchUpdateCartProduct,
    fetchDeleteCart,
    fetchDeleteAllCart,
  }
})
