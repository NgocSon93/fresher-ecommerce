<script setup lang="ts">
import { SortByEnum } from '~/utils/const'
import type { Category } from '~/types/categories'
import type { Products } from '~/types/products'
import { getMainImagePath } from '~/utils'

definePageMeta({
  validate: async (route) => {
    return isSlug(route.params?.slug as string)
  },
})

const cookies = useCookie('list')
const route = useRoute()
const commonStore = useCommonStore()
const productStore = useProductStore()

const slug = ref<string>(route.params?.slug as string || '')
const category = ref<Category | null>(null)
const categoryName = computed<string>(() => category.value?.name ?? getNameBySlug(slug.value))
const categoryId = computed<string>(() => getIdBySlug(slug.value))

const orderbyArray = [
  { id: 1, name: 'Default sorting', value: SortByEnum.CreatedAtDesc },
  { id: 2, name: 'Sort by popularity', value: SortByEnum.PopularityDesc },
  { id: 3, name: 'Sort by average rating', value: SortByEnum.AvgStarDesc },
  { id: 4, name: 'Sort by latest', value: SortByEnum.UpdatedAtDesc },
  { id: 5, name: 'Sort by price: low to high', value: SortByEnum.PriceAsc },
  { id: 6, name: 'Sort by price: high to low', value: SortByEnum.PriceDesc },
]
const countArray = [
  { id: 1, name: 'Show 8', value: 8 },
  { id: 2, name: 'Show 12', value: 12 },
  { id: 3, name: 'Show 16', value: 16 },
  { id: 4, name: 'Show 24', value: 24 },
]

const isActiveFilterTab = ref<boolean>(false)
const isShowList = ref<boolean>(Boolean(cookies.value))
const orderbyActive = ref<string>(orderbyArray[0].value)
const numberProductShow = ref<number>(countArray[1].value)

const totalProducts = computed<number>(() => productStore.totalProducts)
const pageSize = computed<number>(() => numberProductShow.value)
const currentPage = ref<number>(1)

const brandName = ref<string[]>([])
const concentrationName = ref<string[]>([])
const sizeName = ref<string[]>([])

const queryParams = computed(() => {
  if (Object.keys(route.query).length > 0)
    currentPage.value = 1

  const queryParams: Record<string, string | string[]> = {}
  queryParams.perPage = `${numberProductShow.value}`
  queryParams.page = `${currentPage.value}`

  if (orderbyActive.value !== SortByEnum.CreatedAtDesc)
    queryParams.sortBy = orderbyActive.value

  if (categoryName.value)
    queryParams['category[]'] = [categoryName.value]
  if (brandName.value.length)
    queryParams['brand[]'] = brandName.value
  if (concentrationName.value.length)
    queryParams['concentration[]'] = concentrationName.value
  if (sizeName.value.length)
    queryParams['size[]'] = sizeName.value

  for (const key in route.query) {
    if (queryParams[key] && Array.isArray(route.query[key]))
      queryParams[key] = [...queryParams[key], ...route.query[key] as string[]]
    else if (queryParams[key])
      queryParams[key] = [...queryParams[key], route.query[key] as string]
    else if (Array.isArray(route.query[key]))
      queryParams[key] = [...route.query[key] as string[]]
    else
      queryParams[key] = route.query[key] as string
  }

  return queryParams as Record<string, string>
})

const filterProducts = computed<Products>(() => productStore.categoryProducts)
// const filterProducts = computed<Products>(() => {
//   if (orderbyActive.value === SortByEnum.CreatedAtDesc)
//     productStore.getSortedProducts('id', 'desc')

//   else if (orderbyActive.value === SortByEnum.PopularityDesc)
//     productStore.getSortedProducts('', 'desc')

//   else if (orderbyActive.value === SortByEnum.AvgStarDesc)
//     productStore.getSortedProducts('stars', 'desc')

//   else if (orderbyActive.value === SortByEnum.UpdatedAtDesc)
//     productStore.getSortedProducts('createAt', 'asc')

//   else if (orderbyActive.value === SortByEnum.PriceAsc)
//     productStore.getSortedProducts('quantities', 'asc')

//   else if (orderbyActive.value === SortByEnum.PriceDesc)
//     productStore.getSortedProducts('quantities', 'desc')

//   else
//     productStore.getSortedProducts('name', 'acs')

//   return productStore.categoryProducts.filter((_value, index) => {
//     return (
//       index >= (currentPage.value - 1) * pageSize.value
//       && index < currentPage.value * pageSize.value
//     )
//   })
// })

