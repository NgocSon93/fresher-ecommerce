<script setup>
const props = defineProps(['address', 'isEditable'])
const emits = defineEmits(['showEditAddress', 'idDelete'])

const profileStore = useProfileStore()

const cityOptions = ref([
  { name: 'Ha Noi', postCode: 100000 },
  { name: 'Ho Chi Minh', postCode: 550000 },
  { name: 'Da Nang', postCode: 700000 },
])

const email = computed(() => profileStore.profile?.email ?? '')
const company = ref('Hybrid Technologies VN')
const postcode = ref('100000')
const city = computed(() => {
  if (props.address.address) {
    const addressArray = props.address.address.split(', ')
    const cityName = addressArray[addressArray.length - 1]
    const city = cityOptions.value.find(value => value.name === cityName)
    if (city) {
      postcode.value = city.postCode
      return cityName
    }
  }
  postcode.value = '100000'
  return 'Ha Noi'
})

function editAddress(address) {
  emits('showEditAddress', address)
}
function confirmModelDelete(id) {
  emits('idDelete', id)
}
</script>

<template>
  <div id="info-address" class="info-address mb-6">
    <div class="ecommerce-address billing-address pr-lg-8">
      <div class="billing-address-wrapper pb-2">
        <h4 class="title ls-25 font-weight-bold">
          Billing Address
        </h4>
        <button
          v-if="isEditable" type="button"
          class="button-delete rounded-md px-4 py-2 ml-4 leading-none font-semibold text-white shadow-sm"
          @click="confirmModelDelete(address.id)"
        >
          Delete
        </button>
      </div>
      <address class="mb-4">
        <table class="address-table">
          <tbody>
            <tr>
              <th>Name:</th>
              <td>{{ address.receiver }}</td>
            </tr>
            <tr>
              <th>Company:</th>
              <td>{{ company }}</td>
            </tr>
            <tr>
              <th>Address:</th>
              <td>{{ address.address }}</td>
            </tr>
            <tr>
              <th>City:</th>
              <td>{{ city }}</td>
            </tr>
            <tr>
              <th>Country:</th>
              <td>Viet Nam</td>
            </tr>
            <tr>
              <th>Postcode:</th>
              <td>{{ postcode }}</td>
            </tr>
            <tr>
              <th>Phone:</th>
              <td>{{ address.phone }}</td>
            </tr>
            <tr v-if="email">
              <th>Email:</th>
              <td>{{ email }}</td>
            </tr>
          </tbody>
        </table>
      </address>
      <div v-if="isEditable" class="shipping-address-link">
        <NuxtLink class="btn btn-link btn-underline btn-icon-right text-primary" @click="editAddress(address)">
          Edit your billing address
          <i class="w-icon-long-arrow-right" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.info-address {

  & .billing-address-wrapper {
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
  }

  & address {
    font-style: normal;

    & .address-table {
      display: table;
      border-collapse: separate;
      box-sizing: border-box;
      text-indent: initial;
      border-spacing: 2px;
      border-color: gray;

      & th,
      & td {
        padding: 0.3rem 0;
      }

      & th {
        font-weight: normal;
        text-align: start;
        width: 100px;
        color: #999;
      }

      & td {
        color: #333;
      }

    }
  }
}
</style>
