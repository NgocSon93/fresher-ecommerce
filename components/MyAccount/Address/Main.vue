<script setup>
const props = defineProps(['profile'])
const emits = defineEmits(['onUpdateAddress'])

const commonStore = useCommonStore()

const showAdd = ref(false)
const showEdit = ref(false)
const confirmDelete = ref(false)
const idDelete = ref()
let propsData = reactive({
  id: -1,
  user_id: -1,
  receiver: '',
  phone: '',
  address: '',
})

async function deleteAddress() {
  commonStore.setIsLoading(true)
  const { data, error } = await useCustomFetch(`addresses/${idDelete.value}`, {
    method: 'DELETE',
    body: { id: idDelete.value },
  })
  if (data.value) {
    emits('onUpdateAddress')
    showEdit.value = false
    showAdd.value = false
  }
  else { console.error('An error occurred', error) }
  confirmModel()
  commonStore.setIsLoading(false)
}

function showAddAddress() {
  showAdd.value = !showAdd.value
  showEdit.value = false
}

function showEditAddress() {
  showEdit.value = !showEdit.value
  showAdd.value = false
}

function editAddress(listAddresses) {
  propsData = listAddresses
  showEdit.value = !showEdit.value
  showAdd.value = false
}

function confirmModel(id) {
  idDelete.value = id
  confirmDelete.value = !confirmDelete.value
}
</script>

<template>
  <div id="addresses" class="tab-pane active">
    <div class="flex items-center justify-between pb-2">
      <div class="icon-box icon-box-side icon-box-light">
        <span class="icon-box-icon icon-map-marker">
          <i class="w-icon-map-marker" />
        </span>
        <div class="icon-box-content">
          <h4 class="icon-box-title mb-0 ls-normal">
            Addresses
          </h4>
        </div>
      </div>
      <button
        type="button"
        class="button-add rounded-md text-sm font-semibold text-white shadow-sm flex items-center"
        @click="showAddAddress"
      >
        <Icon name="gg:add" class="mr-1 add-icon" />
        Add Address
      </button>
    </div>
    <div class="addresses-description pb-2">
      <p>
        The following addresses will be used on the checkout page
        by default.
      </p>
    </div>
    <div class="row">
      <template v-if="props.profile?.address.length">
        <div v-for="item in props.profile.address" :key="item.id" class="col-sm-6">
          <MyAccountAddressInformation
            :address="item" :is-editable="true"
            @show-edit-address="editAddress"
            @id-delete="confirmModel"
          />
        </div>
      </template>
      <BaseConfirm :is-confirm="confirmDelete" @click="confirmModel">
        <template #content>
          <div class="text-center icon-box icon-box-side icon-box-light">
            <div class="icon-box-content">
              <h4 class="mb-0 ls-normal">
                Delete Address
              </h4>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Are you sure you want to delete your address? All your data will be permanently
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
            @click="deleteAddress()"
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
  <div v-if="showAdd" class="space-y-6">
    <div class="border-t border-gray-900/10">
      <div class="flex items-center justify-between">
        <div class="flex items-center ">
          <Icon name="gg:add" class="mr-2 address-icon" />
          <h2 class="title ls-25 font-weight-bold">
            Add Address
          </h2>
        </div>
        <button
          type="button"
          class="button-delete rounded-md px-4 py-2 my-3 text-sm font-semibold text-white shadow-sm flex items-center"
          @click="showAddAddress"
        >
          <Icon name="zondicons:close-outline" class="mr-1 add-icon" />
          Close
        </button>
      </div>

      <div class="title ls-25 font-weight-bold">
        <h4>Billing Address</h4>
      </div>
    </div>

    <MyAccountAddressForm
      @on-close="showAddAddress"
      @on-update-data="emits('onUpdateAddress')"
    />
  </div>
  <div v-if="showEdit" class="space-y-6">
    <div class="border-t border-gray-900/10">
      <div class="flex items-center justify-between">
        <div class="flex items-center ">
          <Icon name="bxs:edit" class="mr-2 address-icon" />
          <h2 class="title ls-25 font-weight-bold">
            Edit Address
          </h2>
        </div>
        <button
          type="button"
          class="button-delete rounded-md px-4 py-2 my-3 text-sm font-semibold text-white shadow-sm flex items-center"
          @click="showEditAddress"
        >
          <Icon name="zondicons:close-outline" class="mr-1 add-icon" />
          Close
        </button>
      </div>

      <div class="title ls-25 font-weight-bold">
        <h4>Billing Address</h4>
      </div>
    </div>

    <MyAccountAddressForm
      :address-data="propsData"
      :is-update="true"
      @on-close="showEditAddress"
      @on-update-data="emits('onUpdateAddress')"
    />
  </div>
</template>

<style scoped lang="scss">
#account-addresses.tab-pane {
    padding-top: 0.8rem;
}
.tab-pane {
    font-size: 1.3rem;
    line-height: 1.7;
    padding: 1.3rem 0;
    color: #666;
}

.icon-box .icon-box-title {
    font-size: 1.4rem;
    text-transform: capitalize;
    letter-spacing: -0.025em;
    margin-bottom: 0.4rem;
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
.icon-box-side .icon-box-content {
    text-align: start;
}
.icon-box-light {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
}
.icon-box-light .icon-box-title {
    font-size: 2rem;
}

#account-addresses.tab-pane p {
    line-height: 1.6;
}

.tab-pane p {
  margin-bottom: 0;
  font-size: inherit;
  letter-spacing: 0;
  line-height: 2;
}
.tab-pane p {
    font-size: 1.4rem;
    line-height: 1.8;
}
p {
    font-size: 1.4rem;
    line-height: 1.86;
}
.row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -10px;
}

#account-addresses .title {
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
    letter-spacing: -0.025em !important;
    margin: 0;
}
.font-weight-bold {
    font-weight: 600 !important;
}
#account-addresses address {
    font-style: normal;
}

.addresses-description {
  margin: 0 0 1.5rem 0;
}

.button-add {
  font-size: 1.4rem;
  line-height: 1;
  padding: 0.7em 1.4em;
  background-color: #333;
  color: #fff;
  border: 1px solid #333;

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

.button-delete {
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

.address-icon {
  font-size: 3rem;
  color: #999;
}
</style>
