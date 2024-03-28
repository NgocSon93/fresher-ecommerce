<script setup lang="ts">
import { toast } from 'vue3-toastify'
import type { Product } from '~/types/products'

interface ProductCardProps { product: Product }
const props = defineProps<ProductCardProps>()

const authStore = useAuthStore()
const wishlistStore = useWishlistStore()

const isLoadingAddToWishlist = ref(false)
const isInWishlist = ref(false)

watchEffect(() => {
  checkInWishlist()
})

// Function check if product in wishlist return true
function checkInWishlist() {
  if (wishlistStore.wishlistProducts.find(value => value.id === props.product.id))
    isInWishlist.value = true
  else
    isInWishlist.value = false
}

async function onToggleAddToWishlist() {
  if (!authStore.isAuthenticated) {
    authStore.setIsLogin(true)
    authStore.setIsShowLoginPopup(true)
    return
  }

  isLoadingAddToWishlist.value = true
  if (isInWishlist.value) {
    const isSuccess = await wishlistStore.fetchDeleteWishlist(props.product.id)
    if (isSuccess) {
      toast.success('Delete from wishlist successfully')
      wishlistStore.setWishlistProducts(wishlistStore.wishlistProducts.filter((value) => {
        return value.id !== props.product.id
      }))
      isInWishlist.value = false
    }
    else {
      toast.error('Delete from wishlist failed')
    }
  }
  else {
    const isSuccess = await wishlistStore.fetchAddToWishlist(props.product.id)
    if (isSuccess) {
      toast.success('Add to wishlist successfully')
      await wishlistStore.fetchWishlistProducts()
      isInWishlist.value = true
    }
    else {
      toast.error('Add to wishlist failed')
    }
  }
  isLoadingAddToWishlist.value = false
}
</script>

<template>
  <!-- Start of Wishlist button -->
  <div class="btn-wrapper">
    <button
      class="btn-product-icon btn-wishlist !ml-0" :class="isInWishlist ? `w-icon-heart-full` : 'w-icon-heart'"
      title="Wishlist" @click="onToggleAddToWishlist"
    />
    <BaseLoading :is-loading="isLoadingAddToWishlist" :width="20" :height="20" :border="2" />
  </div>
  <!-- End of Wishlist button -->
</template>
