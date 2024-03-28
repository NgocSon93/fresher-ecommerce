<script setup lang="ts">
import { getDiscount, getPrice } from '~/utils/primitive.helper'
import type { Product } from '~/types/products'

interface ProductCardProps {
  product: Product
}
const props = defineProps<ProductCardProps>()
</script>

<template>
  <div class="product product-widget">
    <figure class="product-media">
      <BaseImage :slug="`${product.slug}/${product.id}`" :images="props.product.images" :name="props.product.name" />
      <div v-if="props.product.discounts && getDiscount(props.product.discounts)" class="product-label-group">
        <label class="product-label label-discount">
          {{ `${getDiscount(props.product.discounts)}% Off` }}
        </label>
      </div>
    </figure>
    <div class="product-details">
      <h4 class="product-name">
        <NuxtLink :to="`products/${product.slug}/${product.id}`">
          {{ props.product.name }}
        </NuxtLink>
      </h4>
      <ProductRating :product="props.product" />
      <ProductCardPriceMain
        :price="getPrice(props.product.quantities)"
        :discount="getDiscount(props.product.discounts)"
      />
    </div>
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

  & .product-media {
    position: relative;
    margin-bottom: 0;
    -webkit-transition: -webkit-box-shadow 0.35s;
    transition: -webkit-box-shadow 0.35s;
    transition: box-shadow 0.35s;
    transition: box-shadow 0.35s, -webkit-box-shadow 0.35s;

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
  }

  &.product-widget {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;

    padding: 1rem 0;

    & .product-media {
      -webkit-box-flex: 0;
      -ms-flex: 0 0 35.73%;
      flex: 0 0 35.73%;
      max-width: 35.73%;
      min-width: 33.33%;
      margin-right: 1rem;
      padding: 0;
      padding-left: 0.2rem;
    }
  }
}
</style>
