<script setup>
const commonStore = useCommonStore()

const showAdd = ref(false)
const showEdit = ref(false)
const confirmDelete = ref(false)
const idDelete = ref()
const propsData = ref({
  id: -1,
  user_id: -1,
  provider: '',
  accountNumber: '',
})
const paymentMethods = ref()

async function getPaymentMethods() {
  commonStore.setIsLoading(true)
  const { data } = await useCustomFetch(`payment-methods`)
  if (data.value)
    paymentMethods.value = data.value
  commonStore.setIsLoading(false)
}
getPaymentMethods()

function confirmModel(id) {
  idDelete.value = id
  confirmDelete.value = !confirmDelete.value
}
function showAddPaymentMethod() {
  showAdd.value = !showAdd.value
  showEdit.value = false
}
function showEditPaymentMethod() {
  showEdit.value = !showEdit.value
  showAdd.value = false
}
function editPayment(payment) {
  propsData.value = payment
  showEdit.value = !showEdit.value
  showAdd.value = false
}
async function deletePaymentMethod() {
  commonStore.setIsLoading(true)
  const { data, error } = await useCustomFetch(`payment-methods/${idDelete.value}`, {
    method: 'DELETE',
    body: { id: idDelete.value },
  })
  if (data.value) {
    showEdit.value = false
    showAdd.value = false
    getPaymentMethods()
  }
  else { console.error('An error occurred', error) }
  confirmModel()
  commonStore.setIsLoading(false)
}
</script>

<template>
  <div id="paymentMethods" class="tab-pane active">
    <div class="flex justify-between items-center">
      <div class="payment-methods-header">
        <div class="icon-box icon-box-side icon-box-light">
          <span class="icon-box-icon icon-paymentMethods mr-2">
            <Icon name="fluent:payment-28-regular" />
          </span>
          <div class="icon-box-content">
            <h4 class="icon-box-title ls-normal">
              Payment Methods
            </h4>
          </div>
        </div>
        <p class="mb-2">
          The following payment methods will be used on the checkout page by default.
        </p>
      </div>
      <button
        type="button"
        class="button-add rounded-md px-6 py-7 my-3 text-sm font-semibold text-white shadow-sm flex items-center"
        @click="showAddPaymentMethod"
      >
        <Icon name="gg:add" class="mr-1 add-icon" />
        Add Payment Methods
      </button>
    </div>
    <div class="row">
      <div v-for="itemPayment in paymentMethods" :key="itemPayment.id" class="col-sm-6">
        <MyAccountPaymentMethodsInformation
          :is-editable="true"
          :payment-method="itemPayment"
          @show-edit-payment-method="editPayment"
          @id-delete="confirmModel"
        />
      </div>
      <BaseConfirm :is-confirm="confirmDelete" @click="confirmModel">
        <template #content>
          <div class="text-center icon-box icon-box-side icon-box-light">
            <div class="icon-box-content">
              <h4 class="mb-0 ls-normal">
                Payment Methods
              </h4>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Are you sure you want to delete your pament method? All your data will be permanently
                  deleted. This action cannot be undone.
                </p>
              </div>
            </div>
          </div>
        </template>
        <template #button>
          <button
            type="button"
            class="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-xl font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            @click="deletePaymentMethod()"
          >
            Delete
          </button>
          <button
            type="button"
            class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-xl font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            @click="confirmModel"
          >
            Cancel
          </button>
        </template>
      </BaseConfirm>
    </div>
  </div>
  <MyAccountPaymentMethodsForm
    v-if="showAdd"
    :list-payment-methods="paymentMethods"
    @on-close="showAddPaymentMethod"
    @on-update-data="getPaymentMethods"
  />
  <MyAccountPaymentMethodsForm
    v-if="showEdit"
    :payment-methods-data="propsData"
    :list-payment-methods="paymentMethods"
    :is-update="true"
    @on-close="showEditPaymentMethod"
    @on-update-data="getPaymentMethods"
  />
</template>

<style scoped lang="scss">
#paymentMethods.tab-pane {
  padding-top: 0.9rem;
}

.tab-pane {
  font-size: 1.3rem;
  line-height: 1.7;
  padding: 1.3rem 0;
  color: #666;
}

.my-account .icon-box-light {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
}

.icon-box-side .icon-box-content {
  text-align: start;
}

.my-account .icon-box-light .icon-box-title {
  font-size: 2rem;
}
.payment-methods-header {
  & p {
    font-size: 1.4rem;
    line-height: 1.8;
  }
}
.icon-box-icon svg {
  font-size: 2.9rem;
}

.icon-box .icon-box-title {
  font-size: 1.4rem;
  text-transform: capitalize;
  letter-spacing: -0.025em;
  margin-bottom: 0.4rem;
}

.row {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin: 1rem -1rem 0.4rem 0;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table {
  display: table;
  border-collapse: separate;
  box-sizing: border-box;
  text-indent: initial;
  border-spacing: 2px;
  border-color: gray;
}

.button-add {
  font-size: 1.4rem;
  line-height: 1;
  padding: 0.7em 1.4em;
  background-color: #333;
  color: #fff;
  border: 1px solid #333;
  margin-bottom: 1.5rem;

  &:hover {
    background-color: #555;
    color: #fff;
    transition: 0.2s;
  }

  & .add-icon {
    font-size: 1.5rem;
    color: inherit;
  }
}
</style>
