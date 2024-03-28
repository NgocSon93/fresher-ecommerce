<script lang="ts" setup>
const authStore = useAuthStore()
const commonStore = useCommonStore()
const profileStore = useProfileStore()

const email = computed(() => profileStore.profile?.email ?? (profileStore.email || 'My account'))

const headerLinks = computed(() => [
  { label: `${email.value}`, url: '/profile' },
])

async function onToggleLogout() {
  commonStore.setIsLoading(true)
  await authStore.fetchLogout()
  commonStore.setIsLoading(false)
}
function onToggleSignin() {
  authStore.setIsLogin(true)
  authStore.setIsShowLoginPopup(true)
}
function onToggleRegister() {
  authStore.setIsLogin(false)
  authStore.setIsShowLoginPopup(true)
}
</script>

<template>
  <div class="header-top">
    <div class="container">
      <div class="header-left">
        <p class="welcome-msg">
          Welcome to Wolmart Store message or remove it!
        </p>
      </div>
      <div class="header-right">
        <template v-if="authStore.isAuthenticated">
          <NuxtLink v-for="link in headerLinks" :key="link.label" :to="link.url" class="d-lg-show !normal-case">
            {{ link.label }}
          </NuxtLink>
          <button class="flex d-lg-show login sign-out hover:text-primary" @click="onToggleLogout">
            <Icon name="mdi:account-outline" size="19px" />
            Logout
          </button>
        </template>
        <template v-else>
          <button class="flex d-lg-show login sign-in hover:text-primary" @click="onToggleSignin">
            <i class="w-icon-account" />
            Sign In
          </button>
          <span class="delimiter d-lg-show ">/</span>
          <button class="ml-0 d-lg-show login register hover:text-primary" @click="onToggleRegister">
            Register
          </button>
        </template>
      </div>
    </div>
  </div>
</template>
