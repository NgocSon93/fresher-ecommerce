<script setup lang="ts">
interface SocialItemsProps { appearance?: string; items: string[] }
const props = defineProps<SocialItemsProps>()

const currentLink = computed(() => `${useRuntimeConfig().public.baseUrl}${useRoute().path}`)

interface SocialItem { name: string; iconName: string; color: string; link: string }
const socialItems: SocialItem[] = [
  {
    name: 'facebook',
    iconName: 'jam:facebook',
    color: '#1b4f9b',
    link: `https://www.facebook.com/sharer/sharer.php?u=${currentLink.value}`,
    // link: `https://www.facebook.com/sharer/sharer.php?u=&t=`,
  },
  {
    name: 'twitter',
    iconName: 'jam:twitter',
    color: '#00adef',
    link: `https://twitter.com/intent/tweet?url=${currentLink.value}`,
    // link: `https://twitter.com/intent/tweet?url=&text=`,
  },
  {
    name: 'instagram',
    iconName: 'jam:instagram',
    color: '#cc0001',
    link: `https://www.instagram.com/?url=${currentLink.value}`,
    // link: 'https://www.instagram.com/?url=',
  },
  {
    name: 'youtube',
    iconName: 'mingcute:youtube-line',
    color: '#2c567e',
    link: '#',
  },
  {
    name: 'google',
    iconName: 'jam:google',
    color: '#dd4b39',
    link: '#',
  },
  {
    name: 'pinterest',
    iconName: 'mdi:pinterest',
    color: '#f96a02',
    link: `https://pinterest.com/pin/create/button/?url=${currentLink.value}`,
    // link: `https://pinterest.com/pin/create/button/?url=`,
  },
  {
    name: 'email',
    iconName: 'mdi:email-outline',
    color: '#dd4b39',
    link: `mailto:?subject=I wanted you to see this site&amp;body=Check out this site ${currentLink.value}.`,
    // link: `mailto:?subject=I wanted you to see this site&amp;body=Check out this site http://www.website.com.`,
  },
  {
    name: 'whatsapp',
    iconName: 'jam:whatsapp',
    color: '#3c8a38',
    link: `https://wa.me/?text=${currentLink.value}`,
    // link: `https://wa.me/?text=`,
  },
  {
    name: 'linkedin',
    iconName: 'jam:linkedin',
    color: '#2c567e',
    link: `https://www.linkedin.com/shareArticle?mini=true&url=${currentLink.value}`,
    // link: `https://www.linkedin.com/shareArticle?mini=true&url=`,
  },
]

function getSocialArrays(): SocialItem[] {
  const socialArrays = props.items.map(value => socialItems.find(item => item.name === value))
  return socialArrays.reduce((acc: SocialItem[], socialItem) => {
    if (socialItem !== undefined)
      acc.push(socialItem)
    return acc
  }, [])
}
function getStyle(color: string) {
  if (props.appearance === 'outline') {
    return {
      'bacground-color': '#fff',
      'border-color': color,
      'color': color,
    }
  }
  else if (props.appearance === 'fill') {
    return {
      'background-color': color,
      'border-color': color,
      'color': '#fff',
    }
  }
  else {
    return {}
  }
}
</script>

<template>
  <!-- Start of Social Section -->
  <ul class="social-icons flex items-center">
    <li v-for="item in getSocialArrays()" :key="item.name">
      <NuxtLink
        :to="item.link"
        target="_blank"
        class="social-icon"
        :class="`social-${item.name}`"
        :style="getStyle(item.color)"
        :title="`Share on ${item.name}`"
      >
        <Icon :name="item.iconName" size="18px" />
      </NuxtLink>
    </li>
  </ul>
  <!-- End of Social Section -->
</template>

<style scoped lang="scss">
.social-icons {
  padding: 0;

  & .social-icon {
    font-size: 1.4rem;
    width: 32px;
    height: 32px;
    margin: 2px 10px 2px 0;
    line-height: 28px;
    border: 2px solid #ccc;
    border-radius: 50%;
    color: inherit;
    -webkit-transition: color 0.4s, border 0.4s, background-color 0.4s;
    transition: color 0.4s, border 0.4s, background-color 0.4s;
    text-align: center;

    display: flex;
    align-items: center;
    justify-content: center;
    border-color: #cdcdcd;
    color: #666;
    margin-right: 0.8rem;
    border-width: 1px;
    line-height: 3rem;

    &:hover {

      &.social-facebook {
        background-color: #1b4f9b;
        border-color: #1b4f9b;
        color: #fff !important;
      }

      &.social-twitter {
        background-color: #00adef;
        border-color: #00adef;
        color: #fff !important;
      }

      &.social-instagram {
        background-color: #cc0001;
        border-color: #cc0001;
        color: #fff !important;
      }

      &.social-youtube {
        background-color: #2c567e;
        border-color: #2c567e;
        color: #fff !important;
      }

      &.social-google {
        background-color: #dd4b39;
        border-color: #dd4b39;
        color: #fff !important;
      }

      &.social-pinterest {
        background-color: #f96a02;
        border-color: #f96a02;
        color: #fff !important;
      }

      &.social-email {
        border-color: #dd4b39;
        background-color: #dd4b39;
        color: #fff !important;
      }

      &.social-whatsapp {
        border-color: #3c8a38;
        background-color: #3c8a38;
        color: #fff !important;
      }

      &.social-linkedin {
        border-color: #2c567e;
        background-color: #2c567e;
        color: #fff !important;
      }
    }
  }
}
</style>
