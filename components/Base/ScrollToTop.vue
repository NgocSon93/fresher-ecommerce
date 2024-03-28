<script setup lang="ts">
const showScrollTop = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    showScrollTop.value = window.scrollY > 800
  })
})

function handleScrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <Teleport to="body">
    <NuxtLink
      id="t-scroll-top"
      class="t-scroll-top box-border"
      title="Top"
      role="button"
      :class="{ 't-scroll-top--show': showScrollTop }"
      @click="handleScrollToTop"
    >
      <i class="w-icon-angle-up" />
    </NuxtLink>
  </Teleport>
</template>

<style lang="postcss" scoped>
.t-scroll-top {
  @apply z-[9999] w-[50px] h-[50px];
  @apply fixed right-[3.5rem] -bottom-[4rem] opacity-0;
  @apply transition-all duration-300;
  @apply bg-secondary text-white flex items-center justify-center rounded-full;

  &&--show {
    opacity: 1 !important;
    bottom: 98px !important;
  }

}
</style>
