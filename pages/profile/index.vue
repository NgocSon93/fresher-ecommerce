<script setup>
definePageMeta({
  middleware: ['auth'],
})

useSeoMeta({
  title: 'My Account',
})

const authStore = useAuthStore()
const commonStore = useCommonStore()

const isActive = ref({
  name: 'dashboard',
})

const profile = ref()

async function getProfile() {
  commonStore.setIsLoading(true)
  const { data } = await useCustomFetch(`users/profile`)
  if (data.value)
    profile.value = data.value
  commonStore.setIsLoading(false)
}

getProfile()

function onToggleDashboard() {
  isActive.value.name = 'dashboard'
}

function onToggleOrders() {
  isActive.value.name = 'orders'
}

function onTogglePaymentMethods() {
  isActive.value.name = 'paymentMethods'
}

function onToggleAddress() {
  isActive.value.name = 'address'
  getProfile()
}

function onToggleAccount() {
  isActive.value.name = 'account'
  getProfile()
}
function updateActive(newActive) {
  isActive.value = newActive
}
function updateProfile() {
  getProfile()
}

async function logOut() {
  commonStore.setIsLoading(true)
  await authStore.fetchLogout()
  commonStore.setIsLoading(false)
}
</script>

<template>
  <!-- Start of Main -->
  <main class="main my-account">
    <BasePageHeader text="My Account" />
    <BasePageBreadcrumb
      :items="[
        { name: 'Home', route: '/' },
        { name: 'My account' },
      ]"
      :is-border-bottom="true"
    />

    <!-- Start of My Account -->
    <div class="page-content pt-2">
      <div class="container">
        <div class="tab tab-vertical row gutter-lg">
          <ul class="nav nav-tabs mb-6" role="tablist">
            <li class="nav-item" :class="{ isactive: isActive.name === 'dashboard' }">
              <NuxtLink to="#dashboard" class="nav-link" @click="onToggleDashboard">
                Dashboard
              </NuxtLink>
            </li>
            <li class="nav-item" :class="{ isactive: isActive.name === 'orders' }">
              <NuxtLink to="#orders" class="nav-link" @click="onToggleOrders">
                Orders
              </NuxtLink>
            </li>
            <li class="nav-item" :class="{ isactive: isActive.name === 'paymentMethods' }">
              <NuxtLink to="#paymentMethods" class="nav-link" @click="onTogglePaymentMethods">
                Payment Method
              </NuxtLink>
            </li>
            <li class="nav-item" :class="{ isactive: isActive.name === 'address' }">
              <NuxtLink to="#addresses" class="nav-link" @click="onToggleAddress">
                Addresses
              </NuxtLink>
            </li>
            <li class="nav-item" :class="{ isactive: isActive.name === 'account' }">
              <NuxtLink to="#account-details" class="nav-link" @click="onToggleAccount">
                Account details
              </NuxtLink>
            </li>
            <li class="link-item">
              <NuxtLink to="/wishlist">
                Wishlist
              </NuxtLink>
            </li>
            <li class="link-item" @click="logOut">
              <NuxtLink to="">
                Logout
              </NuxtLink>
            </li>
          </ul>
          <div class="tab-content mb-6">
            <MyAccountDashBoard
              v-if="isActive.name === 'dashboard'"
              id="dashboard"
              :profile="profile"
              @update-active="updateActive"
              @logout="logOut"
            />
            <MyAccountOrdersMain
              v-else-if="isActive.name === 'orders'"
              id="orders"
            />
            <MyAccountPaymentMethodsMain
              v-else-if="isActive.name === 'paymentMethods'"
              id="paymentMethods"
            />
            <MyAccountAddressMain
              v-else-if="isActive.name === 'address'"
              id="addresses"
              :profile="profile"
              @on-update-address="onToggleAddress"
            />
            <MyAccountAccountDetailsMain
              v-else-if="isActive.name === 'account'"
              id="account-details"
              :profile="profile"
              @update-edit="updateActive"
            />
            <MyAccountAccountDetailsEdit
              v-else-if="isActive.name === 'editprofile'"
              id="update-account"
              v-model:profile="profile"
              @update-profile="updateProfile"
              @cancel-update="onToggleAccount"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- End of My Account -->
  </main>
  <!-- End of Main -->
</template>

<style scoped lang="scss">
a {
  color: inherit;
}

.my-account .tab-vertical .nav {
  width: 24.41%;
  border: none;
}

.nav-tabs {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  border-bottom: 1px solid #eee;
  color: #333;
}

.my-account .nav-link,
.my-account .link-item {
  margin-bottom: 0;
  padding: 1.7rem 0 1.6rem;
  font-size: 1.6rem;
  text-transform: none;
  border-bottom: 1px solid #eee;
}

.my-account .link-item {
  margin-bottom: 0;
  padding: 1.7rem 0 1.6rem;
  font-size: 1.6rem;
  text-transform: none;
  border-bottom: 1px solid #eee;
  font-weight: 600;
  color: #333;
  line-height: 1;
}

.my-account .link-item:hover {
  color: #336699;
  cursor: pointer;
}

.isactive {
  color: #336699;
}

.tab-content {
  border: none;
}
</style>
