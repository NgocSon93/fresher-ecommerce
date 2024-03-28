import { defineStore } from 'pinia'
import { Api } from '~/utils/api'
import type { Images } from '~/types'
import type { Brands, Concentrations, Sizes } from '~/types/products'
import type { Banner } from '~/types/banners'
import type { Page } from '~/types/pages'

const api = new Api()

interface BrandApiResponse {
  data: Brands
}

interface BannersApiResponse {
  data: Banner[]
}

interface PagesApiResponse {
  data: Page[]
}

export const useCommonStore = defineStore('common', () => {
  const isLoading: Ref<boolean> = ref(false)
  const staticHeaderHeight: Ref<number> = ref(0)
  const navHeight: Ref<number> = ref(0)
  const fullHeaderHeight: Ref<number> = computed(() => staticHeaderHeight.value + navHeight.value)
  const breadcrumbHeight: Ref<number> = ref(0)
  const brands: Ref<Brands> = ref([])
  const concentrations: Ref<Concentrations> = ref([])
  const sizes: Ref<Sizes> = ref([])
  const banners: Ref<Banner[]> = ref([])
  const pages: Ref<Page[]> = ref([])

  function setIsLoading(bool: boolean) {
    isLoading.value = bool
  }

  function setStaticHeaderHeight(num: number) {
    staticHeaderHeight.value = num
  }

  function setNavHeight(num: number) {
    navHeight.value = num
  }

  function setBreadcrumbHeight(num: number) {
    breadcrumbHeight.value = num
  }

  function setBrands(newBrands: Brands) {
    brands.value = newBrands
  }

  function setConcentrations(newConcentrations: Concentrations) {
    concentrations.value = newConcentrations
  }

  function setSizes(newSizes: Sizes) {
    sizes.value = newSizes
  }

  function setBanners(newBanners: Banner[]) {
    banners.value = newBanners
  }

  function setPages(newPages: Page[]) {
    pages.value = newPages
  }

  async function fetchAllBrands() {
    const { data, error } = await api.get<BrandApiResponse>('/brands')

    if (error.value) {
      console.error(`Error fetching all brands: ${error.value?.message}`)
      return false
    }

    setBrands(data.value?.data ?? [])
    return true
  }

  async function fetchAllConcentrations() {
    const { data, error } = await api.get<Concentrations>('/concentrations')

    if (error.value) {
      console.error(`Error fetching all concentrations: ${error.value?.message}`)
      return false
    }

    setConcentrations(data.value || [])
    return true
  }

  async function fetchAllSizes() {
    const { data, error } = await api.get<Sizes>('/sizes')

    if (error.value) {
      console.error(`Error fetching all sizes: ${error.value?.message}`)
      return false
    }

    setSizes(data.value || [])
    return true
  }

  async function fetchAllBanners() {
    const { data, error } = await api.get<BannersApiResponse>('/banners')

    if (error.value) {
      console.error(`Error fetching all banners: ${error.value?.message}`)
      return false
    }

    setBanners(data.value?.data ?? [])
    return true
  }

  async function fetchAllPages() {
    const { data, error } = await api.get<PagesApiResponse>('/pages')

    if (error.value) {
      console.error(`Error fetching all pages: ${error.value?.message}`)
      return false
    }

    const res = data.value?.data
    if (res?.length) {
      setPages(res.filter((value: Page) => {
        return value.slug.toLowerCase() !== 'about'
      }))
    }
    else {
      setPages([])
    }
    return true
  }

  function getMainImageUrl(images: Images) {
    return images.find(image => image.main)?.path ?? ''
  }

  function scrollToNav() {
    window.scrollTo({
      top: staticHeaderHeight.value,
      behavior: 'smooth',
    })
  }

  function scrollToPosition(position: number) {
    window.scrollTo({
      top: position,
      behavior: 'smooth',
    })
  }

  return {
    isLoading,
    staticHeaderHeight,
    navHeight,
    fullHeaderHeight,
    breadcrumbHeight,
    brands,
    concentrations,
    sizes,
    banners,
    pages,
    setIsLoading,
    setStaticHeaderHeight,
    setNavHeight,
    setBreadcrumbHeight,
    setBrands,
    fetchAllBrands,
    fetchAllConcentrations,
    fetchAllSizes,
    fetchAllBanners,
    fetchAllPages,
    getMainImageUrl,
    scrollToNav,
    scrollToPosition,
  }
})
