<script lang="ts" setup>
/**
 *
 * The component assumes a convention where the 'All' category is represented by an empty string ('').
 *
 * @author thangtran118
 */

import { onClickOutside } from '@vueuse/core'
import type { Categories } from '~/types/categories'
import type { Products } from '~/types/products'
import { useCategoryStore } from '~/stores/categories'

const categories: Categories = useCategoryStore().categories

const selectedCategory = ref<string>('')
const keySearch = ref<string>('')

const products = ref<Products | []>([])
const isLoading = ref<boolean>(false)
const hasNoProducts = ref<boolean>(false)

const searchQuery = computed(() => {
  const query: { keySearch: string; 'category[]'?: string } = {
    keySearch: keySearch.value,
  }

  if (selectedCategory.value)
    query['category[]'] = selectedCategory.value

  return query
})

// Function to update products based on search term and selected category
async function updateProducts() {
  if (keySearch.value) {
    isLoading.value = true

    const { data } = await useCustomFetch('/products', {
      query: searchQuery.value,
      transform: (response: { data: Products }) => {
        return response.data
      },
    })
    if (data.value && data.value.length > 0) {
      products.value = data.value
      hasNoProducts.value = false
    }
    else { hasNoProducts.value = true }

    isLoading.value = false
  }
}

function clearProducts() {
  products.value = []
  hasNoProducts.value = false
}

// Debounced watcher for product search term
watchDebounced(
  keySearch,
  async () => {
    await updateProducts()
  },
  { debounce: 800, maxWait: 1000 },
)

// Clear products when search term is empty
watch(keySearch, (val) => {
  if (!val)
    clearProducts()
})

// Watch for category changes and update products
watch(() => selectedCategory.value, async () => {
  await updateProducts()
})

const categoryOptions = computed(() => [
  { label: 'All', value: '' },
  ...categories.map(category => ({
    label: category.name,
    value: category.name,
  })),
])

// handle when click search button
function onSearch() {
  if (keySearch.value) {
    useRouter().push({
      path: '/categories',
      query: searchQuery.value,
    })
  }
}

const showProductsElement = ref<HTMLElement | null>(null)

onClickOutside(showProductsElement, () => {
  clearProducts()
})

onUnmounted(() => {
  clearProducts()
  keySearch.value = ''
})
</script>

<template>
  <div class="search-bar border-2 border-primary rounded flex items-center relative">
    <div class="category-wrapper font-size-normal pr-3 pl-1">
      <select v-model="selectedCategory" class="appearance-none bg-transparent outline-none text-secondary-500 font-size-normal px-3">
        <option
          v-for="(category, index) in categoryOptions"
          :key="index"
          :value="category.value"
          class="category__item"
        >
          {{ category.label }}
        </option>
      </select>
    </div>
    <div class="search-wrapper font-size-normal py-[13px] px-[11.25px] grow">
      <div class="search flex items-center relative">
        <input
          v-model="keySearch"
          type="text"
          placeholder="Search in..."
          class="search__input font-size-normal size-full grow appearance-none bg-transparent outline-none text-secondary-500"
        >
        <BaseButtonIcon
          :is-loading="isLoading"
          icon-name="iconoir:search"
          icon-class="cursor-pointer hover:text-primary transition-colors"
          size="25px"
          @click="onSearch"
        />
        <template v-if="hasNoProducts">
          <div class="absolute top-full left-0 w-full mt-3 z-20 px-5 py-3 bg-white shadow-lg border border-secondary-200">
            <span class="text-[15px]">No find product</span>
          </div>
        </template>
        <template v-else-if="products.length > 0">
          <div
            ref="showProductsElement"
            class="absolute top-full left-0 w-full mt-3 z-20 bg-white shadow-lg border border-secondary-200 max-h-[500px] overflow-y-scroll"
          >
            <ul class="px-4 pt-3">
              <li>
                <NuxtLink
                  v-for="product in products" :key="product.id"
                  :to="`/products/${product.slug}/${product.id}`"
                  class="flex mb-3 text-[15px] hover:text-primary transition-colors cursor-pointer"
                  @click="clearProducts()"
                >
                  <BaseCustomNuxtImage
                    :src="getMainImagePath(product.images)"
                    :alt="product.name"
                    :width="50"
                  />

                  <span class="ml-2">{{ product.name }}</span>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.font-size-normal {
  font-size: 15px !important;
  line-height: 1.2 !important;
}

.search-bar {
  .category-wrapper {
    @apply relative;
    &::before {
      content: '';
      @apply absolute top-1/2 right-2 -translate-y-2/3 -translate-x-1/2;
      @apply w-3 h-3 bg-transparent;
      @apply border-r border-b border-secondary-500 rotate-45;
    }

    &::after {
      content: '';
      @apply absolute top-1/2 right-0 -translate-y-1/2;
      @apply w-px h-full bg-secondary-100;
    }
  }
}
</style>
