<script setup lang="ts">
import type { NavigationItem } from '~/types'

const route = useRoute()

// navigation bar
const navItems = reactive<NavigationItem[]>([
  { label: 'Home', url: '/', active: false },
  { label: 'Shop', url: '/categories', active: false },
  { label: 'Blog', url: '/blogs', active: false },
  { label: 'About', url: '/about', active: false },
  { label: 'Contact', url: '/contact', active: false },
])

function setActive(url: string) {
  navItems.forEach((item) => {
    item.active = item.url === url
  })
}

watchEffect(() => {
  setActive(route.path)
})
</script>

<template>
  <nav class="main-nav">
    <ul class="menu active-underline">
      <li
        v-for="(item, index) in navItems" :key="index"
        :class="{ active: item.active }"
        @click="setActive(item.url)"
      >
        <NuxtLink :to="item.url" class="border-[#336699]">
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
