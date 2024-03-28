<script setup>
const dataOrders = defineProps(['vieworders', 'suborder'])
const emits = defineEmits(['backtolist'])
const commonStore = useCommonStore()
const ordersDetail = ref()
const products = computed(() => ordersDetail.value?.products)
const dataAddress = computed(() => {
  return {
    receiver: ordersDetail.value.receiver,
    address: ordersDetail.value.shippingAddress,
    phone: ordersDetail.value.phone,
  }
})

async function getOrdersDetail() {
  commonStore.setIsLoading(true)
  const { data } = await useCustomFetch(`orders/${dataOrders.vieworders.code}`)
  if (data.value)
    ordersDetail.value = data.value
  commonStore.setIsLoading(false)
}
getOrdersDetail()

function backToList() {
  emits('backtolist')
}
function viewOrder(orderCode) {
  console.log(orderCode)
}
</script>

<template>
  <div v-if="ordersDetail" class="tab-pane active order">
    <p class="mb-7">
      Order {{ ordersDetail.code }} was placed on {{ ordersDetail.orderDate }} and is currently

      <span class="show-orderstatus">
        <span v-if="ordersDetail.status === 0">
          Pending approval
        </span>
        <span v-else-if="ordersDetail.status === 1">
          On hold
        </span>
        <span v-else>
          Delivered
        </span>
      </span>
    </p>
    <CheckoutOrderDetails :order="ordersDetail" :products="products" />
    <div class="sub-orders mb-10">
      <h4 class="title mb-5 font-weight-bold ls-25">
        Sub Orders
      </h4>
      <div class="alert alert-icon alert-inline mb-5">
        <i class="w-icon-exclamation-triangle" />
        <strong>Note: </strong>This order has products from multiple vendors. So we divided this order into multiple
        vendor orders.
        Each order will be handled by their respective vendor independently.
      </div>
      <table class="shop-table account-orders-table mb-6">
        <thead class="sub-order">
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
            <th class="orders-status">
              Status
            </th>

            <th class="orders-actions">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="order-id">
              {{ ordersDetail.code }}
            </td>
            <td class="order-date">
              {{ ordersDetail.orderDate }}
            </td>
            <td class="order-total">
              {{ ordersDetail.total }}
            </td>
            <td class="order-status">
              <div class="show-status">
                <div v-if="ordersDetail.status === 0" class="pending-status">
                  <Icon name="material-symbols:pending-actions-rounded" /> Pending
                </div>
                <div v-else-if="ordersDetail.status === 1" class="approved-status">
                  <Icon name="material-symbols:order-approve-outline" /> Approved
                </div>
                <div v-else class="delivered-status">
                  <Icon name="mdi:package-variant-closed-delivered" /> Delivered
                </div>
              </div>
            </td>

            <td class="order-action">
              <button class="btn btn-default btn-block btn-sm btn-rounded" @click="viewOrder(ordersDetail.code)">
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="row">
      <div class="col-md-6">
        <MyAccountAddressInformation :address="dataAddress" :is-editable="false" />
      </div>
      <div class="col-md-6">
        <MyAccountPaymentMethodsInformation :is-editable="false" :payment-method="ordersDetail.payment" />
      </div>
    </div>
  </div>
  <button class="btn btn-dark btn-rounded btn-icon-right" @click="backToList()">
    <i class="w-icon-long-arrow-left" /> Back to list
  </button>
</template>

<style lang="scss" scoped>
.pending-status svg{
  color: red;
  font-size: 2.5rem;
  margin-right: 0.5rem;
}
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
.title {
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
.ls-25 {
    letter-spacing: -0.025em !important;
}
.font-weight-bold {
    font-weight: 600 !important;
}
.order .alert {
    border: 1px dashed #e5e5e5;
}
.alert-icon {
    padding: 1.4rem 2.2rem 1.4rem 1.9rem;
}
.alert {
    position: relative;
    padding: 1.4rem 3.5rem 1.4rem 2rem;
    font-size: 1.4rem;
    font-family: Poppins, sans-serif;
    line-height: 1.75;
    border: 1px solid;
    letter-spacing: -0.003em;
    border-radius: 0.3rem;
}
.order .alert i {
    color: #799b5a;
}
.alert-icon i.w-icon-exclamation-triangle {
    font-size: 1.8rem;
}
.alert-icon i {
    display: inline-block;
    vertical-align: middle;
    margin: 0 0.8rem 0 0.1rem;
    font-size: 1.8rem;
    line-height: 1;
}
#account-orders .account-orders-table .orders-id {
  padding-left: 1rem;
}

#account-orders .account-orders-table th {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.sub-order {
  border-bottom: 1px solid #eee;
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
  font-size: 1.4rem;
}
</style>
