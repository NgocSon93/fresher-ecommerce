import { fileURLToPath } from 'node:url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    '@vueuse/nuxt',
    'nuxt-vitest',
    'nuxt-svgo',
    '@nuxtjs/google-fonts',
    'nuxt-icon',
    '@nuxtjs/tailwindcss',
    'nuxt-swiper',
  ],
  css: [
    '~/assets/css/vendor/fontawesome-free/css/all.min.css',
    '~/assets/css/style.min.css',
  ],
  tailwindcss: {
    injectPosition: 'first',
  },
  experimental: {
    payloadExtraction: false,
    inlineSSRStyles: false,
  },
  image: {
    dir: 'public',
  },
  runtimeConfig: {
    public: {
      apiUrl: '',
      baseUrl: '' || 'http://172.16.1.68:8899',
    },
  },
  alias: {
    '@scss': fileURLToPath(new URL('./assets/scss/', import.meta.url)),
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width,initial-scale=1',
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon.png' },
      ],
      meta: [
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },
  sourcemap: true,
  typescript: {
    strict: true,
  },
  devtools: { enabled: true },
  googleFonts: {
    families: {
      Poppins: [400, 500, 600, 700, 800, 900],
    },
    display: 'swap',
  },
})
