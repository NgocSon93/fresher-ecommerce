<script setup>
const blogsStore = useBlogsStore()

const listOurBlog = computed(() => blogsStore.posts ?? [])
const dataOurBlog = computed(() => listOurBlog.value.slice(0, 4))

;(async function ourBlog() {
  if (!blogsStore.posts.length) {
    const { data } = await useCustomFetch(`/posts`)
    if (data.value)
      blogsStore.setPosts(data.value.data ?? [])
  }
})()
</script>

<template>
  <div class="post-wrapper appear-animate mb-4 fadeIn appear-animation-visible">
    <div class="container pb-2">
      <div class="title-link-wrapper pb-1 mb-4">
        <h2 class="title ls-normal mb-0">
          From Our Blog
        </h2>
        <NuxtLink href="/blogs" class="font-weight-bold font-size-normal">
          View All Articles
        </NuxtLink>
      </div>
      <div class="swiper">
        <div v-if="dataOurBlog.length" class="swiper-wrapper">
          <div class="flex w-full">
            <div
              v-for="related in dataOurBlog" :key="related.id" class="swiper-slide post post-grid col-md-3 mx-2"
              :class="{ relatedpost: showRelated }"
            >
              <div class="swiper-wapper-body">
                <figure class="post-media br-sm">
                  <NuxtLink :to="`/blogs/${related.slug}`">
                    <NuxtImg :src="related.image" alt="Post" width="296" height="190" style="background-color: #bcbcb4;" />
                  </NuxtLink>
                </figure>
                <div class="post-details text-center">
                  <div class="post-meta">
                    by <NuxtLink :to="`/blogs/${related.slug}`" class="post-author">
                      {{ related.author }}
                    </NuxtLink>
                    - <NuxtLink :to="`/blogs/${related.slug}`" class="post-date">
                      {{
                        new Date(related.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour12: true,
                        })
                      }}
                    </NuxtLink>
                  </div>
                  <h4 class="post-title mb-3">
                    <NuxtLink :to="`/blogs/${related.slug}`">
                      {{ related.title }}
                    </NuxtLink>
                  </h4>
                  <NuxtLink :to="`/blogs/${related.slug}`" class="btn btn-link btn-dark btn-underline font-weight-normal">
                    Read More<i class="w-icon-long-arrow-right" />
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          There are'n any post yet
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.swiper {
  position: relative;

  & .swiper-wrapper {
    overflow: hidden;

    & .swiper-slide {
      & .swiper-wapper-body {
        margin: 0 5px;
        & .post-media {
          cursor: pointer;
          overflow: hidden;
        }

        & .post-details {
          padding-bottom: 2.5rem;

          & .post-title:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
}

.swiper-wrapper {
  display: flex !important;
}
img {
  max-height: 190px;
}

img:hover {
  transform: scale(1.1);
  transition: all 0.4s;
}
</style>
