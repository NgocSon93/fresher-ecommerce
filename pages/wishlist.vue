<script setup lang="ts">
import type { Product, Products } from '~/types/products'
import type { WishlistProduct, WishlistProducts } from '~/types/wishlistProducts'

definePageMeta({
  middleware: ['auth'],
})

useSeoMeta({
  title: 'Wishlist',
})

const cartStore = useCartStore()
const commonStore = useCommonStore()
const wishlistStore = useWishlistStore()

const isShowPopup = ref<boolean>(false)
const wishlistProducts = computed<WishlistProducts>(() => wishlistStore.wishlistProducts)
const isLoadingAddToCart = ref<boolean>(false)
const selectProductId = ref<number>(-1)
const selectProduct = ref<Product | null>(null)
const pageSize = ref<number>(10)
const currentPage = ref<number>(1)
const filterProducts = computed<WishlistProducts>(() => wishlistProducts.value.slice(
  (currentPage.value - 1) * pageSize.value,
  currentPage.value * pageSize.value,
))

// Fetch wishlist products when mounted
async function updateWishlistProducts() {
  commonStore.setIsLoading(true)
  await wishlistStore.fetchWishlistProducts()
  commonStore.setIsLoading(false)
}
await updateWishlistProducts()

// Page function
async function onToggleDeleteProduct(product: WishlistProduct) {
  commonStore.setIsLoading(true)
  const isSuccess = await wishlistStore.fetchDeleteWishlist(product.id)
  if (isSuccess)
    wishlistStore.setWishlistProducts(wishlistStore.wishlistProducts.filter(value => value.id !== product.id))
  commonStore.setIsLoading(false)
}
async function onToggleQuickView(product: WishlistProduct) {
  commonStore.setIsLoading(true)
  selectProductId.value = product.id
  const slug = product.slug
  const { data } = await useCustomFetch('/products', {
    query: { slug },
    transform: (response: { data: Products }): Product => {
      if (!response.data || response.data.length === 0) {
        throw createError({
          statusCode: 404,
          message: 'Product not found',
        })
      }
      return response.data[0]
    },
  })
  selectProduct.value = data.value
  isShowPopup.value = true
  commonStore.setIsLoading(false)
}
function onToggleSelectOptions(product: WishlistProduct) {
  const router = useRouter()
  router.push(`/products/${product.slug}/${product.id}`)
}
async function onToggleAddToCart(product: WishlistProduct) {
  selectProductId.value = product.id
  isLoadingAddToCart.value = true
  if (product.quantities.length > 0) {
    const isSuccess = await cartStore.fetchAddToCart({
      productId: product.id,
      sizeId: product.quantities[0].sizeId,
      quantity: 1,
    })
    if (isSuccess)
      await cartStore.fetchAllCarts()
  }
  isLoadingAddToCart.value = false
}
function onPageChange(page: number) {
  currentPage.value = page
  commonStore.scrollToNav()
}
</script>

<template>
  <!-- Start of Main -->
  <main class="main wishlist-page">
    <BasePageHeader text="Wishlist" />
    <BasePageBreadcrumb
      :items="[
        { id: 1, name: 'Home', route: '/' },
        { id: 2, name: 'Wishlist', route: '' },
      ]"
      :is-border-bottom="true"
    />

    <!-- Start of PageContent -->
    <div class="page-content mt-10">
      <div class="container">
        <h3 class="wishlist-title">
          My wishlist
        </h3>
        <div v-if="filterProducts.length > 0" class="table-wrapper">
          <table class="shop-table wishlist-table">
            <thead>
              <tr>
                <th class="product-header-name">
                  <span>Product</span>
                </th>
                <th />
                <th class="product-header-price">
                  <span>Price</span>
                </th>
                <th class="product-header-stock-status">
                  <span>Stock Status</span>
                </th>
                <th class="wishlist-header-action">
                  <span>Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in filterProducts" :key="product.id">
                <td class="product-thumbnail">
                  <div class="thumbnail-wrapper">
                    <BaseImage :slug="product.slug" :images="product.images" :name="product.name" />
                    <button class="btn btn-close" @click="onToggleDeleteProduct(product)">
                      <Icon name="ep:close-bold" class="custom-icon" />
                    </button>
                  </div>
                </td>
                <td class="product-name">
                  <NuxtLink :to="`/products/${product.slug}/${product.id}`">
                    {{ product.name }}
                  </NuxtLink>
                </td>
                <td class="product-price">
                  <span>
                    <ProductCardPriceMain :price="getPrice(product.quantities)" />
                  </span>
                </td>
                <td class="product-stock-status">
                  <span class="wishlist-in-stock">{{ `In Stock` }}</span>
                </td>
                <td class="wishlist-action">
                  <div class="d-lg-flex">
                    <button
                      class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-4 mb-lg-0"
                      @click="onToggleQuickView(product)"
                    >
                      Quick View
                    </button>
                    <button
                      class="btn btn-cart btn-dark btn-rounded btn-sm ml-lg-4 relative"
                      @click="onToggleSelectOptions(product)"
                    >
                      Select options
                    </button>
                    <button
                      v-show="false" class="btn btn-cart btn-dark btn-rounded btn-sm ml-lg-4 relative"
                      @click="onToggleAddToCart(product)"
                    >
                      Add to cart
                      <BaseLoading
                        v-if="selectProductId === product.id"
                        :is-loading="isLoadingAddToCart"
                        :width="20" :height="20" :border="2"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
            <tfoot v-if="filterProducts.length < wishlistProducts.length">
              <tr>
                <td colspan="5">
                  <BasePaginations
                    class="!border-none"
                    :total="wishlistProducts.length"
                    :page-size="pageSize"
                    :current-page="currentPage"
                    @on-page-change="onPageChange"
                  />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div v-else class="wishlist-text">
          <span>There are no products in your wishlist</span>
        </div>
        <div class="social-links">
          <label>Share On:</label>
          <BaseSocialSection :items="['facebook', 'twitter', 'pinterest', 'email', 'whatsapp']" />
        </div>
      </div>
    </div>
    <!-- End of PageContent -->
  </main>
  <!-- End of Main -->

  <BaseModal v-if="selectProduct" v-model:is-show="isShowPopup">
    <template #content>
      <div class="px-20 py-12 max-w-[88rem]">
        <div class="product product-single row">
          <div class="col-md-6 mb-6">
            <DetailPageProductGallery :product="selectProduct" />
          </div>
          <div class="col-md-6 mb-4 mb-md-6">
            <DetailPageProductInfo :product="selectProduct" />
          </div>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<style scoped lang="scss">
