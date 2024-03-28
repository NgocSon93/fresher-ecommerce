<script setup lang="ts">
const emits = defineEmits<{ (e: 'click'): void }>()

const route = useRoute()

const priceItems = ref([
  { from: 0, to: 200 },
  { from: 200, to: 400 },
  { from: 500, to: 600 },
  { from: 600, to: 1000 },
  { from: 1000 },
])
const minPrice = ref<number | null>(null)
const maxPrice = ref<number | null>(null)
const isValidInputMin = ref<boolean>(false)
const isValidInputMax = ref<boolean>(false)

function onToggleFilterPrice(from: number, to?: number) {
  const queryParams: Record<string, string> = {}
  for (const key in route.query)
    queryParams[key] = route.query[key] as string

  if (from !== undefined && queryParams.from !== `${from}`)
    queryParams.from = `${from}`
  else
    delete queryParams.from

  if (to !== undefined && queryParams.to !== `${to}`)
    queryParams.to = `${to}`
  else
    delete queryParams.to

  useRouter().push({ query: { ...queryParams } })
}
function onFocusMinPrice() {
  isValidInputMin.value = false
}
function onFocusMaxPrice() {
  isValidInputMax.value = false
}
function onSubmitFilterPrice() {
  let isSuccess = true
  if (minPrice.value && minPrice.value < 0) {
    isValidInputMin.value = true
    isSuccess = false
  }
  if (maxPrice.value && maxPrice.value < 0) {
    isValidInputMax.value = true
    isSuccess = false
  }
  if (minPrice.value && maxPrice.value && minPrice.value > maxPrice.value) {
    isValidInputMax.value = true
    isSuccess = false
  }
  if (!isSuccess)
    return

  const queryParams: Record<string, string> = {}
  for (const key in route.query)
    queryParams[key] = route.query[key] as string

  if (minPrice.value && minPrice.value > 0)
    queryParams.from = `${minPrice.value}`
  else
    delete queryParams.from

  if (maxPrice.value && maxPrice.value > 0)
    queryParams.to = `${maxPrice.value}`
  else
    delete queryParams.to

  useRouter().push({ query: { ...queryParams } })
  clear()
  emits('click')
}
function clear() {
  minPrice.value = null
  maxPrice.value = null
  isValidInputMin.value = false
  isValidInputMax.value = false
}
function checkActive(from: number, to?: number) {
  if (!to)
    return route.fullPath.includes(`from=${from}`)

  return route.fullPath.includes(`from=${from}`) && route.fullPath.includes(`to=${to}`)
}
</script>

<template>
  <div class="widget-price">
    <ul class="filter-items search-ul" @click="emits('click')">
      <li v-for="item in priceItems" :key="item.from">
        <button
          class="item-price"
          :class="{ active: checkActive(item.from, item.to) }"
          @click="onToggleFilterPrice(item.from, item.to)"
        >
          <div v-if="item.to">
            {{ `$${item.from}.00 - $${item.to}.00` }}
          </div>
          <div v-else>
            {{ `$${item.from}.00+` }}
          </div>
        </button>
      </li>
    </ul>
    <form class="price-range" @click.stop>
      <input
        v-model="minPrice" type="number" name="min_price" placeholder="$min" min="0"
        class="min_price text-center" :class="{ error: isValidInputMin }"
        @focus="onFocusMinPrice"
      >
      <span class="delimiter">-</span>
      <input
        v-model="maxPrice" type="number" name="max_price" placeholder="$max" min="0"
        class="max_price text-center" :class="{ error: isValidInputMax }"
        @focus="onFocusMaxPrice"
      >
      <button class="btn btn-primary btn-rounded" @click.prevent="onSubmitFilterPrice">
        Go
      </button>
    </form>
    <div v-if="isValidInputMin || isValidInputMax" class="error-text">
      Invalid input
    </div>
  </div>
</template>

<style scoped lang="scss">
.widget-price {
  & .filter-items {
    font-size: 1.4rem;

    & .item-price {
      position: relative;
      display: block;
      color: inherit;
      padding: 1rem 0 1rem 0.2rem;

      &:hover {
        color: #336699;
      }

      &.active {
        color: #336699;
      }
    }
  }

  & .price-range {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin: 1.3rem 0 1rem;

    & input[type="number"]::-webkit-inner-spin-button,
    & input[type="number"]::-webkit-outer-spin-button {
      display: none;
    }

    &.error {
      border-color: red;
    }
  }

  & .error-text {
    color: red;
  }
}
</style>
