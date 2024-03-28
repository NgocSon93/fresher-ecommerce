<script setup lang="ts">
const props = defineProps(['paymentMethodsData', 'listPaymentMethods', 'isUpdate'])
const emits = defineEmits(['onClose', 'onUpdateData'])

const commonStore = useCommonStore()

const paymentUpdated = reactive({
  id: props.paymentMethodsData?.id ?? -1,
  provider: props.paymentMethodsData?.provider ?? '',
  accountNumber: props.paymentMethodsData?.accountNumber ?? '',
})
const message = reactive({
  success: '',
  error: '',
  provider: '',
  accountNumber: '',
})

function focusProvider() {
  message.provider = ''
}
function focusAccountNumber() {
  message.accountNumber = ''
}
function onToggleCancel() {
  emits('onClose')
}
async function updatePaymentMethods() {
  clearMessage()
  let isSuccess = true
  const check = props.listPaymentMethods.find((e: any) => {
    return e.provider === paymentUpdated.provider && e.accountNumber === paymentUpdated.accountNumber
  })

  if (!paymentUpdated.provider) {
    message.provider = 'Provider cannot be blank.'
    isSuccess = false
  }
  if (!paymentUpdated.accountNumber) {
    message.accountNumber = 'Account Number cannot be blank.'
    isSuccess = false
  }
  if (check) {
    message.error = 'The account number has already exists.'
    isSuccess = false
  }
  if (isSuccess) {
    commonStore.setIsLoading(true)
    if (props.isUpdate) {
      const { data, error } = await useCustomFetch(`payment-methods/${paymentUpdated.id}`, {
        method: 'PATCH',
        body: {
          provider: paymentUpdated.provider,
          accountNumber: paymentUpdated.accountNumber,
        },
      })
      if (data.value) {
        emits('onClose')
        emits('onUpdateData')
        message.success = 'Success'
      }
      else {
        message.error = `${error}`
      }
    }
    else {
      const { data, error } = await useCustomFetch(`payment-methods`, {
        method: 'POST',
        body: {
          provider: paymentUpdated.provider,
          accountNumber: paymentUpdated.accountNumber,
        },
      })
      if (data.value) {
        emits('onClose')
        emits('onUpdateData')
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
  <div class="edit-payment-methods">
    <div class="flex items-center justify-between font-bold">
      <div v-if="props.isUpdate" class="flex items-center">
        <span>
          <Icon name="bxs:edit" class="payment-icon mr-2" />
        </span>
        <h2 class="title ls-25 font-weight-bold">
          Edit Payment Method
        </h2>
      </div>
      <div v-else class="flex items-center">
        <span>
          <Icon name="bxs:edit" class="payment-icon mr-2" />
        </span>
        <h2 class="title ls-25 font-weight-bold">
          Add Payment Method
        </h2>
      </div>
      <button
        type="button"
        class="button-close rounded-md px-4 py-2 my-3 text-sm font-semibold text-white shadow-sm flex items-center"
        @click="onToggleCancel"
      >
        <Icon name="zondicons:close-outline" class="mr-1 button-close-icon" />
        Close
      </button>
    </div>
    <form class="payment-form pb-4">
      <p v-if="message.success" class="success">
        {{ message.success }}
      </p>
      <p v-if="message.error" class="error">
        {{ message.error }}
      </p>
      <div class="form-group">
        <label for="provider" class="block text-sm font-medium leading-6 text-gray-900">
          Provider *
        </label>
        <div class="input-form">
          <input
            id="provider" v-model="paymentUpdated.provider" type="text" name="provider" autocomplete="given-name"
            class="form-control form-control-md" @focus="focusProvider"
          >
        </div>
        <p v-if="message.provider" class="error">
          {{ message.provider }}
        </p>
      </div>

      <div class="form-group">
        <label for="accountNumber" class="block text-sm font-medium leading-6 text-gray-900">
          Account Number *
        </label>
        <div class="input-form">
          <input
            id="accountNumber" v-model="paymentUpdated.accountNumber" type="text" name="accountNumber"
            autocomplete="family-name" class="form-control form-control-md" @focus="focusAccountNumber"
          >
          <p v-if="message.accountNumber" class="error">
            {{ message.accountNumber }}
          </p>
        </div>
      </div>

      <div class="mt-4 flex items-center justify-start gap-x-6">
        <button type="button" class="btn btn-rounded btn-cancel px-4 py-2" @click="onToggleCancel">
          Cancel
        </button>
        <button type="button" class="btn btn-rounded px-4 py-2" @click="updatePaymentMethods">
          <span v-if="props.isUpdate">Update</span>
          <span v-else>Add</span>
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.edit-payment-methods {
  & .payment-icon {
    font-size: 3rem;
    color: #999;
  }

  & .title {
    font-size: 2rem;
    margin: 0;
  }

  & .button-close {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
    padding: 0.7em 1.4em;
    margin: 1rem 0;
    background-color: #000000;
    color: #333;
    border: 1px solid #333;

    &:hover {
      background-color: #333;
      color: #fff;
      transition: 0.2s;
    }
  }

  & .payment-form {
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

  .error {
    color: red;
    font-size: 1.2rem;
    margin-bottom: 1.3rem;
  }

  .success {
    color: green;
    font-size: 1.2rem;
    margin-bottom: 1.3rem;
  }
}
</style>
