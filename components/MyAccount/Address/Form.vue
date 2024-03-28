<script setup lang="ts">
import { ValidateHelper } from '~/utils/validate.helper'

const props = defineProps(['addressData', 'isUpdate'])
const emit = defineEmits(['onClose', 'onUpdateData'])

const commonStore = useCommonStore()
const profileStore = useProfileStore()

const cityOptions = ref([
  { name: 'Ha Noi', postCode: 100000 },
  { name: 'Ho Chi Minh', postCode: 550000 },
  { name: 'Da Nang', postCode: 700000 },
])

const userId = computed(() => profileStore.profile?.id ?? -1)
const email = computed(() => profileStore.profile?.email ?? '')
const company = ref('Hybrid Technologies VN')

const addressUpdated = reactive({
  id: props.addressData?.id ?? -1,
  user_id: props.addressData?.user_id ?? userId.value,
  receiver: props.addressData?.receiver ?? '',
  phone: props.addressData?.phone ?? '',
  address: props.addressData?.address ?? '',
  city: cityOptions.value[0],
})
const address = computed<string>(() => {
  let res = `${addressUpdated.city.name}`
  if (addressUpdated.address)
    res = `${addressUpdated.address}, ${res}`
  return res
})
const message = reactive({
  success: '',
  error: '',
  receiver: '',
  phone: '',
  address: '',
})

function focusReceiver() {
  message.receiver = ''
}
function focusPhone() {
  message.phone = ''
}
function focusAddress() {
  message.address = ''
}
function onToggleCancel() {
  emit('onClose')
}
async function updateAddresses() {
  clearMessage()
  let isSuccess = true
  if (!addressUpdated.receiver) {
    message.receiver = 'Recipient cannot be blank.'
    isSuccess = false
  }
  if (!ValidateHelper.isValidPhoneNumber(addressUpdated.phone)) {
    message.phone = 'Invalid Phone Number.'
    isSuccess = false
  }
  if (!addressUpdated.address) {
    message.address = 'Address cannot be empty.'
    isSuccess = false
  }
  if (isSuccess) {
    commonStore.setIsLoading(true)
    if (props.isUpdate) {
      const { data, error } = await useCustomFetch(`addresses/${addressUpdated.id}`, {
        method: 'PATCH',
        body: {
          user_id: addressUpdated.user_id,
          receiver: addressUpdated.receiver,
          phone: addressUpdated.phone,
          address: address.value,
        },
      })
      if (data.value) {
        emit('onClose')
        emit('onUpdateData')
        message.success = 'Success'
      }
      else {
        message.error = `${error}`
      }
    }
    else {
      const { data, error } = await useCustomFetch(`addresses`, {
        method: 'POST',
        body: {
          user_id: addressUpdated.user_id,
          receiver: addressUpdated.receiver,
          phone: addressUpdated.phone,
          address: address.value,
        },
      })
      if (data.value) {
        emit('onClose')
        emit('onUpdateData')
        message.success = 'Success'
      }
      else {
        message.error = `${error}`
      }
    }
    commonStore.setIsLoading(false)
  }
}
function clearMessage() {
  message.error = ''
  message.success = ''
}
</script>

