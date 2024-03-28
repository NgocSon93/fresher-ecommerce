interface Image {
  id: number
  path: string
  main?: boolean
}

type Images = Image[] | []

interface NavigationItem {
  label: string
  url: string
  active: boolean
}

export type {
  Image,
  Images,
  NavigationItem,
}
