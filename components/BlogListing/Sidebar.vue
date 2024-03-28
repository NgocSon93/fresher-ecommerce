<script setup>
const emits = defineEmits(['dataChangePageBySidebar', 'dataChangePageByKeywords'])
const router = useRouter()
const commonStore = useCommonStore()
const blogsStore = useBlogsStore()

const dataChangePageBySidebar = ref('')
const keyWords = ref('')
const sidebarCategories = ref([])

;(async function sidebar() {
  commonStore.setIsLoading(true)
  const { data } = await useCustomFetch(`/articles`)
  if (data.value)
    sidebarCategories.value = data.value.data ?? []
  commonStore.setIsLoading(false)
})()

async function filterSidebar(slug) {
  commonStore.setIsLoading(true)
  const { data } = await useCustomFetch(`/articles/${slug}/posts`)
  if (data.value) {
    blogsStore.setPosts(data.value.data ?? [])
    blogsStore.setTotalPosts(data.value.meta?.total ?? 0)
    blogsStore.setCurrentPage(data.value.meta?.current_page ?? 1)
    blogsStore.setPageSize(data.value.meta?.per_page ?? 10)
    router.push(`/blogs`)
    dataChangePageBySidebar.value = slug
    emits('dataChangePageBySidebar', dataChangePageBySidebar.value)
    keyWords.value = ''
  }
  commonStore.setIsLoading(false)
}

async function searchByKeyword() {
  commonStore.setIsLoading(true)
  if (keyWords.value) {
    const { data } = await useCustomFetch(`/posts/search/${keyWords.value}`)
    if (data.value) {
      blogsStore.setPosts(data.value.data ?? [])
      blogsStore.setTotalPosts(data.value.data.length ?? 0)
      blogsStore.setCurrentPage(1)
      blogsStore.setPageSize(10)
      router.push(`/blogs`)
      emits('dataChangePageByKeywords', keyWords.value)
    }
  }
  commonStore.setIsLoading(false)
}
</script>

<template>
  <div class="sidebar-blog">
    <div class="sidebar right-sidebar blog-sidebar sidebar-fixed sticky-sidebar-wrapper">
      <div class="sidebar-content">
        <div class="sticky-sidebar">
          <div class="widget widget-search-form">
            <div class="widget-body">
              <form action="#" class="input-wrapper input-wrapper-inline">
                <input v-model="keyWords" type="text" class="form-control" placeholder="Search in Blog" autocomplete="off" required>
                <button type="submit" class="btn btn-search" @click.prevent="searchByKeyword">
                  <i class="w-icon-search" />
                </button>
              </form>
            </div>
          </div>
          <!-- End of Widget search form -->
          <div class="widget widget-categories">
            <h3 class="widget-title bb-no mb-0">
              Categories
            </h3>
            <ul class="widget-body filter-items search-ul">
              <li v-for="listCategories in sidebarCategories" :key="listCategories.id" class="capitalize">
                <NuxtLink @click="filterSidebar(listCategories.slug)">
                  {{ listCategories.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <!-- End of Widget categories -->
          <BlogListingPopularPost />

          <div class="widget widget-custom-block">
            <h3 class="widget-title bb-no">
              Custom Block
            </h3>
            <div class="widget-body">
              <p class="text-default mb-0">
                There is something quite magical about fragrance and scent, and perfume is about so much more than
                smelling good. Our choice of fragrance shares a little bit of our inner self with the world, from light,
                floral and joyful, to intense, rich and seductive, our perfume contributes to leaving a first impression
                on people never met before, and that’s quite amazing. To think that something so simple as a scent, can
                share such intimate details about a person’s inner thoughts without uttering a single word.
              </p>
            </div>
          </div>
          <!-- End of Widget custom block -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.widget-body li a {
  cursor: pointer;
}
</style>
