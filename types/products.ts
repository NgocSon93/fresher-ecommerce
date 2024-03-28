import type { Categories } from './categories'
import type { Images } from './index'

interface Brand {
  id: number
  name: string
  slug: string
  image: string
}

type Brands = Brand[] | []

interface Concentration {
  id: number
  name: string
  slug: string
}

type Concentrations = Concentration[] | []

interface Size {
  id: number
  name: string
}

type Sizes = Size[] | []

interface Discount {
  id: number
  discountId: number
  name: string
  percent: number
  active: boolean
  usageCount: number
  promotionTerm: string
}

type Discounts = Discount[] | []

interface Quantity {
  id: number
  productId: number
  sizeId: number
  sizeName: string
  price: number
  quantity: number
}

type Quantities = Quantity[] | []

interface Review {
  id: number
  productId: number
  rating: number
  comment: string
  createdAt: string
  images: Images
  user: {
    id: number
    name: string
    email: string
    avatar: string
  }
}

type Reviews = Review[] | []

interface FeaturedProduct {
  id: number
  feature: string
}
interface Product {
  id: number
  name: string
  slug: string
  images: Images
  brand: Brand
  categories: Categories
  concentration: Concentration | null
  discounts: Discounts
  features: FeaturedProduct[] | []
  quantities: Quantities
  total?: number
  description: string
  averageRating: number
  quantitySold: number
  numberOfReviews: number
  reviews: Reviews
}

type Products = Product[]

export type {
  Review,
  Reviews,
  Brand,
  Brands,
  Concentration,
  Concentrations,
  Size,
  Sizes,
  Discounts,
  Quantities,
  Product,
  Products,
}
