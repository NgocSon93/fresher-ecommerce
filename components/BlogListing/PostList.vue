<script setup>
const listPosts = defineProps(['post'])
</script>

<template>
  <div class="listposts ">
    <article
      v-for="listPost in listPosts.post" :key="listPost.id"
      class="post post-list post-listing mb-md-10  pb-2 overlay-zoom mb-6"
    >
      <figure class="post-media br-sm">
        <NuxtLink :to="`/blogs/${listPost.slug}`">
          <NuxtImg :src="listPost.image" width="930" height="500" alt="blog" />
        </nuxtlink>
      </figure>
      <div class="post-details">
        <div class="post-cats text-primary cursor-pointer capitalize">
          <NuxtLink v-for="(article, index) in listPost.articles" :key="index" to="">
            {{ article.name }},
          </NuxtLink>
        </div>
        <h4 class="post-title">
          <NuxtLink :to="`/blogs/${listPost.slug}`">
            {{ listPost.title }}
          </NuxtLink>
        </h4>
        <div class="post-content" v-html="listPost.content" />
        <div class="post-content">
          <NuxtLink :to="`/blogs/${listPost.slug}`" class="btn btn-link btn-primary">
            (read more)
          </NuxtLink>
        </div>
        <div class="post-meta">
          by <NuxtLink :to="`/blogs/${listPost.slug}`" class="post-author">
            {{ listPost.author }}
          </NuxtLink>
          - <NuxtLink :to="`/blogs/${listPost.slug}`" class="post-date">
            {{
              new Date(listPost.createdAt).toLocaleDateString('en-US', {
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
      </div>
    </article>
  </div>
</template>

<style scoped lang="scss">
.listposts {
  & .overlay-zoom {
    overflow: hidden;
  }

  & .post-list {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  & .post {
    font-size: 1rem;

    & .post-media {
      flex: 0 0 43.1%;
      position: relative;
      margin-right: 2rem;
      margin-bottom: 0;
      overflow: hidden;
      max-width: 400px;
      max-height: 215px;

      & img {
        width: 100%;
        height: auto;
        object-fit: cover;
      }
    }

    & .br-sm {
      border-radius: 0.5rem !important;
      overflow: hidden !important;
    }

    & figure {
      margin: 0;
    }

    & .post-details {
      padding-top: 1rem;
      padding-bottom: 1.2rem;
      flex: 1;
      padding: 1rem 0 2.4rem;

      & .post-cats {
        margin-bottom: 0.5rem;
      }

      & .post-title {
        font-weight: 600;
        font-size: 1.8rem !important;
        line-height: 1.2;
        margin-bottom: 1rem;
      }

      & h4 {
        font-size: 1.8rem !important;
        font-weight: 700;
        line-height: 1.2;
        color: #333;
        letter-spacing: 0;
        margin: 0 0 2rem;

        & a {
          color: inherit;
          text-decoration: none;
          -webkit-transition: color 0.3s;
          transition: color 0.3s;

          &:hover {
            color: #336699;
            cursor: pointer;
          }
        }
      }

      & .post-content {
        margin-bottom: 1rem;
        max-width: 510px;
        max-height: 75px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        word-wrap: break-word;
        word-break: break-all;

        & p {
          display: inline;
          margin-right: 1.1rem;
          overflow: hidden;
          font-size: 1.3rem;
          line-height: 1.9;
          letter-spacing: -0.025em;
          margin-bottom: 1.8rem;
        }

        & .btn {
          padding-top: 0.3rem;
          text-transform: lowercase;
          font-weight: 400;
          font-size: 1.3rem;
          letter-spacing: -0.025em;

          &:hover {
            color: #333;
          }
        }

        & .btn-link {
          padding: 0;
          border: 0;
          background: transparent;
        }

        & .btn-link {
          background-color: transparent;
          color: #336699;
          border-color: #336699;
        }

      }

      & .post-meta {
        margin-bottom: 0;
        display: inline-flex;
        flex-wrap: wrap;
        align-items: center;
        color: #999999;
        font-size: 1.3rem;
        font-weight: 600;
        font-family: Poppins, sans-serif;
        line-height: 1.7;

        & .post-author {
          margin: 0 0.4rem;

        }

        & a {
          font-weight: 600;
          font-size: 1.4rem;
          color: #333;
          white-space: nowrap;
          text-decoration: none;
          transition: color 0.3s;

          &:hover {
            color: #336699
          }
        }

        & .post-date {
          margin: 0 2rem 0 0.4rem;
          font-weight: 400;
        }
      }

      & .text-primary {
        color: #336699 !important;
      }
    }
  }

  & .mb-md-10 {
    min-width: 768px;
    margin-bottom: 5rem !important;
  }

  & .pb-2 {
    padding-bottom: 1rem !important;
  }
}
</style>
