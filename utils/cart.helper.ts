import type { CartProduct, CartProducts } from '~/types/cartProducts'

export function getPriceDiscount(product: CartProduct): number {
  if (!product.discountPercent)
    return product.price
  if (new Date(product.discountExpiredAt) < new Date()
    || product.discountUsageCount <= 0
    || product.quantity > product.discountUsageCount)
    return product.price
  const amountDiscount = product.price - (product.price * product.discountPercent / 100)
  return Math.round(amountDiscount * 100) / 100
}

export function getTotal(product: CartProducts): number {
  return product.reduce((acc, product) => {
    const total = acc + getPriceDiscount(product) * product.quantity
    return Math.round(total * 100) / 100
  }, 0)
}
