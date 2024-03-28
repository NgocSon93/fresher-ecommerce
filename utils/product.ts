import type { Discounts, Product, Review } from '~/types/products'

/**
 * Retrieves the currently active discounts for a given product.
 *
 * @param product - The product object to check for active discounts.
 * @returns {Discounts} An array of discount objects that are currently active.
 * If no active discounts are found, returns an empty array.
 */
export function getActiveDiscounts(product: Product): Discounts {
  return product.discounts?.filter((discount) => {
    return discount.active
      && discount.usageCount > 0
      && new Date(discount.promotionTerm) >= new Date()
  }) ?? []
}

/**
 * Calculates the price of a product after applying all active discounts.
 *
 * @param activeDiscounts - An array of active discount objects to be applied.
 * @param price - The original price of the product before discounts.
 * @returns {number} The final price after applying all active discounts.
 */
export function getDiscountedPrice(activeDiscounts: Discounts, price: number): number {
  if (activeDiscounts.length === 0)
    return price
  return activeDiscounts.reduce((acc, discount) => {
    return acc * (1 - discount.percent / 100)
  }, price)
}

/**
 * Processes the pricing information of a given product.
 *
 * This function calculates the original, minimum, maximum, and discounted prices of a product.
 * The discounted price is calculated based on active discounts that meet certain criteria.
 *
 * @param {Product} product - The product for which the pricing is to be processed.
 * @returns An object containing originalPrice, minPrice, maxPrice, and discountedPrice.
 *
 * @remarks
 * - The function considers a discount to be active if it is marked as active, has a positive usage count, and its promotion term is still valid.
 * - Discounts are applied cumulatively to the original price.
 * - If the product has no quantities or active discounts, all prices default to `0`.
 */
export function processPrice(product: Product): {
  originalPrice: number
  minPrice: number
  maxPrice: number
  discountedPrice: number
} {
  let originalPrice: number = 0
  let minPrice: number = 0
  let maxPrice: number = 0
  let discountedPrice: number = 0

  const roundToTwoDecimals = (num: number): number => {
    return Math.round(num * 100) / 100
  }

  // Check if there are active discounts based on new criteria
  const activeDiscounts: Discounts = getActiveDiscounts(product)

  if (product.quantities.length > 0) {
    const prices = product.quantities.map(q => q.price)
    minPrice = Math.min(...prices)
    maxPrice = Math.max(...prices)
    originalPrice = minPrice

    discountedPrice = getDiscountedPrice(activeDiscounts, originalPrice)
  }

  return {
    originalPrice: roundToTwoDecimals(originalPrice),
    minPrice: roundToTwoDecimals(minPrice),
    maxPrice: roundToTwoDecimals(maxPrice),
    discountedPrice: roundToTwoDecimals(discountedPrice),
  }
}

interface ReviewsByRating {
  [key: number]: Review[] | []
}

/**
 * Filters an array of reviews and organizes them into a dictionary based on their rating.
 *
 * @param reviews - An array of `Review` objects to be filtered.
 * @returns An object of type `ReviewsByRating`. This object has keys from 1 to 5, each key holding an array of `Review` objects that match the rating corresponding to the key.
 */
export function filterReviewsByRating(reviews: Review[]): ReviewsByRating {
  const reviewsByRating: ReviewsByRating = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  }

  for (const review of reviews) {
    if (review.rating >= 1 && review.rating <= 5)
      (reviewsByRating[review.rating] as Review[]).push(review)
  }

  return reviewsByRating
}
