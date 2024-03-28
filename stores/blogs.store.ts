import { defineStore } from 'pinia'

interface Post { id: number }
interface PostDetail { id: number }
type Posts = Post[]

export const useBlogsStore = defineStore('blogs', () => {
  const posts: Ref<Posts> = ref([])
  const totalPosts: Ref<number> = ref(1)
  const currentPage: Ref<number> = ref(0)
  const pageSize: Ref<number> = ref(10)
  const postDetail: Ref<PostDetail | null> = ref(null)

  function setPosts(newPosts: Posts) {
    posts.value = newPosts
  }
  function setTotalPosts(total: number) {
    totalPosts.value = total
  }
  function setCurrentPage(page: number) {
    currentPage.value = page
  }
  function setPageSize(size: number) {
    pageSize.value = size
  }
  function setPostDetail(post: PostDetail) {
    postDetail.value = post
  }

  return {
    posts,
    totalPosts,
    currentPage,
    pageSize,
    postDetail,
    setPosts,
    setTotalPosts,
    setCurrentPage,
    setPageSize,
    setPostDetail,
  }
})
