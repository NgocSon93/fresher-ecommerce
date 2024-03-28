<script setup lang="ts">
import { useElementSize, useWindowScroll } from '@vueuse/core'

const commonStore = useCommonStore()

const headerStaticElement = ref<HTMLElement | null>(null)
const headerBottomElement = ref<HTMLElement | null>(null)

const { height: headerBottomHeight } = useElementSize(headerBottomElement)

const isSticky = ref(false)

onMounted(() => {
  const { y: scrollY } = useWindowScroll()
  const { height: headerStaticHeader } = useElementSize(headerStaticElement)

  watchEffect(() => {
    commonStore.setStaticHeaderHeight(headerStaticHeader.value)
    commonStore.setNavHeight(headerBottomHeight.value)
    isSticky.value = scrollY.value > headerStaticHeader.value
  })
})

provide('isSticky', isSticky)
</script>

<template>
  <header
    :style="{
      marginBottom: isSticky ? `${headerBottomHeight}px` : '0',
    }"
    class="header"
  >
    <div ref="headerStaticElement">
      <TheHeaderTop />
      <TheHeaderMiddle />
    </div>
    <TheHeaderBottom
      ref="headerBottomElement"
      :class="isSticky ? 'fixed top-0 w-full' : ''"
    />
  </header>
</template>
