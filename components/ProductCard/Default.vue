<script setup lang="ts">
import { getDiscount, getPrice } from '~/utils/primitive.helper'
import type { Category } from '~/types/categories'
import type { Product } from '~/types/products'

interface ProductCardProps {
  action?: string
  product: Product
  category?: Category
}
const props = defineProps<ProductCardProps>()

const isLoadingCompare = ref(false)
const isShowPopup = ref(false)

const productQuickView = ref<number>(-1)

function setLoading(loading: Ref<boolean>, ms: number = 500) {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, ms)
}
function onToggleCompare() {
  setLoading(isLoadingCompare)
  console.log('Compare')
}
function onToggleQuickView() {
  productQuickView.value = props.product.id
  isShowPopup.value = true
}
</script>

<template>
  <div class="product text-center">
    <figure class="product-media">
      <NuxtLink :to="`/products/${product.slug}/${product.id}`">
        <BaseCustomNuxtImage
          :src="getMainImagePath(product.images)"
          :alt="product.name"
          :height="250"
        />
      </NuxtLink>
      <div
        :class="[
          (props.action && props.action === 'vertical')
            ? 'product-action-vertical'
            : 'product-action-horizontal',
          {
            active: isLoadingCompare,
          },
        ]"
      >
        <ProductCardButtonCart v-if="false" :product="props.product" :is-icon="true" />
        <ProductCardButtonWishlist :product="props.product" />
        <div v-if="false" class="btn-wrapper">
          <button
            class="btn-product-icon btn-compare" :class="true ? 'w-icon-compare' : 'w-icon-check-solid'"
            title="Compare" @click="onToggleCompare"
          />
          <BaseLoading :is-loading="isLoadingCompare" :width="20" :height="20" :border="2" />
        </div>
        <div class="btn-wrapper">
          <button class="btn-product-icon btn-quickview w-icon-search" title="Quick View" @click="onToggleQuickView" />
        </div>
      </div>
      <div v-if="props.product.discounts && getDiscount(props.product.discounts)" class="product-label-group">
        <label class="product-label label-discount">
          {{ `${getDiscount(props.product.discounts)}% Off` }}
        </label>
      </div>
    </figure>
    <div class="product-details">
      <div v-if="props.category" class="product-cat">
        <NuxtLink
          :to="`/products/${props.product.slug}/${props.product.id}`"
          :title="props.category.name"
        >
          {{ props.category.name }}
        </NuxtLink>
      </div>
      <h3 class="product-name">
        <NuxtLink
          :to="`/products/${props.product.slug}/${props.product.id}`"
          :title="product.name"
        >
          {{ product.name }}
        </NuxtLink>
      </h3>
      <ProductRating :product="props.product" />
      <div class="product-pa-wrapper">
        <ProductCardPriceMain
          :price="getPrice(props.product.quantities)"
          :discount="getDiscount(props.product.discounts)"
        />
      </div>
    </div>

    <BaseModal v-if="product && product.id === productQuickView" v-model:is-show="isShowPopup">
      <template #content>
        <div class="px-20 py-12 w-[88rem]">
          <div class="product product-single row">
            <div class="col-md-6 mb-6">
              <DetailPageProductGallery :product="product" />
            </div>
            <div class="col-md-6 mb-4 mb-md-6">
              <DetailPageProductInfo :product="product" />
            </div>
          </div>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<style scoped lang="scss">
