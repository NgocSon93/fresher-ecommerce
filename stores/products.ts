import { defineStore } from 'pinia'
import { useCustomFetch } from '@/composables/useCustomFetch'
import type { Products } from '@/types/products'

interface ProductApiResponse {
  data: Products
  meta: { total: number; perPage: number; currentPage: number; lastPage: number; totalPage: number }
  message: string
  status: boolean
}

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [] as Products,
    newProducts: [] as Products,
    productsWithCategory: {} as Record<string, Products>,
    categoryProducts: [] as Products,
    totalProducts: 0,
    currentPage: 0,
    totalPage: 0,
    isLoading: false,
    hasNoProducts: false,
  }),
  actions: {
    async fetchProductsCategory(query: Record<string, string>) {
      const { data } = await useCustomFetch<ProductApiResponse>('/products', { query })

      this.categoryProducts = data.value?.data || []
      this.totalProducts = data.value?.meta.total || 0
      this.currentPage = data.value?.meta.currentPage || 0
      this.totalPage = data.value?.meta.totalPage || 0
    },

    async fetchProductsByCategory(category: string, limit = 8) {
      if (this.productsWithCategory[category]) {
        if (this.productsWithCategory[category].length > limit) {
          this.productsWithCategory[category] = this.productsWithCategory[category].slice(0, limit)
          return
        }
        else if (this.productsWithCategory[category].length === limit) {
          return
        }
      }

      const { data } = await useCustomFetch('/products', {
        query: {
          'category[]': category,
          'perPage': limit,
        },
        transform: (res: ProductApiResponse): Products => res.data,
      })

      this.productsWithCategory[category] = data.value || []
    },

    async fetchNewProducts(limit = 10) {
      if (this.newProducts && this.newProducts.length === limit)
        return

      if (this.newProducts && this.newProducts.length > limit) {
        this.newProducts = this.newProducts.slice(0, limit)
        return
      }

      const { data } = await useCustomFetch('/products', {
        query: {
          perPage: limit,
        },
        transform: (res: ProductApiResponse): Products => res.data,
      })

      this.newProducts = data.value || []
    },
  },
})
