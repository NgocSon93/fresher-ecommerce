<script setup lang="ts">
import type { Page } from '~/types/pages'

useSeoMeta({
  title: 'About Us',
})

const commonStore = useCommonStore()

const page = ref<Page | null>(null)

async function updatePage() {
  commonStore.setIsLoading(true)
  const { data } = await useCustomFetch(`/pages/about`, {
    transform: (response: { data: Page }): Page => {
      if (!response.data) {
        throw createError({
          statusCode: 404,
          message: 'Page not found',
        })
      }
      return response.data
    },
  })
  if (data.value)
    page.value = data.value
  else
    page.value = null
  commonStore.setIsLoading(false)
}
await updatePage()
</script>

<template>
  <!-- Start of Main -->
  <main class="main">
    <BasePageHeader text="About Us" />
    <BasePageBreadcrumb
      :items="[
        { name: 'Home', route: '/' },
        { name: 'About Us' },
      ]"
      :is-border-bottom="true"
    />

    <!-- Start of Page Content -->
    <div class="page content mb-10 mt-4 py-4">
      <div v-if="page?.content" v-html="page?.content" />
    </div>
    <!-- End of Page Content -->
  </main>
  <!-- End of Main -->
</template>
