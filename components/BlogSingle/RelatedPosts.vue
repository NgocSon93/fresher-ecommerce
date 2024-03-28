<script setup>
const blogsStore = useBlogsStore()
const listRelated = computed(() => blogsStore.posts.slice(0, 4))
const showRelated = ref(false)
function toggleRelatedLeft() {
  showRelated.value = false
}
function toggleRelatedRight() {
  showRelated.value = true
}
</script>

<template>
  <div class="related-posts mb-4">
    <div class="related-post-title ">
      <h4 class="title title-lg font-weight-bold pt-10 mt-1 mb-5 justify-between">
        Related Posts
        <div v-if="listRelated.length > 3" class="icon-popular">
          <Icon name="mingcute:left-line" :class="{ isactive: !showRelated }" @click="toggleRelatedLeft()" />
          <Icon name="mingcute:right-line" :class="{ isactive: showRelated }" @click="toggleRelatedRight()" />
        </div>
      </h4>
    </div>

    <div class="swiper flex">
      <div class="swiper-wrapper ">
        <div
          v-for="related in listRelated" :key="related.id" class="swiper-slide post post-grid col-md-4"
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
  </div>
</template>

<style lang="scss" scoped>
.related-posts {
  & .title-lg {
    border-top: 1px solid #eee;
    font-size: 2.4rem;

    & .icon-popular svg {
      cursor: pointer;
    }
  }

  & .swiper {
    position: relative;

    & .swiper-wrapper {
      overflow: hidden;

      & .swiper-slide {
        transition: transform 0.4s, opacity 0.4s;
        transform: translate3d(0px, 0px, 0px);

        &.relatedpost {
          transform: translate3d(-320px, 0px, 0px);
        }

        & .swiper-wapper-body {
          width: 95%;
          margin: 0 5px;

          & .post-media {
            cursor: pointer;
            max-height: 190px;
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
}

.isactive {
  color: #777;
}
</style>
