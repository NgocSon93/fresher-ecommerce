/**
 * Represents a seeded random number generator.
 */
interface SeededRandom {
  next: () => number
  nextInt: (min: number, max: number) => number
}

/**
 * Creates a seeded random number generator.
 *
 * @param seed - The initial seed value.
 * @returns An object with methods to generate random numbers.
 */
function createSeededRandom(seed: number): SeededRandom {
  const next = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }

  const nextInt = (min: number, max: number): number => {
    return Math.floor(next() * (max - min + 1)) + min
  }
  return { next, nextInt }
}

/**
 * Generates random reviews and calculates their average rating based on a given ID.
 * For a given ID, the function will always generate the same distribution of reviews.
 * The function returns an object with keys representing star ratings (5 to 1) and their respective count of reviews,
 * along with the total number of reviews and the average rating, formatted to one decimal place.
 *
 * @param id - A unique numeric identifier for generating consistent review data.
 * @returns An object with keys as star ratings (5 to 1) and values as count of reviews for that rating,
 *          along with total number of reviews and average rating.
 */
function generateReviews(id: number): { reviews: Record<number, number>; totalReviews: number; average: number } {
  const random = createSeededRandom(id)

  const totalReviews: number = random.nextInt(10, 50)
  const reviewCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }

  for (let i = 0; i < totalReviews;) {
    for (let rating = 5; rating >= 1; rating--) {
      if (i < totalReviews && random.next() > 0.2) {
        reviewCounts[rating]++
        i++
      }
    }
  }

  const totalScore: number = Object.entries(reviewCounts).reduce((acc, [rating, count]) => acc + Number(rating) * count, 0)
  const average: number = Number.parseFloat((totalScore / totalReviews).toFixed(1))

  return {
    reviews: reviewCounts,
    totalReviews,
    average,
  }
}

export { generateReviews }