const banner = computed<string>(() => {
  if (category.value?.images && getMainImagePath(category.value?.images) && getMainImagePath(category.value?.images) !== '/default.png')
    return getMainImagePath(category.value?.images)
  if (commonStore.banners)
    return commonStore.banners[0].image ?? ''
  return ''
})
const bannerElement = ref<HTMLElement | null>(null)
const { height: bannerHeight } = useElementBounding(bannerElement)

// Function to get category by category id
async function fetchCategoryById() {
  if (categoryId.value) {
    const { data } = await useCustomFetch<Category>(`/categories/${categoryId.value}`)
    if (data.value) {
      category.value = data.value
    }
    else {
      throw createError({
        statusCode: 404,
        message: 'Category not found',
      })
    }
  }
}
// Function to update products based on category
async function updateProducts() {
  await productStore.fetchProductsCategory(queryParams.value)
}

// Fetch when mounted
commonStore.setIsLoading(true)
await fetchCategoryById()
await updateProducts()
// Fetch banners and get banner for category page
if (!commonStore.banners.length)
  await commonStore.fetchAllBanners()
commonStore.setIsLoading(false)

// Watch for number products show changes, current page changes, query params changes and update products
watch(
  () => queryParams.value,
  async () => {
    commonStore.setIsLoading(true)
    await updateProducts()
    commonStore.setIsLoading(false)
  },
)

// Page function
function onToggleDiscoverNow() {
  commonStore.scrollToPosition(commonStore.staticHeaderHeight + commonStore.breadcrumbHeight + bannerHeight.value)
}
function onToggleFilters() {
  isActiveFilterTab.value = true
}
function onToggleBrand(nameArray: string[]) {
  brandName.value = nameArray
  currentPage.value = 1
}
function onToggleConcentration(nameArray: string[]) {
  concentrationName.value = nameArray
  currentPage.value = 1
}
function onToggleSize(nameArray: string[]) {
  sizeName.value = nameArray
  currentPage.value = 1
}
function onToggleShowList(bool: boolean) {
  isShowList.value = bool
  cookies.value = `${bool}`
}
function onPageChange(page: number) {
  currentPage.value = page
  commonStore.scrollToNav()
}

useSeoMeta({
  title: `${categoryName.value} Categoy`,
})
</script>

<template>
  <!-- Start of Main -->
  <main class="main">
    <BasePageBreadcrumb
      :items="[
        { id: 1, name: 'Home', route: '/' },
        { id: 2, name: 'Categories', route: '/categories' },
        { id: 3, name: `${categoryName}`, route: '' },
      ]"
    />

    <!-- Start of Page Content -->
    <div class="page-content mb-20">
      <!-- Start of Shop Banner -->
      <div ref="bannerElement" class="banner-wrapper mb-12">
        <NuxtImg
          v-if="category && banner"
          :src="banner"
          :alt="category?.name"
        />
        <div class="banner shop-default-banner shop-boxed-banner flex items-center">
          <div class="container banner-content">
            <h4 class="banner-subtitle">
              This Collection
            </h4>
            <h3 class="banner-title">
              {{ category?.name }}
            </h3>
            <button class="btn btn-dark btn-rounded btn-icon-right" @click="onToggleDiscoverNow">
              Discover Now
              <Icon name="cil:arrow-right" class="custom-icon" />
            </button>
          </div>
        </div>
      </div>
      <!-- End of Shop Banner -->

      <div class="container" :class="{ 'container-fluid': isShowList && filterProducts.length > 0 }">
        <!-- Start of Shop Content -->
        <div class="shop-content">
          <!-- Start of Shop Main Content -->
          <div class="main-content">
            <!-- Start of Content Filters -->
            <nav class="toolbox sticky-toolbox sticky-content fix-top">
              <div class="toolbox-left">
                <button
                  class="btn btn-primary btn-outline btn-rounded left-sidebar-toggle btn-icon-left"
                  @click="onToggleFilters"
                >
                  <Icon name="uil:list-ul" class="custom-icon" />
                  <span>Filters</span>
                </button>
                <BaseButtonSelectInput
                  v-model:active-item="orderbyActive" name="sortby" label="Sort By :"
                  :items="orderbyArray" @on-change="onPageChange(1)"
                />
              </div>
              <div class="toolbox-right">
                <BaseButtonSelectInput
                  v-model:active-item="numberProductShow" name="count" :items="countArray"
                  @on-change="onPageChange(1)"
                />
                <div class="toolbox-item toolbox-layout">
                  <button
                    class="icon-mode-grid btn-layout" :class="{ active: !isShowList }"
                    @click="onToggleShowList(false)"
                  >
                    <Icon name="gridicons:grid" class="custom-icon" />
                  </button>
                  <button
                    class="icon-mode-list btn-layout" :class="{ active: isShowList }"
                    @click="onToggleShowList(true)"
                  >
                    <Icon name="zondicons:list" class="custom-icon" />
                  </button>
                </div>
              </div>
            </nav>
            <!-- End of Content Filters -->

            <template v-if="filterProducts.length > 0">
              <!-- Start of Products -->
              <div v-if="!isShowList" class="product-wrapper row cols-md-4 cols-sm-2 cols-2">
                <div v-for="product in filterProducts" :key="product.id" class="product-wrap">
                  <ProductCardDefault action="vertical" :product="product" />
                </div>
              </div>
              <div v-else class="product-wrapper grid grid-cols-2">
                <div v-for="product in filterProducts" :key="product.id" class="product-wrap">
                  <ProductCardList :product="product" />
                </div>
              </div>
              <!-- End of Products -->

              <!-- Start of Pagination -->
              <BasePaginations
                :total="totalProducts"
                :page-size="pageSize"
                :current-page="currentPage"
                :is-show-detail="true"
                @on-page-change="onPageChange"
              />
              <!-- End of Pagination -->
            </template>
            <template v-else>
              <div class="text-[1.6rem] py-4">
                There are no products.
              </div>
            </template>
          </div>
          <!-- End of Shop Main Content -->

          <!-- Start of Sidebar, Shop Sidebar -->
          <FiltersMain
            v-model:is-active="isActiveFilterTab"
            @on-toggle-brand="onToggleBrand"
            @on-toggle-concentration="onToggleConcentration"
            @on-toggle-size="onToggleSize"
          />
          <!-- End of Sidebar Content -->
        </div>
        <!-- End of Shop Content -->
      </div>
    </div>
    <!-- End of Page Content -->
  </main>
  <!-- End of Main -->
