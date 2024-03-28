<script setup>
import { ValidateHelper } from '~/utils/validate.helper'

const emits = defineEmits(['emitAddress', 'cancelAdd'])

const addresses = reactive({
  receiver: '',
  phone: '',
  address: '',
})
const error = reactive({
  receiver: '',
  phone: '',
  address: '',
})

function focusReceiver() {
  error.receiver = ''
}
function focusPhone() {
  error.phone = ''
}
function focusAddress() {
  error.address = ''
}
async function createAddress() {
  let isSuccess = true
  if (!addresses.receiver) {
    error.receiver = 'Recipient cannot be blank.'
    error.status = true
    isSuccess = false
  }
  if (!ValidateHelper.isValidPhoneNumber(addresses.phone)) {
    error.phone = 'Invalid Phone Number.'
    error.status = true
    isSuccess = false
  }
  if (!addresses.address) {
    error.address = 'Address cannot be empty.'
    error.status = true
    isSuccess = false
  }
  if (isSuccess)
    emits('emitAddress', addresses)
}

function cancelAdd() {
  emits('cancelAdd')
}
</script>

<template>
  <form>
    <div class="pb-4">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="receiver" class="block text-sm font-medium leading-6 text-gray-900">Receiver</label>
            <input
              id="receiver" v-model="addresses.receiver" type="text" name="receiver" autocomplete="given-name"
              class="form-control form-control-md" @focus="focusReceiver"
            >
            <p v-if="error.status" class="error">
              {{ error.receiver }}
            </p>
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label for="phone" class="block text-sm font-medium leading-6 text-gray-900">Phone</label>
            <input
              id="phone" v-model="addresses.phone" type="text" name="phone" autocomplete="family-name"
              class="form-control form-control-md" @focus="focusPhone"
            >
            <p v-if="error.status" class="error">
              {{ error.phone }}
            </p>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="address" class="block text-sm font-medium leading-6 text-gray-900">Address</label>
            <input
              id="address" v-model="addresses.address" name="address" type="address" autocomplete="address"
              class="form-control form-control-md" @focus="focusAddress"
            >
            <p v-if="error.status" class="error">
              {{ error.address }}
            </p>
          </div>
        </div>
        <div class="col-md-6 select-none">
          <div class="form-group">
            <label for="company" class="block text-sm font-medium leading-6 text-gray-900">Company</label>
            <input
              id="company" type="text" name="company" autocomplete="family-name" class="form-control form-control-md select-none"
              value="Hybrid Technologies VN" readonly
            >
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4 sm:col-start-1">
          <div class="form-group">
            <label for="city" class="block text-sm font-medium leading-6 text-gray-900">City</label>
            <input
              id="city" type="text" name="city" autocomplete="address-level2" class="form-control form-control-md" value="Ha Noi"
              readonly
            >
          </div>
        </div>

        <div class="col-md-4">
          <div class="form-group">
            <label for="region" class="block text-sm font-medium leading-6 text-gray-900">Country</label>
            <input
              id="region" type="text" name="region" autocomplete="address-level1" class="form-control form-control-md"
              value="Viet Nam" readonly
            >
          </div>
        </div>

        <div class="col-md-4">
          <div class="form-group">
            <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
            <input
              id="postal-code" type="text" name="postal-code" autocomplete="postal-code" class="form-control form-control-md"
              value="92020" readonly
            >
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 flex items-center justify-start gap-x-6">
      <button type="button" class="btn bg-white btn-rounded px-4 py-2" @click="cancelAdd">
        Cancel
      </button>
      <button
        type="button" class="btn btn-rounded px-4 py-2"
        @click="createAddress"
      >
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

.col-md-6 {
  max-width: 50%;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 50%;
  flex: 0 0 50%;
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

.btn {
  font-size: 1.4rem;
  padding: 0.7em 1.4em;
  min-width: 10rem;
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
</style>