.product {
  position: relative;
  font-family: Poppins, sans-serif;
  font-size: 1rem;
  color: #020101;
  -webkit-transition: opacity 0.3s, -webkit-box-shadow 0.3s;
  transition: opacity 0.3s, -webkit-box-shadow 0.3s;
  transition: box-shadow 0.3s, opacity 0.3s;
  transition: box-shadow 0.3s, opacity 0.3s, -webkit-box-shadow 0.3s;

  &:hover {
    & .product-media .product-action-vertical {
      opacity: 1;
      visibility: visible;
    }

    & .product-media .product-action-horizontal {
      opacity: 1;
      visibility: visible;
      bottom: 2rem;
    }
  }

  & figure {
    margin: 0;
  }

  & .product-media {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
    -webkit-transition: -webkit-box-shadow 0.35s;
    transition: -webkit-box-shadow 0.35s;
    transition: box-shadow 0.35s;
    transition: box-shadow 0.35s, -webkit-box-shadow 0.35s;

    & .product-action-vertical {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      -webkit-transition: opacity 0.3s, visibility 0.3s;
      transition: opacity 0.3s, visibility 0.3s;
      opacity: 0;
      visibility: hidden;

      &.active {
        opacity: 1;
        visibility: visible;
      }

      & .btn-wrapper {
        position: relative;

        & .btn-product-icon {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          width: 3.6rem;
          height: 3.6rem;
          margin-bottom: 0.5rem;
          background-color: #fff;
          border: 1px solid #eee;
          color: #999;
          font-size: 1.8em;
          font-weight: 400;
          line-height: 3.5rem;
          overflow: hidden;
          -webkit-transition: background-color 0.3s, border-color 0.3s,
            color 0.3s, visibility 0.3s, opacity 0.3s, -webkit-transform 0.3s;
          transition: background-color 0.3s, border-color 0.3s, color 0.3s,
            visibility 0.3s, opacity 0.3s, -webkit-transform 0.3s;
          transition: background-color 0.3s, border-color 0.3s, color 0.3s,
            visibility 0.3s, opacity 0.3s, transform 0.3s;
          transition: background-color 0.3s, border-color 0.3s, color 0.3s,
            visibility 0.3s, opacity 0.3s, transform 0.3s,
            -webkit-transform 0.3s;

          &:hover,
          :active {
            border-color: #336699;
            color: #fff;
            background-color: #336699;
          }
        }

        & .btn-product-icon {
          border-radius: 50%;
        }
      }
    }

    & .product-action-horizontal {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      position: absolute;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      background-color: #fff;
      -webkit-box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.08);
      box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.08);
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      bottom: 0;
      width: fit-content;
      // max-width: 80%;
      border-radius: 3px;
      padding: 5px;
      opacity: 0;
      visibility: visible;
      -webkit-transition: opacity 0.3s, visibility 0.3s, bottom 0.3s;
      transition: opacity 0.3s, visibility 0.3s, bottom 0.3s;

      &.active {
        opacity: 1;
        visibility: visible;
        bottom: 2rem;
      }

      & .btn-wrapper {
        position: relative;

        & .btn-product-icon {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          width: 3.6rem;
          height: 3.6rem;
          margin-bottom: 0.5rem;
          background-color: #fff;
          border: 1px solid #eee;
          color: #999;
          font-size: 1.8em;
          font-weight: 400;
          line-height: 3.5rem;
          overflow: hidden;
          -webkit-transition: background-color 0.3s, border-color 0.3s,
            color 0.3s, visibility 0.3s, opacity 0.3s, -webkit-transform 0.3s;
          transition: background-color 0.3s, border-color 0.3s, color 0.3s,
            visibility 0.3s, opacity 0.3s, -webkit-transform 0.3s;
          transition: background-color 0.3s, border-color 0.3s, color 0.3s,
            visibility 0.3s, opacity 0.3s, transform 0.3s;
          transition: background-color 0.3s, border-color 0.3s, color 0.3s,
            visibility 0.3s, opacity 0.3s, transform 0.3s,
            -webkit-transform 0.3s;

          &:hover,
          :active {
            background-color: transparent;
            color: #336699;
          }
        }

        & .btn-product-icon {
          margin-bottom: 0;
          border: none;
          color: #333;
        }
      }
    }

    & .product-label-group {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      position: absolute;
      // left: 2rem;
      left: 0;
      top: 2rem;
      max-width: 11rem;
      z-index: 1;

      transition: all 0.2s;

      & .product-label {
        display: inline-block;
        text-align: center;
        margin-bottom: 0.5rem;
        font-size: 1.2em;
        letter-spacing: -0.005em;
        color: #fff;
        line-height: 1;
        padding: 0.6rem 1rem;
        border-radius: 0.3rem;
        text-transform: uppercase;

        &.label-discount {
          background: #f77c29;
          border-radius: 0 6px 6px 0;
          box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.15);
        }
      }
    }
  }

  & .product-details {
    position: relative;
    padding-top: 1.7rem;
    background-color: #fff;
    -webkit-transition: -webkit-box-shadow 0.3s;
    transition: -webkit-box-shadow 0.3s;
    transition: box-shadow 0.3s;
    transition: box-shadow 0.3s, -webkit-box-shadow 0.3s;

    & .product-cat {
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
      color: #999;
      line-height: 1;
      text-transform: uppercase;

      & a {
        display: inline-block;
        color: inherit;

        &:hover {
          color: #336699;
        }
      }
    }

    & .product-name {
      margin-bottom: 0.7rem;
      font-size: 1.3rem;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &:hover {
        color: #336699;
      }
    }

    & .product-pa-wrapper {
      position: relative;
      display: -webkit-inline-box;
      display: -ms-inline-flexbox;
      display: inline-flex;
    }
  }
}
</style>
