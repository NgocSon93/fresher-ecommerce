import { defineStore } from 'pinia'
import { useCustomFetch } from '~/composables/useCustomFetch'
import type { Categories, HierarchicalCategories } from '@/types/categories'

/**
 * Converts a flat array of categories into a map keyed by parent IDs.
 * Each key maps to an array of child categories, facilitating efficient hierarchical structure building.
 *
 * @param categories - The flat array of categories.
 * @returns A map of parent IDs to arrays of their child categories.
 */
function mapParentToChildren(categories: Categories): Record<number, Categories> {
  return categories.reduce((map, category) => {
    const { parent_id } = category
    if (parent_id) {
      if (!map[parent_id])
        map[parent_id] = [] as Categories
      map[parent_id].push(category)
    }
    return map
  }, {} as Record<number, Categories>)
}

/**
 * Extracts top-level categories (those without a parent) from the given array.
 *
 * @param categories - The array of categories.
 * @returns An array of top-level categories.
 */
function getTopLevelCategories(categories: Categories): Categories {
  return categories.filter(category => !category.parent_id)
}

/**
 * Builds a hierarchical structure of categories using a parent-child map.
 * This approach avoids repeated filtering and improves performance.
 *
 * @param categories - The array of categories to structure.
 * @param parentMap - The map of parent IDs to their child categories.
 * @param parentId - The ID of the parent category, if any.
 * @returns A hierarchical structure of categories.
 */
function buildCategoryHierarchy(categories: Categories, parentMap: Record<number, Categories>, parentId: number | null = null): HierarchicalCategories {
  return categories
    .filter(category => category.parent_id === parentId)
    .map(category => ({
      ...category,
      childs: buildCategoryHierarchy(parentMap[category.id] || [], parentMap, category.id),
    }))
}

export const useCategoryStore = defineStore('categories', {
  state: () => ({
    categories: [] as Categories,
    topLevelCategories: [] as Categories,
    hierarchicalCategories: [] as HierarchicalCategories,
  }),

  actions: {
    async fetchData() {
      const { data, error } = await useCustomFetch<Categories>('/categories')

      if (error.value)
        throw createError(error.value)

      if (!data.value)
        throw createError('No categories found')

      data.value = data.value.map(category => ({
        ...category,
        slug: category.slug || 'demo-slug',
      }))

      this.setCategories(data.value)
    },

    setCategories(newCategories: Categories) {
      const parentMap = mapParentToChildren(newCategories)

      this.topLevelCategories = getTopLevelCategories(newCategories)
      this.categories = newCategories
      this.hierarchicalCategories = buildCategoryHierarchy(this.topLevelCategories, parentMap)
    },
  },
})
