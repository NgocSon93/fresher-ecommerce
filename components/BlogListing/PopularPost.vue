<script setup>
const commonStore = useCommonStore()
const showPopular = ref(false)
const listPopular = ref([])

;(async function popular() {
  commonStore.setIsLoading(true)
  const { data } = await useCustomFetch(`/posts-popular`)
  if (data.value)
    listPopular.value = data.value.data ?? []
  commonStore.setIsLoading(false)
})()

const popularPostPrimary = computed(() => listPopular.value.slice(0, 3))
const popularPostSecondary = computed(() => listPopular.value.slice(3, 6))

function togglePopularLeft() {
  showPopular.value = false
}
function togglePopularRight() {
  showPopular.value = true
}
</script>

<template>
  <div class="widget widget-posts">
    <div class="widget-posts-title">
      <h3 class="widget-title bb-no flex justify-between">
        Popular Posts
        <div v-if="listPopular.length > 3" class="icon-popular">
          <Icon name="mingcute:left-line" :class="{ isactive: !showPopular }" @click="togglePopularLeft()" />
          <Icon name="mingcute:right-line" :class="{ isactive: showPopular }" @click="togglePopularRight()" />
        </div>
      </h3>
    </div>

    <div class="widget-body ">
      <div class="swiper-wrapper">
        <div class="swiper-slide widget-col pr-[2rem]" :class="{ popularpost: showPopular }">
          <div v-for="post in popularPostPrimary" :key="post.id" class="post-widget mb-4">
            <figure class="post-media br-sm">
              <NuxtImg :src="post.image" alt="150" height="150" />
            </figure>
            <div class="post-details">
              <div class="post-meta">
                <NuxtLink :to="`/blogs/${post.slug}`" class="post-date">
                  {{
                    new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour12: true,
                    })
                  }}
                </NuxtLink>
              </div>
              <h4 class="post-title">
                <NuxtLink :to="`/blogs/${post.slug}`">
                  {{ post.title }}
                </NuxtLink>
              </h4>
            </div>
          </div>
        </div>
        <div v-if="listPopular.length > 3" class="swiper-slide widget-col" :class="{ popularpost: showPopular }">
          <div v-for="post in popularPostSecondary" :key="post.id" class="post-widget mb-4">
            <figure class="post-media br-sm">
              <NuxtImg :src="post.image" alt="150" height="150" />
            </figure>
            <div class="post-details">
              <div class="post-meta">
                <NuxtLink :to="`/blogs/${post.slug}`" class="post-date">
                  {{
                    new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour12: true,
                    })
                  }}
                </NuxtLink>
              </div>
              <h4 class="post-title">
                <NuxtLink :to="`/blogs/${post.slug}`">
                  {{ post.title }}
                </NuxtLink>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.widget {
  & .widget-posts-title {

    & .icon-popular {
      & svg {
        font-size: 2rem;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }

  & .widget-body {
    position: relative;

    & .swiper-wrapper {
      position: relative;
      overflow: hidden;

      & .swiper-slide {
        transition: transform 0.4s, opacity 0.4s;
        transform: translate3d(0px, 0px, 0px);
         & .post-title {
          cursor: pointer;
         }
        &.popularpost {
          transform: translate3d(-300px, 0px, 0px);
        }
      }
    }
  }
}

img {
  height: 80px;
  width: 80px;
}

.isactive {
  color: #777;
}
</style>
