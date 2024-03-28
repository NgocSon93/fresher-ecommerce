export function isSlug(str: string): boolean {
  const pattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  return pattern.test(str)
}

export function getSlugWithId(id: number, slug: string | null): string {
  return slug ? `${slug}-${id}` : `${id}`
}

export function getIdBySlug(str: string): string {
  const strArray = str.split('-')
  const lastItem = strArray[strArray.length - 1]

  return (/^[0-9]+$/).test(lastItem) ? lastItem : ''
}

export function getNameBySlug(str: string): string {
  const strArray = str.split('-')
  const lastItem = strArray[strArray.length - 1]

  const regex: RegExp = /^[0-9]+$/

  if (regex.test(lastItem))
    strArray.pop()

  return strArray.join(' ')
}
