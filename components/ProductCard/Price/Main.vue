<script setup lang="ts">
import { getAmountDiscount } from '~/utils/primitive.helper'

interface PriceProps { price: number | number[]; discount?: number }
const props = defineProps<PriceProps>()
</script>

<template>
  <template v-if="props.discount && props.discount > 0">
    <div v-if="Array.isArray(props.price) && props.price.length > 1" class="product-price">
      <span>{{ `${formatMoney(getAmountDiscount(props.price[0], discount))}` }}</span>
      -
      <span>{{ `${formatMoney(getAmountDiscount(props.price[1], discount))}` }}</span>
    </div>
    <div v-else-if="Array.isArray(props.price) && props.price.length === 1" class="product-price">
      <ins class="new-price">{{ formatMoney(getAmountDiscount(props.price[0], props.discount)) }}</ins>
      <del class="old-price">{{ formatMoney(props.price[0]) }}</del>
    </div>
    <div v-else-if="typeof props.price === 'number'" class="product-price">
      <ins class="new-price">{{ formatMoney(getAmountDiscount(props.price, props.discount)) }}</ins>
      <del class="old-price">{{ formatMoney(props.price) }}</del>
    </div>
    <div v-else class="product-price">
      {{ `Updating...` }}
    </div>
  </template>
  <template v-else>
    <div v-if="Array.isArray(props.price) && props.price.length > 1" class="product-price">
      {{ `${formatMoney(props.price[0])} - ${formatMoney(props.price[1])}` }}
    </div>
    <div v-else-if="Array.isArray(props.price) && props.price.length === 1" class="product-price">
      {{ formatMoney(props.price[0]) }}
    </div>
    <div v-else-if="typeof props.price === 'number'" class="product-price">
      {{ formatMoney(props.price) }}
    </div>
    <div v-else class="product-price">
      {{ `Updating...` }}
    </div>
  </template>
</template>

<style scoped lang="scss">
.product-price {
  width: 100% !important;
  @apply block text-ellipsis overflow-hidden whitespace-nowrap mb-0 transition-opacity duration-[400ms];
  @apply items-baseline text-inherit font-semibold tracking-tighter leading-[1.6];

  & .new-price {
    @apply text-[#333] no-underline;

    &:not(:last-child) {
      @apply mr-4;
    }
  }

  & .old-price {
    @apply text-[#aaa] font-normal line-through;
  }
}
</style>
