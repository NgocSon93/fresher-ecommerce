<script setup lang="ts">
import { toast } from 'vue3-toastify'
import { useAuthStore } from '~/stores/auth.store'
import { useCategoryStore } from '~/stores/categories'
import { useCartStore } from '~/stores/cart.store'
import { useProfileStore } from '~/stores/profile.store'
import { useWishlistStore } from '~/stores/wishlist.store'

useSeoMeta({
  title: 'Perfume Shop',
})

const commonStore = useCommonStore()
const authStore = useAuthStore()
const categoryStore = useCategoryStore()
const cartStore = useCartStore()
const profileStore = useProfileStore()
const wishlistStore = useWishlistStore()

// Fetch categories when mounted
categoryStore.fetchData()

watchEffect(() => {
  if (authStore.isAuthenticated) {
    commonStore.setIsLoading(true)
    profileStore.fetchUserProfile()
    wishlistStore.fetchWishlistProducts()
    cartStore.fetchAllCarts()
    commonStore.setIsLoading(false)
  }
  else {
    profileStore.setProfile(null)
    wishlistStore.setWishlistProducts([])
  }
})

// handle loading state when page is changed
const nuxtApp = useNuxtApp()
nuxtApp.hook('page:start', () => {
  commonStore.setIsLoading(true)
})
nuxtApp.hook('page:finish', () => {
  commonStore.setIsLoading(false)
})

function onCloseModal() {
  authStore.setIsShowLoginPopup(false)
}
function onLoginSucess() {
  const route = useRoute()
  if (route.fullPath.includes('login') || route.fullPath.includes('register') || route.fullPath.includes('forgotpassword'))
    useRouter().push('/')
  authStore.setIsShowLoginPopup(false)
  toast.success(authStore.isLogin ? 'Login successfully' : 'Register successfully')
}
</script>

<template>
  <BaseLoadingPage :is-loading="commonStore.isLoading" />
  <BaseScrollToTop />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <BaseModal v-model:is-show="authStore.isShowLoginPopup">
    <template #content>
      <div class="px-20 py-12 min-w-[500px]">
        <AuthFormLogin
          v-model:is-login="authStore.isLogin"
          @on-close="onCloseModal"
          @on-login-sucess="onLoginSucess"
        />
      </div>
    </template>
  </BaseModal>
</template>
