<script setup lang="ts">
import type { Brands } from '~/types/products'

const commonStore = useCommonStore()

const brands = computed<Brands>(() => commonStore.brands.slice(0, 10) ?? [])
;(async function getBrands() {
  if (!commonStore.brands.length)
    commonStore.fetchAllBrands()
})()
</script>

<template>
  <div class="container py-4">
    <h2 class="title title-underline mb-4 ls-normal">
      Our Clients
    </h2>

    <ul class="grid grid-cols-5 mt-3 mb-9">
      <li
        v-for="brand in brands"
        :key="brand.id"
        class="border border-secondary-50"
      >
        <BaseCustomNuxtImage
          :src="brand.image"
          :alt="brand.name"
          class="w-full h-[100px] object-contain"
          :height="100"
        />
      </li>
    </ul>
  </div>
</template>
