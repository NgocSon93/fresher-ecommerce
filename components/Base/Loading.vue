<script setup lang="ts">
interface LoadingProps {
  isLoading: boolean
  fullScreen?: boolean
  width?: number
  height?: number
  border?: number
}
const props = defineProps<LoadingProps>()
</script>

<template>
  <div class="loading-overlay" :class="{ active: props.isLoading, screen: props.fullScreen }">
    <div
      class="loading-spinner"
      :style="{ 'width': `${props.width}px` || '50px', 'height': `${props.height}px` || '50px', 'border-width': `${props.border}px` || '4px' }"
    />
  </div>
</template>

<style scoped lang="scss">
.loading-overlay {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(#fff, 0.6);
  z-index: 9999;

  &.active {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.screen {
    position: fixed;
    width: 100vw;
    height: 100vh;
  }

  & .loading-spinner {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 4px solid #ddd;
    border-top-color: #336699;
    border-bottom-color: #336699;
    animation: spin 1s ease-in-out infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
