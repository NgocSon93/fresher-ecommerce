<script setup>
const commonStore = useCommonStore()

const banners = computed(() => commonStore.banners ?? [])

;(async function getBanners() {
  if (!commonStore.banners.length)
    await commonStore.fetchAllBanners()
})()

const swiperConfig = {
  modules: [SwiperAutoplay, SwiperEffectCreative, SwiperNavigation],
  slidesPerView: 1,
  autoplay: {
    delay: 8000,
    disableOnInteraction: false,
  },
  navigation: {
    enable: true,
  },
}
</script>

<template>
  <div class="t-banner">
    <Swiper
      class="nav-inner pg-inner"
      v-bind="swiperConfig"
      :style="{
        '--swiper-navigation-size': '32px',
      }"
      :space-between="20"
    >
      <SwiperSlide
        v-for="banner in banners" :key="banner.id"
        class="banner banner-fixed intro-slide intro-slide1"
      >
        <div class="relative">
          <figure class="h-[520px]">
            <NuxtImg
              v-if="banner.image"
              :src="banner.image"
              :alt="banner.name"
              class="h-full"
            />
          </figure>
          <div class="absolute top-1/2 -translate-y-1/2 right-1/4 z-20">
            <NuxtLink
              to="categories"
              class="btn btn-primary btn-rounded btn-icon-right"
            >
              SHOP NOW<i class="w-icon-long-arrow-right" />
            </NuxtLink>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>
