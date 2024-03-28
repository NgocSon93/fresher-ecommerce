<script setup lang="ts">
import type { Order, ProductInOrder } from '~/types/orders'
import type { Product, Products } from '~/types/products'

interface OrderDetailsProps { order: Order }
const props = defineProps<OrderDetailsProps>()

const commonStore = useCommonStore()

const products = computed<ProductInOrder[]>(() => props.order.products)
const productList = ref<Products>([])

function getPaymentMethod(id: number) {
  const payment = paymentMethods.find(value => value.id === id)
  return payment?.text ?? ''
}

async function getProductList() {
  commonStore.setIsLoading(true)
  const list = await Promise.all(products.value.map(async (value: ProductInOrder) => {
    const { data: product } = await useCustomFetch<Product>(`/products/${value.productId}`)
    return product.value
  }))
  list.forEach((value) => {
    if (value)
      productList.value.push(value)
  })
  commonStore.setIsLoading(false)
}
getProductList()

function getProductFromProductList(product: ProductInOrder) {
  return productList.value.find(value => value.id === product.productId) ?? null
}
</script>

<template>
  <div class="order-details-wrapper mb-10">
    <h4 class="title uppercase tracking-tight mb-10">
      Order Details
    </h4>
    <table class="order-table">
      <thead>
        <tr>
          <th class="text-dark">
            Product
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>
            <NuxtLink :to="`/products/${product.slug}/${product.id}`">
              {{ product.name }}
            </NuxtLink>
            <strong>
              <Icon name="lucide:x" />
              <span class="product-quantity">{{ product.quantity }}</span>
            </strong>
            <br>
            <span>Branch : </span>
            <template v-if="getProductFromProductList(product)">
              <NuxtLink :to="`/categories?brand[]=${getProductFromProductList(product)?.brand.name}`">
                {{ getProductFromProductList(product)?.brand.name }}
              </NuxtLink>
            </template>
            <template v-else>
              <NuxtLink to="">
                No Brand
              </NuxtLink>
            </template>
          </td>
          <td>{{ formatMoney(product.price) }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>Subtotal:</th>
          <td>{{ formatMoney(props.order.subTotal) }}</td>
        </tr>
        <tr>
          <th>Discount:</th>
          <td>{{ formatMoney(props.order.discount) }}</td>
        </tr>
        <tr>
          <th>Shipping:</th>
          <td>{{ formatMoney(props.order.shippingFee) }}</td>
        </tr>
        <tr>
          <th>Payment method:</th>
          <td>{{ getPaymentMethod(props.order.paymentMethod) }}</td>
        </tr>
        <tr class="total">
          <th class="border-no">
            Total:
          </th>
          <td class="border-no">
            {{ formatMoney(props.order.total) }}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
  <!-- End of Order Details -->
</template>

<style scoped lang="scss">
.order-details-wrapper {
  & .title {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    position: relative;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
    margin-bottom: 1.7rem;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.2;
  }

  & .order-table {
    width: 100%;
    padding: 0.6rem 3rem 3rem;
    border: 1px solid #e1e1e1;
    border-collapse: separate;

    font-size: 1.4rem;
    line-height: 1.6;
    color: #666;

    & thead th,
    & tfoot th,
    & tfoot td {
      border-bottom: 1px solid #e1e1e1;
    }

    & thead {
      & th {
        padding-bottom: 1.7rem;
        font-size: 1.8rem;
      }
    }

    & tfoot {
      font-size: 1.6rem;

      & th,
      & td {
        padding-top: 1.5rem;
        padding-bottom: 1.8rem;
        font-weight: 600;
      }

      & th {
        color: #333;
      }
    }

    & tr {
      border-bottom: 1px solid #eee;
    }

    & th {
      text-align: start;
      padding: 0.9rem 0;
    }

    & td {
      padding-left: 0;
      padding-right: 0;
      padding-top: 1.5rem;
      border: none;
    }

    & tbody td:first-child {
      min-width: 16rem;
      padding-top: 3rem;
      padding-bottom: 0;
    }

    & td:last-child {
      text-align: end;
    }

    & a {
      color: #336699;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    & .border-no {
      border: none;
    }

    & .total td {
      font-weight: 700;
      font-size: 2rem;
      color: #333;
    }
  }
}
</style>
