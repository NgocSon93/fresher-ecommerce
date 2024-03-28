<script setup lang="ts">
interface BreadcrumbProps { text: string }
defineProps<BreadcrumbProps>()
</script>

<template>
  <!-- Start of Page Header -->
  <div class="page-header">
    <div class="container">
      <h1 class="page-title mb-0">
        {{ text }}
      </h1>
    </div>
  </div>
  <!-- End of Page Header -->
</template>
