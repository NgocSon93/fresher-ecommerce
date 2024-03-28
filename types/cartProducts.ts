import type { Images } from './index'

interface CartProduct {
  id: number
  productId: number
  productName: string
  slug: string
  images: Images
  price: number
  quantity: number
  sizeId: number
  sizeName: string
  discountId: number
  discountPercent: number
  discountUsageCount: number
  discountExpiredAt: string
}

type CartProducts = CartProduct[]

export type {
  CartProduct, // Single Cart Product object
  CartProducts, // List of Cart Product objects
}
