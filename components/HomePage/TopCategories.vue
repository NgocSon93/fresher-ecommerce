<script setup>
import { useCategoryStore } from '~/stores/categories'
import { getSlugWithId } from '~/utils/slug'

const categories = useCategoryStore().topLevelCategories.map(item => ({
  id: item.id,
  name: item.name,
  slug: item.slug,
  image: (item.images.find(image => image?.main) || item.images[0])?.path,
}))
</script>

<template>
  <section class="category-section top-category bg-grey pt-10 pb-10">
    <div class="container pb-2">
      <h2 class="title justify-content-center pt-1 ls-normal mb-5">
        Top Categories Of The Month
      </h2>

      <Swiper
        wrapper-class="pg-show"
        space-between="20"
        :breakpoints="{
          576: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 5,
          },
        }"
        slides-per-view="2"
      >
        <SwiperSlide
          v-for="category in categories" :key="category.id"
          class="category category-classic category-absolute overlay-zoom br-xs"
        >
          <div class="overlay absolute top-0 left-0 w-full h-full bg-neutral-500 opacity-30 z-10" />
          <NuxtLink
            :to="`/categories/${getSlugWithId(category.id, category.slug)}`"
            class="category-media"
          >
            <BaseCustomNuxtImage
              :src="category.image"
              :alt="category.name"
              :height="200"
            />
          </NuxtLink>
          <div class="category-content z-20">
            <h4 class="category-name text-white">
              {{ category.name }}
            </h4>
            <NuxtLink
              :to="`/categories/${getSlugWithId(category.id, category.slug)}`"
              class="btn btn-primary btn-link btn-underline"
            >
              Shop Now
            </NuxtLink>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>
