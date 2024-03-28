<script setup>
const listPaymentMethod = defineProps(['listpaymentmethod'])
const emits = defineEmits(['addPaymentMethods', 'cancelAddPaymentMethods'])
const addPaymentMethod = reactive({
  provider: '',
  accountNumber: '',
})
const error = reactive({
  status: false,
  provider: '',
  accountNumber: '',
})
function focusReceiver() {
  error.provider = ''
}
function focusAccountNumber() {
  error.accountNumber = ''
}

async function createPaymentMethods() {
  let isSuccess = true
  const check = listPaymentMethod.listpaymentmethod.map(e => e.accountNumber)

  if (!addPaymentMethod.provider) {
    error.provider = 'Recipient cannot be blank.'
    error.status = true
    isSuccess = false
  }
  if (!addPaymentMethod.accountNumber) {
    error.accountNumber = 'Invalid Phone Number.'
    error.status = true
    isSuccess = false
  }
  if (check.includes(addPaymentMethod.accountNumber)) {
    error.accountNumber = 'The account number has already been taken.'
    error.status = true
    isSuccess = false
  }
  if (isSuccess)
    emits('addPaymentMethods', addPaymentMethod)
}

function cancelAddPaymentMethods() {
  emits('cancelAddPaymentMethods')
}
</script>

<template>
  <div class="flex items-center justify-between font-bold">
    <div class="flex items-center">
      <span>
        <Icon name="bxs:edit" class="payment-methods-icon-edit mr-2" />
      </span>
      <h2 class="title ls-25 font-weight-bold">
        Add Payment Method
      </h2>
    </div>
    <button
      type="button"
      class="button-close rounded-md px-4 py-2 my-3 text-sm font-semibold text-white shadow-sm flex items-center"
      @click="cancelAddPaymentMethods()"
    >
      <Icon name="zondicons:close-outline" class="mr-1 button-close-icon" />
      Close
    </button>
  </div>
  <form>
    <div class="pb-1">
      <div class="row">
        <div class="form-group">
          <label for="provider" class="block text-sm font-medium leading-6 text-gray-900">Provider</label>
          <input
            id="provider" v-model="addPaymentMethod.provider" type="text" name="provider"
            autocomplete="given-name" class="form-control form-control-md" @focus="focusReceiver"
          >
          <p v-if="error.status" class="error">
            {{ error.provider }}
          </p>
        </div>
      </div>

      <div class="row">
        <div class="form-group">
          <label for="accountNumber" class="block text-sm font-medium leading-6 text-gray-900">Account Number</label>
          <input
            id="accountNumber" v-model="addPaymentMethod.accountNumber" type="text" name="accountNumber"
            autocomplete="family-name" class="form-control form-control-md" @focus="focusAccountNumber"
          >
          <p v-if="error.status" class="error">
            {{ error.accountNumber }}
          </p>
        </div>
      </div>
    </div>
    <div class="mt-4 flex items-center justify-start gap-x-6">
      <button type="button" class="btn bg-white btn-rounded px-4 py-2" @click="cancelAddPaymentMethods">
        Cancel
      </button>
      <button type="button" class="btn btn-rounded px-4 py-2" @click="createPaymentMethods">
        Add
      </button>
    </div>
  </form>
</template>

<style scoped lang="scss">
form {
    display: block;
    margin-top: 0em;
}

.row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
}
.payment-methods-icon-edit {
    font-size: 3rem;
    color: #999;
}

#account-payment-methods .title {
    font-size: 1.5rem;
    margin: 0;
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
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.2;
}

.ls-25 {
    margin: 0;
    letter-spacing: -0.025em !important;
}

.font-weight-bold {
    font-weight: 600 !important;
}

.form-group label {
    color: #666;
    font-size: 1.4rem;
    line-height: 2.3;
}

.form-group .form-control {
    margin-bottom: 1.6rem;
    border-radius: 0.3rem;
    font-size: 1.4rem;
    color: #666;
}

.form-control.form-control-md {
    font-size: 1.3rem;
    min-height: 4.4rem;
    margin: 0 !important;
}
.button-close {
    font-size: 1.5rem;
    height: 3rem;
    background-color: #333;
    color: #fff;
    border: 1px solid #333;

    &:hover {
        background-color: #555;
        color: #fff;
        transition: 0.2s;
    }

    & .button-close-icon {
        font-size: 1.5rem;
    }
}

.btn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    font-size: 1.5rem;
    padding: 1.5rem;
    margin: 1rem 0;
    background-color: #000000;
    color: #fff;
    border: 1px solid #333;

    &:hover {
        background-color: #333;
        color: #fff;
        transition: 0.2s;
    }
}

.bg-white {
    border-color: #eee;
    color: #000;

    &:hover {
        color: #333;
    }
}

.error {
    color: red;
    font-size: 1.2rem;
}
p {
    margin: 0;
}
</style>
