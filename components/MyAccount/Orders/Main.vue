<script setup>
const commonStore = useCommonStore()
const listOrders = ref()
const isShowViewOrder = ref(false)
const informationOrders = ref()

async function getListOrders() {
  commonStore.setIsLoading(true)
  const { data } = await useCustomFetch(`orders`)
  if (data.value)
    listOrders.value = data.value
  commonStore.setIsLoading(false)
}
getListOrders()
function showViewOrder() {
  isShowViewOrder.value = !isShowViewOrder.value
}
function viewOrder(order) {
  showViewOrder()
  informationOrders.value = order
}
</script>

<template>
  <div v-if="!isShowViewOrder" id="orders" class="tab-pane active mb-4">
    <div class="icon-box icon-box-side icon-box-light">
      <span class="icon-box-icon icon-orders">
        <i class="w-icon-orders" />
      </span>
      <div class="icon-box-content">
        <h4 class="icon-box-title text-capitalize ls-normal mb-0">
          Orders
        </h4>
      </div>
    </div>

    <table class="shop-table account-orders-table mb-6">
      <thead>
        <tr>
          <th class="orders-id">
            Order
          </th>
          <th class="orders-date">
            Date
          </th>
          <th class="orders-total">
            Total
          </th>
          <th class="orders-payment-method">
            Payment Methods
          </th>
          <th class="orders-payment">
            Payment
          </th>
          <th class="orders-status">
            Status
          </th>

          <th class="orders-actions">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in listOrders" :key="order.id">
          <td class="orders-id ">
            {{ order.code }}
          </td>
          <td class="orders-date">
            {{ order.orderDate }}
          </td>
          <td class="orders-total">
            {{ order.total }}
          </td>
          <td class="orders-payment-methods">
            <div class="show-payment-method">
              <div v-if="order.paymentMethod === 0" class="cod-payment-method">
                <Icon name="tabler:map-pin-dollar" /> COD
              </div>
              <div v-else class="bank-transfer-payment-method">
                <Icon name="mingcute:bank-card-line" /> Bank transfer
              </div>
            </div>
          </td>
          <td class="orders-payment">
            <div class="show-payment">
              <div v-if="order.payment === 0" class="unpaided-payment">
                <Icon name="mdi:bank-remove" /> Unpaided
              </div>
              <div v-else class="paided-payment">
                <Icon name="mdi:bank-check" /> Paided
              </div>
            </div>
          </td>
          <td class="orders-status">
            <div class="show-status">
              <div v-if="order.status === 0" class="pending-status">
                <Icon name="material-symbols:pending-actions-rounded" /> Pending
              </div>
              <div v-else-if="order.status === 1" class="approved-status">
                <Icon name="material-symbols:order-approve-outline" /> Approved
              </div>
              <div v-else class="delivered-status">
                <Icon name="mdi:package-variant-closed-delivered" /> Delivered
              </div>
            </div>
          </td>

          <td class="orders-action">
            <button class="btn btn-default btn-block btn-sm btn-rounded" @click="viewOrder(order)">
              View
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <NuxtLink href="/categories" class="btn btn-dark btn-rounded btn-icon-right">
      Go Shop
      <i class="w-icon-long-arrow-right" />
    </NuxtLink>
  </div>
  <MyAccountOrdersView v-if="isShowViewOrder" :vieworders="informationOrders" :suborder="listOrders" @backtolist="showViewOrder" />
</template>

<style scoped lang="scss">
.cod-payment-method svg,
.unpaided-payment svg,
.pending-status svg{
  color: red;
  font-size: 2.5rem;
  margin-right: 0.5rem;
}

.bank-transfer-payment-method svg {
  color: #7DBB00;
  font-size: 2.5rem;
  margin-right: 0.5rem;
}
.paided-payment svg,
.delivered-status svg {
  color: rgb(216, 134, 57);
  font-size: 2.5rem;
  margin-right: 0.5rem;
}
.approved-status svg {
  color: #008000;
  font-size: 2.5rem;
  margin-right: 0.5rem;
}
#account-orders.tab-pane {
  padding-top: 0.8rem;
}

.tab-pane {
  padding-top: 1.3rem;
  font-size: 1.3rem;
  line-height: 1.7;
  padding: 1.3rem 0;
  color: #666;
}

#account-orders .icon-box {
  margin-bottom: 1.8rem;
}

.my-account .icon-box-light {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
}

.icon-box-side {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.icon-box-light .icon-box-title {
  font-size: 2rem;
}

#account-orders .account-orders-table .orders-id {
  padding-left: 1rem;
}

#account-orders .account-orders-table th {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.shop-table th {
  padding: 1.7rem 0 1.3rem;
  font-size: 1.6rem;
  font-weight: 600;
  color: #333;
  text-transform: capitalize;
  line-height: 1.6;
  letter-spacing: 0;
  text-align: start;
}

#account-orders .account-orders-table .order-id {
  padding-left: 1rem;
width: 20.77%;
}

#account-orders .account-orders-table td {
  padding-top: 2.1rem;
  padding-bottom: 2.1rem;
}

.btn.btn-sm {
    font-size: 1.3rem;
    padding: 0.5em 1.4em;
}
.shop-table td {
  padding: 2rem 0 2rem 0;
  border-top: 1px solid #eee;
  font-size: 1.4rem;
}

#account-orders .order-action .btn:hover {
  background-color: #333;
  border-color: #333;
  color: #fff;
}
</style>
