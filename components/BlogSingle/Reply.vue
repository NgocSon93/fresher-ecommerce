<script setup>
const authStore = useAuthStore()
const blogsStore = useBlogsStore()

const toggleReply = ref(false)
const commentTotal = computed(() => blogsStore.postDetail?.reviews.length)
const commentPerPage = ref(5)
const currentPage = ref(1)

const postId = computed(() => blogsStore.postDetail?.id ?? -1)
const reviews = computed(() => blogsStore.postDetail?.reviews ?? null)
const filterReviews = computed(() => reviews.value.slice(
  (currentPage.value - 1) * commentPerPage.value,
  currentPage.value * commentPerPage.value,
))

const showReply = ref()
const isLoadingNew = ref(false)
const isLoadingReply = ref(false)

const newComment = reactive({
  comment: '',
  replyTo: '',
})
const newReply = reactive({
  comment: '',
  replyTo: '',
})
const errorComment = reactive({
  post: {
    text: '',
    status: false,
  },
  reply: {
    text: '',
    status: false,
  },
})

function focusCommentPost() {
  errorComment.post.text = ''
}
function focusCommentReply() {
  errorComment.reply.text = ''
}

async function detailPost() {
  const { data } = await useCustomFetch(`/posts/${blogsStore.postDetail?.slug}`)
  if (data.value)
    blogsStore.setPostDetail(data.value.data)
}

function onToggleReply(comments) {
  showReply.value = comments.id
  toggleReply.value = true
}

function onToggleReplyTo() {
  toggleReply.value = !toggleReply.value
  newReply.comment = ''
  newComment.comment = ''
}

async function postComment() {
  if (!newComment.comment) {
    errorComment.post.text = 'Comments cannot be empty.'
    errorComment.post.status = true
    return
  }
  if (!authStore.isAuthenticated) {
    authStore.setIsLogin(true)
    authStore.setIsShowLoginPopup(true)
    return
  }
  if (postId.value < 0)
    return

  isLoadingNew.value = true
  const { data } = await useCustomFetch(`posts/comment`, {
    method: 'POST',
    body: {
      postId: postId.value,
      comment: newComment.comment,
      replyTo: '',
    },
  })
  if (data) {
    newComment.comment = ''
    await detailPost()
  }
  isLoadingNew.value = false
}

async function postReply(id) {
  if (!newReply.comment) {
    errorComment.reply.text = 'Comments cannot be empty.'
    errorComment.reply.status = true
    return
  }
  if (!authStore.isAuthenticated) {
    authStore.setIsLogin(true)
    authStore.setIsShowLoginPopup(true)
    return
  }
  if (postId.value < 0)
    return

  isLoadingReply.value = true
  const { data } = await useCustomFetch(`posts/comment`, {
    method: 'POST',
    body: {
      postId: postId.value,
      comment: newReply.comment,
      replyTo: id,
    },
  })
  if (data) {
    newReply.comment = ''
    newReply.replyTo = ''
    toggleReply.value = false
    await detailPost()
  }
  isLoadingReply.value = false
}
</script>

