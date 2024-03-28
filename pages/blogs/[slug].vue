<script setup>
useSeoMeta({
  title: 'Blog Single',
})

const route = useRoute()
const blogsStore = useBlogsStore()
const commonStore = useCommonStore()

const blog = ref(route.params?.slug || '')
const blogName = computed(() => blog.value.replaceAll('-', ' '))
const detail = computed(() => blogsStore.postDetail)

async function updateDetailPost() {
  commonStore.setIsLoading(true)
  const { data } = await useCustomFetch(`/posts/${blog.value}`)
  if (data.value)
    blogsStore.setPostDetail(data.value.data)
  commonStore.setIsLoading(true)
}
await updateDetailPost()
</script>

<template>
  <!-- Start of Main -->
  <main class="main">
    <BasePageHeader text="Blog Single" />
    <BasePageBreadcrumb
      :items="[
        { name: 'Home', route: '/' },
        { name: 'Blogs', route: '/blogs' },
        { name: `${blogName}` },
      ]"
      :is-border-bottom="true"
    />

    <!-- Start of Page Content -->
    <div class="page-content mb-10 pb-2 mt-8">
      <div class="container">
        <div class="rows gutter-lg">
          <div class="main-content">
            <BlogSingleContent v-if="detail" :detailpost="detail" />
          </div>
          <div class="sidebar">
            <BlogListingSidebar />
          </div>
        </div>
      </div>
    </div>
    <!-- End of Page Content -->
  </main>
  <!-- End of Main -->
</template>

<style scoped lang="scss">
a {
  color: inherit;
}

.container {
  max-width: 1280px;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: auto;
  margin-right: auto;
}

.rows .main-content {
  max-width: calc(100% - 31rem);
}

.gutter-lg {
  margin-left: -15px;
  margin-right: -15px;
}

.rows {
  display: flex;
}

.main-content {
  min-width: 992px;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.widget .widget-title {
  cursor: default;
}
</style>
