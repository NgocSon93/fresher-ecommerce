<script setup>
defineProps(['paymentMethod', 'isEditable'])
const emits = defineEmits(['showEditPaymentMethod', 'idDelete'])

function editPaymentMethod(payment) {
  emits('showEditPaymentMethod', payment)
}
function confirmModelDelete(id) {
  emits('idDelete', id)
}
</script>

<template>
  <div id="info-address" class="info-payment mb-6 ">
    <div class="pr-lg-8">
      <div class="payment-methods-wrapper pb-2">
        <h4 class="title ls-25 font-weight-bold">
          Payment Methods
        </h4>
        <button
          v-if="isEditable" type="button"
          class="button-delete rounded-md px-4 py-2 ml-4 leading-none font-semibold text-white shadow-sm"
          @click="confirmModelDelete(paymentMethod.id)"
        >
          Delete
        </button>
      </div>

      <div class="mb-4">
        <table class="payment-methods-table">
          <tbody>
            <tr>
              <th>Provider:</th>
              <td>{{ paymentMethod.provider }}</td>
            </tr>
            <tr>
              <th>AccountNumber:</th>
              <td>{{ paymentMethod.accountNumber }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="isEditable" class="payment-methods-link">
        <NuxtLink
          class="btn btn-link btn-underline btn-icon-right text-primary"
          @click="editPaymentMethod(paymentMethod)"
        >
          Edit your payment methods
          <i class="w-icon-long-arrow-right" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.info-payment {
  & .payment-methods-wrapper {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;

    & .title {
      font-size: 1.5rem;
      margin: 0;
    }

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
      font-size: 1.5rem;
      font-weight: 700;
      line-height: 1.2;
    }

    & .button-delete {
      font-size: 1.4rem;
      line-height: 1;
      padding: 0.5em 1.5em;
      background-color: #000000;
      color: #333;
      border: 1px solid #333;

      &:hover {
        background-color: #333;
        color: #fff;
        transition: 0.2s;
      }
    }
  }

  & .payment-methods-table {
    & th,
    & td {
      padding: 0.3rem 0;
    }

    & th {
      text-align: start;
      width: 50%;
      font-weight: 400;
      color: #666;
    }

    & td {
      color: #333;
    }
  }
}
</style>
