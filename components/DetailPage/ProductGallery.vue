<script setup lang="ts">
import 'lightgallery/css/lightgallery.css'
import lightGallery from 'lightgallery'
import type { LightGallery } from 'lightgallery/lightgallery'
import type { Product } from '@/types/products'

const props = defineProps<{
  product: Product
}>()

const thumbsSwiper = ref(null)

function setThumbsSwiper(swiper: any) {
  thumbsSwiper.value = swiper
}

const galleryInstance = ref<LightGallery | null>(null)

onMounted(() => {
  const lightgalleryElement = document.getElementById('lightgallery')

  if (lightgalleryElement instanceof HTMLElement) {
    galleryInstance.value = lightGallery(lightgalleryElement, {
      dynamic: true,
      dynamicEl: props.product.images.map(image => ({ src: image.path })),
      addClass: 'z-[9999] fixed',
    })
  }
})
</script>

<template>
  <div id="lightgallery" />
  <div class="t-product-gallery product-gallery product-gallery-sticky">
    <div id="lightgallery" />
    <Swiper
      class="t-product-gallery-view swiper-container product-single-swiper swiper-theme nav-inner"
      wrapper-class="swiper-wrapper row cols-1 gutter-no"
      :modules="[SwiperNavigation, SwiperThumbs]"
      :navigation="true"
      :thumbs="{ swiper: thumbsSwiper }"
      :space-between="20"
    >
      <SwiperSlide
        v-for="(image, index) in product.images" v-show="index < 3" :key="index"
        :aria-label="`${index + 1} / ${product.images.length}`"
        class="border border-[#eee]"
      >
        <figure class="product-image">
          <BaseCustomNuxtImage
            :src="image.path"
            :alt="product.name"
            :height="480"
            :width="1200"
          />
        </figure>
      </SwiperSlide>
      <NuxtLink
        class="product-gallery-btn product-image-full"
        @click="galleryInstance && galleryInstance.openGallery()"
      >
        <i class="w-icon-zoom" />
      </NuxtLink>
    </Swiper>

    <Swiper
      class="t-product-gallery-control product-thumbs-wrap"
      wrapper-class="product-thumbs swiper-wrapper row cols-4 gutter-sm px-2"
      :modules="[SwiperThumbs, SwiperNavigation]"
      :slides-per-view="4"
      :space-between="20"
      :navigation="true"
      @swiper="setThumbsSwiper"
    >
      <SwiperSlide
        v-for="(image, index) in product.images" v-show="index < 3" :key="index"
        :aria-label="`${index + 1} / ${product.images.length}`"
        class="product-thumb border border-[#eee] box-border"
      >
        <BaseCustomNuxtImage
          :src="image.path"
          :alt="product.name"
          :height="116"
          :width="103"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style lang="postcss">
.t-product-gallery {
  &-view {
    .swiper-button-prev,
    .swiper-button-next {
      &::after {
        @apply content-none;
      }
    }

    .product-thumb::before {
      @apply border-[#eee];
    }

    .swiper-slide-thumb-active::before {
      border-color: #336699;
    }
  }
}
</style>
