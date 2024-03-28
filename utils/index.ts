import type { Images } from '~/types'

/**
 * Formats a number into a currency format.
 * @param amount - The amount to be formatted.
 * @returns The formatted currency string.
 */
export function formatMoney(amount: number | null): string {
  if (amount === null || amount < 0)
    return 'Updatting...'
  if (amount === 0)
    return '$0'

  return `$${amount.toFixed(2)}`
}

/**
 * Retrieves the path of the main image from a given array of image objects.
 *
 * @param images - An array of image objects
 *
 * @returns
 * - The path of the main image as a string.
 * - If no main image is found, the first image in the array is returned.
 * - If no images are found, a default image path is returned.
 */
export function getMainImagePath(images: Images): string {
  const mainImage = images.find(image => image.main === true)
  if (mainImage)
    return mainImage.path
  else if (images.length > 0)
    return images[0].path

  return '/default.png'
}