.wishlist-page {
  & .page-header {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    height: 18rem;
    background-color: #eee;
    text-align: center;
    text-transform: capitalize;

    & .page-title {
      font-size: 3.4rem;
      font-weight: 700;
      letter-spacing: -0.025em;
      line-height: 1.1;
      margin-bottom: 0.2rem;
    }
  }

  & .page-content {
    & .container {
      & .wishlist-title {
        margin-bottom: 2.4rem;
        line-height: 1.6;
        letter-spacing: -0.015em;

        font-size: 2.4rem;
        font-weight: 700;
      }

      & .table-wrapper {
        position: relative;
        overflow-x: auto;

        & .wishlist-table {
          text-align: center;

          & img {
            display: block;
            max-width: 10rem;
          }

          & .product-thumbnail {
            width: 11rem;
            padding-right: 1rem;

            & .thumbnail-wrapper {
              position: relative;
              display: block;
              max-width: 10rem;
              width: 100%;
              cursor: pointer;

              & .btn-close {
                position: absolute;
                padding: 0;
                background: #fff;
                border: 2px solid #fff;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.4);
                box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.4);
                top: -14px;
                right: -8px;

                display: flex;
                align-items: center;
                justify-content: center;

                &:hover {
                  & .custom-icon {
                    color: #336699;
                  }
                }

                & .custom-icon {
                  margin: 0;
                  width: 1.2rem;
                  height: 1.2rem;
                }
              }
            }
          }

          & .product-name {
            margin-bottom: 0.7rem;
            font-size: 1.3rem;
            font-weight: 500;
            white-space: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-word;
            text-align: start;

            & a {
              cursor: pointer;

              &:hover {
                color: #336699;
              }
            }
          }

          & .product-price {
            -webkit-box-align: baseline;
            -ms-flex-align: baseline;
            align-items: baseline;
            font-size: 1.6rem;
            font-weight: 600;
            letter-spacing: -0.05em;
            line-height: 1.6;
            -webkit-transition: visibility 0.4s, opacity 0.4s;
            transition: visibility 0.4s, opacity 0.4s;

            & span {
              color: #333;
              text-decoration: none;
            }
          }

          & .wishlist-action {
            width: 24.19%;

            & .btn-sm {
              font-size: 1.3rem;
              padding: 0.77em 2.07em;
            }

            & .btn-quickview {
              padding-top: 0.85em;
              padding-bottom: 0.85em;
              border: 1px solid #ccc;
              color: #333;

              &:hover {
                background-color: #e1e1e1;
                border-color: #e1e1e1;
              }
            }

            & .btn-cart {
              font-weight: 600;
              line-height: 1;
            }
          }

          & th {
            padding: 1.7rem 0 1.3rem;
            font-size: 1.6rem;
            font-weight: 600;
            color: #333;
            text-transform: capitalize;
            line-height: 1.6;
            letter-spacing: 0;
          }

          & td {
            padding: 2rem 0 2rem 0;
            border-top: 1px solid #eee;
            font-size: 1.4rem;
          }

          & td:not(:first-child),
          th:not(:first-child) {
            padding-left: 1rem;
          }

          & tbody {
            border-bottom: 1px solid #eee;
          }
        }
      }

      & .wishlist-text {
        font-size: 1.4rem;
        padding: 2.2rem 0;
      }

      & .social-links {
        margin-bottom: 2.8rem;
        padding: 2.2rem 0;

        & label {
          font-size: 2rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #333;
          margin-right: 1.6rem;
          letter-spacing: -0.01em;
        }

        & .social-icons {
          display: -webkit-inline-box;
          display: -ms-inline-flexbox;
          display: inline-flex;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;

          & .social-icon {
            font-size: 1.4rem;
            width: 32px;
            height: 32px;
            margin: 2px 10px 2px 0;
            line-height: 28px;
            border: 2px solid #ccc;
            border-radius: 50%;
            color: inherit;
            -webkit-transition: color 0.4s, border 0.4s, background-color 0.4s;
            transition: color 0.4s, border 0.4s, background-color 0.4s;
            text-align: center;
          }

          & .social-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            border-color: #cdcdcd;
            color: #666;
            margin-right: 0.8rem;
            border-width: 1px;
            line-height: 3rem;
            cursor: pointer;

            & .custom-icon {
              font-size: 18px;
            }

            &:hover {
              color: #fff;

              &.social-facebook {
                background-color: #1b4f9b;
                border-color: #1b4f9b;
              }

              &.social-twitter {
                background-color: #00adef;
                border-color: #00adef;
              }

              &.social-pinterest {
                background-color: #f96a02;
                border-color: #f96a02;
              }

              &.social-email {
                border-color: #dd4b39;
                background-color: #dd4b39;
              }

              &.social-whatsapp {
                border-color: #3c8a38;
                background-color: #3c8a38;
              }
            }
          }
        }
      }
    }
  }
}
</style>
