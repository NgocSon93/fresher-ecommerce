<script setup lang="ts">
import type { Page } from '~/types/pages'

const route = useRoute()
const commonStore = useCommonStore()

const slug = ref<string>(route.params?.slug as string || '')
const pageName = computed(() => slug.value.replaceAll('-', ' '))
const page = ref<Page | null>(null)

async function updateDetailPage() {
  commonStore.setIsLoading(true)
  const { data } = await useCustomFetch(`/pages/${slug.value}`, {
    transform: (response: { data: Page }): Page => {
      return response.data
    },
  })
  if (data.value) {
    page.value = data.value
  }
  else {
    throw createError({
      statusCode: 404,
      message: 'Page not found',
    })
  }
  commonStore.setIsLoading(false)
}
await updateDetailPage()

useSeoMeta({
  title: `${page.value?.name ?? pageName.value ?? 'Perfume Shop'}`,
})
</script>

<template>
  <!-- Start of Main -->
  <main class="main">
    <BasePageHeader :text="pageName" />
    <BasePageBreadcrumb
      :items="[
        { name: 'Home', route: '/' },
        { name: `${pageName}`, route: '' },
      ]"
      :is-border-bottom="true"
    />

    <!-- Start of Page Content -->
    <div class="page-content mb-10 mt-4 py-4">
      <div class="container">
        <div v-html="page?.content" />
      </div>
    </div>
    <!-- End of Page Content -->
  </main>
  <!-- End of Main -->
</template>