<template>
  <form class="address-form pb-4">
    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <div class="form-group">
          <label
            for="receiver"
            class="inline-block text-[1.4rem] font-normal leading-[2.1] text-secondary-500 mb-[0.1rem]"
          >
            Receiver *
          </label>
          <div class="input-form">
            <input
              id="receiver" v-model="addressUpdated.receiver" type="text" name="receiver"
              class="form-control form-control-md" @focus="focusReceiver"
            >
          </div>
          <p v-if="message.receiver" class="error">
            {{ message.receiver }}
          </p>
        </div>
      </div>
      <div class="col-lg-6 col-sm-12">
        <div class="form-group">
          <label for="phone" class="inline-block text-[1.4rem] font-normal leading-[2.1] text-secondary-500 mb-[0.1rem]">
            Phone *
          </label>
          <div class="input-form">
            <input
              id="phone" v-model="addressUpdated.phone" type="text" name="phone" class="form-control form-control-md"
              @focus="focusPhone"
            >
            <p v-if="message.phone" class="error">
              {{ message.phone }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label for="region" class="inline-block text-[1.4rem] font-normal leading-[2.1] text-secondary-500 mb-[0.1rem]">
        Country / Region *
      </label>
      <div class="select-box">
        <select name="country" class="form-control form-control-md">
          <option value="vn" selected>
            Viet Nam
          </option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label for="address" class="inline-block text-[1.4rem] font-normal leading-[2.1] text-secondary-500 mb-[0.1rem]">
        Stress address *
      </label>
      <div class="input-form">
        <input
          id="address" v-model="addressUpdated.address" name="address" type="address"
          placeholder="House number and street name" class="form-control form-control-md" @focus="focusAddress"
        >
        <p v-if="message.address" class="error">
          {{ message.address }}
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <div class="form-group">
          <label for="city" class="inline-block text-[1.4rem] font-normal leading-[2.1] text-secondary-500 mb-[0.1rem]">
            City *
          </label>
          <div class="select-box">
            <select v-model="addressUpdated.city" name="city" class="form-control form-control-md">
              <option
                v-for="(item, index) in cityOptions" :key="index" :value="item"
                :selected="addressUpdated.city === item"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-sm-12">
        <div class="form-group">
          <label
            for="postal-code"
            class="inline-block text-[1.4rem] font-normal leading-[2.1] text-secondary-500 mb-[0.1rem]"
          >
            ZIP / Postal code *
          </label>
          <div class="input-form">
            <input
              id="postal-code" type="text" name="postal-code" class="form-control form-control-md"
              :value="addressUpdated.city.postCode" readonly
            >
          </div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label for="email" class="inline-block text-[1.4rem] font-normal leading-[2.1] text-secondary-500 mb-[0.1rem]">
        Email address *
      </label>
      <div class="input-form">
        <input id="email" type="text" name="email" class="form-control form-control-md" :value="email" readonly>
      </div>
    </div>
    <div class="form-group">
      <label for="company" class="inline-block text-[1.4rem] font-normal leading-[2.1] text-secondary-500 mb-[0.1rem]">
        Company name (optional)
      </label>
      <div class="input-form">
        <input id="company" type="text" name="company" class="form-control form-control-md" :value="company" readonly>
      </div>
    </div>

    <div class="mt-4 flex items-center justify-start gap-x-6">
      <button type="button" class="btn btn-rounded btn-cancel px-4 py-2" @click="onToggleCancel">
        Cancel
      </button>
      <button type="button" class="btn btn-rounded px-4 py-2" @click="updateAddresses">
        <span v-if="props.isUpdate">Update</span>
        <span v-else>Add</span>
      </button>
    </div>
  </form>
</template>

<style scoped lang="scss">
.address-form {
  display: block;
  margin-top: 0em;

  & .form-group {

    & label {
      color: #666;
      font-size: 1.4rem;
      line-height: 2.3;
    }

    & select {
      padding-left: 1.4rem;
      max-width: 100%;
    }

    & .form-control {
      margin-bottom: 1.3rem;
      padding-left: 2rem;
      border-radius: 0.3rem;
      font-size: 1.4rem;
      color: #000;

      &:placeholder-shown {
        color: #999;
      }

      &.form-control-md {
        font-size: 1.3rem;
        min-height: 4.4rem;
      }

      &.text-dark {
        color: #000;
      }
    }

    .error {
      color: red;
      font-size: 1.2rem;
      margin-bottom: 1.3rem;
    }
  }

  .btn {
    font-size: 1.4rem;
    padding: 0.7em 1.4em;
    min-width: 11rem;
    margin: 1.5rem 0;
    background-color: #000000;
    color: #fff;
    border: 1px solid #333;

    &:hover {
      background-color: #333;
      color: #fff;
      transition: 0.2s;
    }

    &.btn-cancel {
      background-color: #fff;
      border-color: #eee;
      color: #000;

      &:hover {
        background-color: #eee;
      }
    }
  }
}
</style>
