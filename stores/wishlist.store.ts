import { defineStore } from 'pinia'
import { Api } from '~/utils/api'
import type { WishlistProducts } from '~/types/wishlistProducts'

const api = new Api()

export const useWishlistStore = defineStore('wishlist', () => {
  const wishlistProducts: Ref<WishlistProducts> = ref([])

  function setWishlistProducts(products: WishlistProducts | []) {
    wishlistProducts.value = products
  }

  async function fetchWishlistProducts() {
    const { data, error } = await api.get<WishlistProducts>('/favorite-products')

    if (error.value) {
      console.error(`Error fetching all wishlist products: ${error.value?.message}`)
      return false
    }

    setWishlistProducts(data.value || [])
    return true
  }

  async function fetchAddToWishlist(id: number) {
    const { error } = await api.put('/favorite-products/add-remove', { productId: id })

    if (error.value) {
      console.error(`Error fetching add to wishlist: ${error.value?.message}`)
      return false
    }

    return true
  }

  async function fetchDeleteWishlist(id: number) {
    const { error } = await api.put(`/favorite-products/add-remove`, { productId: id })

    if (error.value) {
      console.error(`Error fetching delete from wishlist: ${error.value?.message}`)
      return false
    }

    return true
  }

  return {
    wishlistProducts,
    setWishlistProducts,
    fetchWishlistProducts,
    fetchAddToWishlist,
    fetchDeleteWishlist,
  }
})
