import type { Images } from './index'

interface Category {
  id: number
  name: string
  parent_id: number | null
  slug: string | null
  images: Images
  totalProducts: number
}

type Categories = Category[]
interface HierarchicalCategory extends Category {
  childs: HierarchicalCategories
}

type HierarchicalCategories = HierarchicalCategory[]

export type {
  Category, // Single Category object
  Categories, // List of Category objects
  HierarchicalCategories, // List of category with nested childs
}
