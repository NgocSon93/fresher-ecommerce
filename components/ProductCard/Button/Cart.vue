<script setup lang="ts">
// import { toast } from 'vue3-toastify'
import type { Product } from '~/types/products'

interface ProductCardProps { product: Product; isIcon?: boolean }
const props = defineProps<ProductCardProps>()

// const authStore = useAuthStore()
// const cartStore = useCartStore()

const isLoadingAddToCart = ref(false)

async function onToggleAddToCart() {
  const router = useRouter()
  router.push(`/products/${props.product.slug}/${props.product.id}`)
  // if (!authStore.isAuthenticated) {
  //   authStore.setIsLogin(true)
  //   authStore.setIsShowLoginPopup(true)
  //   return
  // }

  // isLoadingAddToCart.value = true

  // const isSuccess = await cartStore.fetchAddToCart({
  //   productId: props.product.id,
  //   sizeId: props.product.quantities[0].sizeId,
  //   quantity: 1,
  // })

  // if (isSuccess)
  //   toast.success('Delete from wishlist successfully')
  // else
  //   toast.error('Delete from wishlist failed')

  // isLoadingAddToCart.value = false
}
</script>

<template>
  <!-- Start of Cart button -->
  <div v-if="isIcon" class="btn-wrapper">
    <button
      class="btn-product-icon btn-cart w-icon-cart"
      title="Add to cart"
      @click="onToggleAddToCart"
    />
    <BaseLoading :is-loading="isLoadingAddToCart" :width="20" :height="20" :border="2" />
  </div>
  <div v-else class="btn-wrapper">
    <button
      class="btn-product w-[17.6rem]"
      title="Add to Cart"
      @click="onToggleAddToCart"
    >
      <i class="w-icon-cart" />
      Select Options
    </button>
    <BaseLoading :is-loading="isLoadingAddToCart" :width="20" :height="20" :border="2" />
  </div>
  <!-- End of Cart button -->
</template>
