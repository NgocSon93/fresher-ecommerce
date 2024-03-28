<script setup lang="ts">
provide('layout', 'default')
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
