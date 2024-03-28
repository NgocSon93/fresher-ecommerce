<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'home',
  },
})

definePageMeta({
  layout: false,
})

const categoryStore = useCategoryStore()
const categories = categoryStore.hierarchicalCategories

await useProductStore().fetchNewProducts()
</script>

<template>
  <NuxtLayout name="home">
    <!-- Start Banner -->
    <HomePageBanner />
    <!-- End Banner -->

    <!-- Start Icon Box -->
    <div class="container">
      <Policy direction="horizontal" />
    </div>
    <!-- End Icon Box  -->

    <!-- Start Top Categories -->
    <HomePageTopCategories />
    <!-- End Top Categories -->

    <!--    Start New Product -->
    <HomePageNewProducts />
    <!--    End New Product -->

    <!-- Start Category Products -->
    <template v-if="categories.length > 0">
      <div class="container">
        <template v-for="category in categories" :key="category.id">
          <template v-if="category.totalProducts > 0">
            <HomePageCategoryProducts :category="category" />
          </template>
        </template>
      </div>
    </template>
    <!-- End Category Products -->

    <!-- Start Brands -->
    <HomePageBrands class="mb-5" />
    <!-- End Brands -->

    <!-- Start Our Blog -->
    <HomePageFormOurBlogMain />
    <!-- End Our Blog -->
  </NuxtLayout>
</template>
