<script setup lang="ts">
interface CheckboxProps { title: string }
const props = defineProps<CheckboxProps>()

const isCollapsed: Ref<boolean> = ref(false)

const widgetBodyElement = ref<HTMLElement | null>(null)
const { height } = useElementSize(widgetBodyElement)
const widgetBodyHeight = ref(`${height.value}px`)
const collapseObj = ref({
  display: 'block',
})

function onClickTitle(isCollapsed: boolean) {
  if (height.value)
    widgetBodyHeight.value = `${height.value}px`
  if (isCollapsed) {
    setTimeout(() => {
      collapseObj.value.display = 'none'
    }, 390)
  }
  else {
    collapseObj.value.display = 'block'
  }
}
</script>

<template>
  <div class="widget">
    <FiltersTopHeader v-model:is-collapsed="isCollapsed" :title="props.title" @on-click-title="onClickTitle" />
    <div ref="widgetBodyElement" class="widget-body" :class="{ collapsed: isCollapsed }" :style="collapseObj">
      <slot />
    </div>
  </div>
  <!-- End of Widget -->
</template>

<style scoped lang="scss">
.widget {
  & .widget-body {
    opacity: 1;
    -webkit-transition: opacity 0.5s;
    transition: opacity 0.5s;
    color: #333;

    padding: 0.7rem 0 1rem;
    margin-bottom: 1rem;

    overflow: hidden;
    animation: expanding 0.4s;

    &.collapsed {
      opacity: 0.1;
      animation: collapsing 0.4s;
    }
  }
}

@keyframes expanding {
  0% {
    height: 0;
    padding-top: 0;
    margin-top: 0;
    padding-bottom: 0;
    margin-bottom: 0;
    opacity: 0.1;
  }

  100% {
    height: calc(v-bind(widgetBodyHeight) + 0.7rem + 1rem);
    padding-top: 0.7rem;
    margin-top: 0;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    opacity: 1;
  }
}

@keyframes collapsing {
  0% {
    height: calc(v-bind(widgetBodyHeight) + 0.7rem + 1rem);
    padding-top: 0.7rem;
    margin-top: 0;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    opacity: 1;
  }

  100% {
    height: 0;
    padding-top: 0;
    margin-top: 0;
    padding-bottom: 0;
    margin-bottom: 0;
    opacity: 0.1;
  }
}
</style>
