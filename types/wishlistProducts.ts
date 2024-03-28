import type { Quantities } from './products'
import type { Images } from './index'

interface WishlistProduct {
  id: number
  name: string
  slug: string
  images: Images
  quantities: Quantities
  description: string
}

type WishlistProducts = WishlistProduct[]

export type {
  WishlistProduct, // Single Wishlist Product object
  WishlistProducts, // List of Wishlist Product objects
}
