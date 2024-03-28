import type { Discounts, Quantities } from '~/types/products'

export function checkValidDiscount(active: boolean, usageCount: number, promotionTerm: string) {
  return active && usageCount > 0 && new Date(promotionTerm) >= new Date()
}

/**
 * Get random number in range.
 * @param from - Start number.
 * @param to - End number.
 * @param fixed - The fixed value default 5.
 * @returns The random number.
 */
export function getRandomInRange(from: any, to: any, fixed: any = 5): number {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1
}

/**
 * Get the minimum price of product.
 * @param quantities - The quantities of product to get price.
 * @returns The minimum price.
 */
export function getMinPrice(quantities: Quantities): number {
  if (!quantities || quantities.length === 0)
    return 0
  // return product.quantities.reduce((prevPrice, product) => Math.min(prevPrice, product.price), product.quantities[0].price)
  return Math.min(...quantities.map(quantity => quantity.price))
}

/**
 * Get the maximum price of product.
 * @param quantities - The quantities of product to get price.
 * @returns The maximum price.
 */
export function getMaxPrice(quantities: Quantities): number {
  if (!quantities || quantities.length === 0)
    return 0
  return Math.max(...quantities.map(quantity => quantity.price))
}

/**
 * Get the price of product.
 * @param quantities - The quantities of product to get price.
 * @returns The price or range price of product.
 */
export function getPrice(quantities: Quantities): number | number[] {
  if (!quantities || quantities.length === 0)
    return -1
  if (quantities.length === 1)
    return quantities[0].price
  return [getMinPrice(quantities), getMaxPrice(quantities)]
}

/**
 * Get the maximum discount value.
 * @param discounts - The discounts of product has discount.
 * @returns The discount value.
 */
export function getDiscount(discounts: Discounts): number {
  if (!discounts || discounts.length === 0) {
    return 0
  }
  else {
    return Math.max(...discounts.map((discount) => {
      if (checkValidDiscount(discount.active, discount.usageCount, discount.promotionTerm))
        return discount.percent
      return 0
    }))
  }
}

/**
 * Get the amount after discount.
 * @param amount - The amount to get discount.
 * @param discount - The discount value.
 * @returns The amount after discount.
 */
export function getAmountDiscount(amount: number, discount: number = 0): number {
  if (!discount)
    return amount
  const amountDiscount = amount - (amount * discount / 100)
  return Math.round(amountDiscount * 100) / 100
}