</template>

<style scoped lang="scss">
.main {
  & .page-content {
    & .banner-wrapper {
      position: relative;
      display: flex;
      justify-content: center;
      background-color: #eee;
      min-height: 300px;
      max-height: 500px;
      overflow: hidden;

      & img {
        position: relative;
        display: block;
        width: 100%;
        max-width: 100%;
        object-fit: cover;
      }

      & .banner {
        position: absolute;
        width: 100%;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        font-size: 1rem;

        &.shop-default-banner {
          padding: 7.4em 8.7em 7.6em;
        }

        &.shop-boxed-banner {
          padding-left: 4.8em;
          padding-right: 4.8em;
        }

        & .banner-content {
          position: relative;
          z-index: 1;

          & .banner-subtitle {
            margin-bottom: 0.2rem;
            font-size: 2.8em;
            font-weight: 600;
            letter-spacing: -0.02em;
          }

          & .banner-title {
            height: auto;
            margin-bottom: 1.9rem;
            font-size: 4em;
            font-weight: 700;
            letter-spacing: -0.01em;
            color: #F7B6B1;
            text-transform: uppercase;
          }

          & .btn {
            padding: 1.25em 1.98em;
            font-size: 1.4em;

            & .custom-icon {
              margin-right: 0;
              margin-left: 0.6rem;
            }
          }
        }
      }
    }

    & .container {
      width: 100%;
      padding-left: 20px;
      padding-right: 20px;
      margin-left: auto;
      margin-right: auto;

      &.container-fluid {
        max-width: 1820px !important;
      }

      & .shop-content {
        overflow: hidden;

        & .main-content {
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;

          & .toolbox,
          & .toolbox-right,
          & .toolbox-left,
          & .toolbox-item {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
          }

          & .toolbox {
            padding-bottom: 1rem;

            & .toolbox-left {
              & .left-sidebar-toggle {
                margin: 0 2rem 1rem 0;
                padding: 0.78em 1.05em;
                font-size: 1.3rem;
              }

              & .custom-icon {
                margin-right: 0.7rem;
                margin-left: 0.3rem;
                font-size: 2rem;
                stroke: inherit;
              }
            }

            & .toolbox-right {
              margin-left: auto;

              & .toolbox-item {
                margin-bottom: 1rem;

                &.toolbox-layout {
                  display: -webkit-box;
                  display: -ms-flexbox;
                  display: flex;
                  -webkit-box-align: center;
                  -ms-flex-align: center;
                  align-items: center;
                  margin-left: 1.9rem;

                  & .btn-layout+.btn-layout {
                    margin-left: 1rem;
                  }

                  & .btn-layout {
                    line-height: 1;
                    color: #dadada;
                    -webkit-transition: color 0.4s;
                    transition: color 0.4s;

                    &:hover,
                    &.active {
                      color: #333;
                    }

                    & .custom-icon {
                      font-size: 3rem;
                      color: inherit;
                    }
                  }
                }
              }
            }
          }
        }

        & .product-wrapper {
          & .product-wrap {
            margin-bottom: 2rem;
            padding: 0 1rem;
          }
        }
      }
    }
  }
}
</style>
