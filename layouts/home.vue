<script lang="ts" setup>
provide('layout', 'home')
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: '/css/demo1.min.css',
    },
  ],
})
</script>

<template>
  <div class="page-wrapper">
    <TheHeader />

    <main class="main">
      <slot />
    </main>

    <TheFooter />
  </div>
</template>
