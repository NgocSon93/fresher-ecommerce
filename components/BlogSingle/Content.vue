<script setup>
defineProps(['detailpost'])
</script>

<template>
  <div v-if="detailpost">
    <div class="post post-grid post-single">
      <figure class="post-media br-sm">
        <NuxtImg :src="detailpost.image" alt="Blog" width="930" height="500" />
      </figure>
      <div class="post-details">
        <div class="post-meta">
          by <NuxtLink href="#" class="post-author">
            {{ detailpost.author }}
          </NuxtLink>
          - <NuxtLink href="#" class="post-date">
            {{
              new Date(detailpost.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })
            }}
          </NuxtLink>
        </div>
        <h2 class="post-title">
          <NuxtLink href="#">
            {{ detailpost.title }}
          </NuxtLink>
        </h2>
        <div class="post-content" v-html="detailpost.content" />
      </div>
    </div>
    <!-- End Post -->
    <blockquote class="text-center mb-8">
      <i class="fas fa-quote-left" />
      <p class="font-weight-bold text-dark mt-1 mb-2">
        War and Marketing Have Many Similarities
      </p>
      <cite class="font-weight-normal text-dark">JELLY CRISTIANA</cite>
    </blockquote>
    <!-- End Blockquote -->
    <BaseSocialSection :items="['facebook', 'twitter', 'pinterest', 'instagram', 'youtube']" class="p-0 mb-10" />
    <div class="post-author-detail mb-10">
      <figure class="author-media mr-4">
        <NuxtImg :src="detailpost.image" :alt="detailpost.author" width="105" height="105" />
      </figure>
      <div class="author-details">
        <div class="author-name-wrapper flex-wrap mb-2">
          <h4 class="author-name font-weight-bold mb-2 pr-4 mr-auto">
            {{ detailpost.author }}
            <span class="font-weight-normal text-default">(AUTHOR)</span>
          </h4>
          <NuxtLink href="#" class="btn btn-primary btn-link btn-icon-right pb-0 text-normal font-weight-normal mb-2">
            More Posts
            by admin<i class="w-icon-long-arrow-right" />
          </NuxtLink>
        </div>
        <p class="mb-0">
          Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismoder eu pulvinar nunc sapien ornare
          nisl.
          Ped earcudaap ibuseu, fermentum et, dapibus sed, urna. Morbi interdum mollis sapien.
        </p>
      </div>
    </div>
    <!-- End Post Author Detail -->
  </div>
  <div v-else>
    There are'n any post yet
  </div>
  <BlogSingleRelatedPosts />
  <BlogSingleReply />
</template>

<style lang="scss" scoped>
.post-single {
  & .post-media {
    & img {
      max-height: 500px;
    }
  }
  & .post-details {
    padding: 3.6rem 0 2.6rem;

    & .post-title {
      margin-bottom: 1.9rem;
      white-space: normal;
      font-size: 3rem;
      line-height: 1.2;
      font-weight: 600;
    }

    & .post-content {
      display: block;
      margin-bottom: 1.4rem;
      font-size: 1.4rem;
      letter-spacing: 0;
      line-height: 1.86;

      & a:hover {
        color: #336699;
        text-decoration: underline;
      }
    }

    & .post-meta {
      margin-bottom: 0.8rem;
    }
  }

}

blockquote {
  padding: 4.2rem 1rem;
  background-color: #f8f8f8;

  & i {
    font-size: 3rem;
    color: #336699;
  }

  & p {
    font-size: 2.6rem;
  }

  & cite {
    font-size: 1.2rem;
    font-style: normal;
  }
}

.title {
  margin-bottom: 1.7rem;
}

ul {
  margin: 1rem 0;
}

.post-author-detail {
  padding: 4rem 4rem;
  background-color: #f8f8f8;
  display: flex;
  align-items: center;

  & .author-media {
    flex: 0 0 10.5rem;
    max-width: 10.5rem;

    & img {
      max-width: 105px;
      max-height: 105px;
    }
  }

  & .author-details {
    & .author-name-wrapper {
      display: flex;
      align-items: center;

      & .author-name {
        white-space: nowrap;

        & span {
          font-size: 1.3rem;
        }
      }

      & a:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
