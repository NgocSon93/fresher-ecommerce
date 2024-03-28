<script setup lang="ts">
interface TabViewConfiguration {
  wrapperClass?: string
  navigationClass?: string
  itemClass?: string
  linkClass?: string
  activeClass?: string
}

defineProps<TabViewConfiguration>()

const currentTab = ref<string>('')
const tabLabels = ref<string[]>([])

function addTab(label: string) {
  tabLabels.value.push(label)
  if (!currentTab.value)
    currentTab.value = label
}

function isTabActive(label: string): boolean {
  return currentTab.value === label
}

provide('addTab', addTab)
provide('isTabActive', isTabActive)
</script>

<template>
  <div :class="wrapperClass">
    <ul :class="navigationClass" role="tablist">
      <li
        v-for="tabLabel in tabLabels" :key="tabLabel"
        :class="itemClass"
        @click="currentTab = tabLabel"
      >
        <NuxtLink
          :class="`${linkClass} ${currentTab === tabLabel ? activeClass : ''}`"
        >
          {{ tabLabel }}
        </NuxtLink>
      </li>
    </ul>
    <slot />
  </div>
</template>
