<script setup>
useSeoMeta({
  title: 'Perfume Blogs',
})

const commonStore = useCommonStore()
const blogsStore = useBlogsStore()

const currentPage = computed(() => blogsStore.currentPage)
const pageSize = computed(() => blogsStore.pageSize)
const totalPosts = computed(() => blogsStore.totalPosts)
const listPosts = computed(() => blogsStore.posts)

const checkChangePageBySidebar = ref(false)
const checkChangePageByKeywords = ref(false)
const dataChangePagebyKeywords = ref('')
const dataChangePageBySidebar = ref('')

async function updateDataBlog() {
  commonStore.setIsLoading(true)
  if (!blogsStore.posts.length) {
    const { data } = await useCustomFetch(`/posts`)
    if (data.value) {
      blogsStore.setPosts(data.value.data ?? [])
      blogsStore.setTotalPosts(data.value.meta?.total ?? 0)
      blogsStore.setCurrentPage(data.value.meta?.current_page ?? 1)
      blogsStore.setPageSize(data.value.meta?.per_page ?? 10)
      checkChangePageBySidebar.value = false
      checkChangePageByKeywords.value = false
    }
  }
  commonStore.setIsLoading(false)
}
await updateDataBlog()

async function handleData(page) {
  commonStore.setIsLoading(true)

  if (!checkChangePageBySidebar.value && !checkChangePageByKeywords.value) {
    const { data } = await useCustomFetch(`/posts?page=${page}`)
    if (data.value)
      blogsStore.setPosts(data.value.data ?? [])
  }
  else if (checkChangePageBySidebar.value && !checkChangePageByKeywords.value) {
    const { data } = await useCustomFetch(`articles/${dataChangePageBySidebar.value}/posts?page=${page}`)
    if (data.value)
      blogsStore.setPosts(data.value.data ?? [])
  }
  else {
    const { data } = await useCustomFetch(`/posts/search/${dataChangePagebyKeywords.value}/?page=${page}`)
    if (data.value)
      blogsStore.setPosts(data.value.data ?? [])
  }

  commonStore.setIsLoading(false)
}

async function onPageChange(page) {
  blogsStore.setCurrentPage(page)
  await handleData(page)
  commonStore.scrollToNav()
}

function changePagebySidebar(checkFilter) {
  checkChangePageBySidebar.value = true
  checkChangePageByKeywords.value = false
  dataChangePageBySidebar.value = checkFilter
}

function changePagebyKeywords(keyWords) {
  checkChangePageByKeywords.value = true
  checkChangePageBySidebar.value = false
  dataChangePagebyKeywords.value = keyWords
}
</script>

<template>
  <!-- Start of Main -->
  <main class="main">
    <BasePageHeader text="List" />
    <BasePageBreadcrumb
      :items="[
        { name: 'Home', route: '/' },
        { name: 'Blogs' },
      ]"
      :is-border-bottom="true"
    />

    <!-- Start of Page Content -->
    <div class="page-content mb-10 pb-2 mt-8">
      <div class="container">
        <div class="rows gutter-lg">
          <div v-if="listPosts.length" class="main-content">
            <BlogListingPostList :post="listPosts" />
            <BasePaginations
              :total="totalPosts" :page-size="pageSize" :current-page="currentPage"
              @on-page-change="onPageChange"
            />
          </div>
          <div v-else class="main-content">
            There are'n any post yet
          </div>
          <div class="sidebar">
            <BlogListingSidebar
              @data-change-page-by-sidebar="changePagebySidebar"
              @data-change-page-by-keywords="changePagebyKeywords"
            />
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
