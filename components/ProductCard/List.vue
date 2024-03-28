<script setup lang="ts">
import { getDiscount, getPrice } from '~/utils/primitive.helper'
import type { Category } from '~/types/categories'
import type { Product } from '~/types/products'

interface ProductCardProps {
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
  <div class="product product-list product-select">
    <figure class="product-media">
      <BaseImage :slug="`${product.slug}/${product.id}`" :images="props.product.images" :name="props.product.name" />
      <div class="product-action-vertical">
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
      <h4 class="product-name">
        <NuxtLink
          :to="`/products/${props.product.slug}/${props.product.id}`"
          :title="product.name"
        >
          {{ props.product.name }}
        </NuxtLink>
      </h4>
      <ProductRating :product="props.product" />
      <ProductCardPriceMain
        :price="getPrice(props.product.quantities)"
        :discount="getDiscount(props.product.discounts)"
      />
      <div class="product-desc" v-html="props.product.description" />
      <div class="product-action">
        <ProductCardButtonCart :product="props.product" />
        <ProductCardButtonWishlist :product="props.product" />
        <div v-if="false" class="btn-wrapper">
          <button
            class="btn-product-icon btn-compare" :class="true ? 'w-icon-compare' : 'w-icon-check-solid'"
            title="Compare" @click="onToggleCompare"
          />
          <BaseLoading :is-loading="isLoadingCompare" :width="20" :height="20" :border="2" />
        </div>
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
      white-space: wrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &:hover {
        color: #336699;
      }
    }

    & .product-action {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      background-color: transparent;
      z-index: 10;
      -webkit-transition: opacity 0.3s, visibility 0.3s, bottom 0.3s;
      transition: opacity 0.3s, visibility 0.3s, bottom 0.3s;
      opacity: 0;
      visibility: hidden;
    }
  }

  &.product-list {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: start;
    padding-bottom: 2rem;

    & .product-media {
      -webkit-box-flex: 0;
      -ms-flex: 0 0 26rem;
      flex: 0 0 26rem;
      max-width: 26rem;
      margin-right: 2rem;
    }

    & .product-name {
      font-size: 1.8rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    & .product-desc {
      margin-bottom: 3.9rem;
      font-size: 1.3rem;
      color: #666;
      line-height: 1.9;

      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    & .product-action {
      position: relative;
      visibility: visible;
      opacity: 1;
    }

    & .ratings-container,
    & .product-action {
      -webkit-box-pack: start;
      -ms-flex-pack: start;
      justify-content: start;
    }

    & .btn-wrapper {
      position: relative;

      &:not(:first-child) {
        margin: 0 0 0 2rem;
      }

      & .btn-product {
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        padding: 0.86em 0.5em;
        max-width: 17.6rem;
        width: 17.6rem;
        background-color: transparent;
        border: 2px solid #ccc;
        color: #333;
        font-size: 1.4rem;
        font-weight: 600;
        border-radius: 0.3rem;
        -webkit-transition: background-color 0.3s, border-color 0.3s, color 0.3s;
        transition: background-color 0.3s, border-color 0.3s, color 0.3s;

        &:hover {
          background-color: #336699;
          border-color: #336699;
          color: #fff;
        }
      }

      & .btn-product-icon {
        width: 3rem;
        height: 3.5rem;
        border: none;
        color: #333;
        text-align: center;

        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0;

        &:hover {
          background-color: transparent;
          color: #336699;
        }
      }
    }
  }
}
</style>