<template>
  <div v-if="reviews" class="comment-title">
    <h4 class="title title-lg font-weight-bold pt-10">
      {{ reviews.length }} Comments
    </h4>
    <ul v-if="reviews.length > 0" class="comments list-style-none pl-0">
      <li v-for="commentDetails in filterReviews" :key="commentDetails.id" class="comment">
        <div class="comment-body">
          <figure class="comment-avatar">
            <BaseAvatar :size="90" :name="commentDetails.user.name" :path="commentDetails.user.avatar" />
          </figure>
          <div class="comment-content">
            <h4 class="comment-author font-weight-bold">
              <NuxtLink to="">
                {{ commentDetails.user.name }}
              </NuxtLink>
              <span class="comment-date"> {{
                new Date(commentDetails.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })
              }}</span>
            </h4>
            <p>
              {{ commentDetails.comment }}
            </p>
            <button
              class="btn btn-dark btn-link btn-underline btn-icon-right btn-reply"
              @click="onToggleReply(commentDetails)"
            >
              Reply<i class="w-icon-long-arrow-right" />
            </button>
            <form v-if="showReply === commentDetails.id && toggleReply" class="reply-section mt-4 pb-4">
              <textarea
                :id="`comment-${commentDetails.id}`" v-model="newReply.comment" cols="30" rows="2" placeholder="Write a Reply"
                class="form-control mb-4" @focus="focusCommentReply"
              />
              <p v-if="errorComment.reply.status" class="error">
                {{ errorComment.reply.text }}
              </p>
              <div class="button flex">
                <button type="button" class="btn btn-dark btn-rounded btn-icon-right btn-cancel" @click="onToggleReplyTo">
                  Cancel
                </button>
                <div class="flex">
                  <div class="relative">
                    <button
                      type="button" class="btn btn-dark btn-rounded btn-icon-right btn-comment"
                      @click="postReply(commentDetails.id)"
                    >
                      Post Reply<i class="w-icon-long-arrow-right" />
                    </button>
                    <BaseLoading :is-loading="isLoadingReply" :width="20" :height="20" :border="2" />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div v-if="commentDetails.replies.length > 0" class="reviews-replies">
          <div v-for="reply in commentDetails.replies" :key="reply.id" class="replies">
            <figure class="comment-avatar">
              <BaseAvatar :size="90" :name="reply.user.name" :path="reply.user.avatar" />
            </figure>
            <div class="comment-content">
              <h4 class="comment-author font-weight-bold">
                <NuxtLink to="">
                  {{ reply.user.name }}
                </NuxtLink>
                <span class="comment-date">{{
                  new Date(reply.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })
                }}</span>
              </h4>
              <p>
                {{ reply.comment }}
              </p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <ul v-else>
    <div>
      This article has no comments
    </div>
  </ul>
  <BasePaginations
    v-if="filterReviews.length < reviews.length"
    :total="commentTotal" :page-size="commentPerPage" :current-page="currentPage"
    @on-page-change="currentPage = $event"
  />
  <div class="reply">
    <form class="reply-section pb-4">
      <h4 class="title title-md font-weight-bold pt-1 mt-10 mb-0">
        Leave a comment
      </h4>
      <p>Your email address will not be published. Required fields are marked</p>
      <textarea
        id="comment" v-model="newComment.comment" cols="30" rows="6" placeholder="Write a Comment"
        class="form-control mb-4" @focus="focusCommentPost"
      />
      <p v-if="errorComment.post.status" class="error">
        {{ errorComment.post.text }}
      </p>
      <div class="flex">
        <div class="relative">
          <button type="button" class="btn btn-dark btn-rounded btn-icon-right btn-comment" @click="postComment()">
            Post Comment<i class="w-icon-long-arrow-right" />
            <BaseLoading :is-loading="isLoadingNew" :width="20" :height="20" :border="2" />
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.comment-title {
  & .title {
    font-size: 2.4rem;
    border-top: 1px solid #eee;
  }

  & .comments {
    padding-bottom: 3.3rem;
    border-bottom: 1px solid #eee;

    .comment {
      position: relative;
      font-size: 1.3rem;
      padding: 2rem 0;
      border: none;

      .reviews-replies {
        margin: 2rem 0 1rem 9rem;

        & .replies {
          display: flex;
          margin: 3rem 0;

          & img {
            border-radius: 50%;
            width: 70px;
            height: 70px;
          }
        }

      }

      & .comment-body {
        display: flex;

        & .comment-avatar {
          flex: 0 0 9rem;
          max-width: 9rem;
          margin-right: 2rem;

          & img {
            border-radius: 50%;
            width: 70px;
            height: 70px;
          }
        }

        & .comment-content {
          flex: 1;

          & .comment-author {
            margin: 0.5rem 0 1rem;
            font-size: 1.8rem;
            color: #333;
            line-height: 1;

            & a {
              margin-right: 0.4rem;
              color: inherit;
            }

            & .comment-date {
              font-size: 1.3rem;
              color: #666;
              font-weight: 400;
              letter-spacing: 0;
            }

            & p {
              margin-bottom: 1.6rem;
              line-height: 1.9;
              font-size: 1.4rem;
            }
          }
        }

        & .btn-reply {
          text-transform: capitalize;
          font-weight: 400 !important;

          &:hover {
            color: #336699;
          }
        }
      }
    }
  }
}

.btn-comment {
  background-color: #444;
  padding: 1rem 1rem;
}

.btn-cancel {
  border: 2px solid #444;
  color: #333;
  background-color: #fff;
  padding: 1rem 1rem;
  margin-right: 1.5rem;
}
.error {
  font-size: 1.2rem;
  color: red;
  margin-bottom: 2rem;
}
</style>
