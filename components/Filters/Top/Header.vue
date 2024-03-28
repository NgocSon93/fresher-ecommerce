<script setup lang="ts">
interface HeaderProps { isCollapsed: boolean; title: string }
interface HeaderEmits { (e: 'update:isCollapsed', collapsed: boolean): void; (e: 'onClickTitle', collapsed: boolean): void }
const props = defineProps<HeaderProps>()
const emits = defineEmits<HeaderEmits>()

const isCollapsed: Ref<boolean> = computed(() => props.isCollapsed)

function onClickTitle() {
  emits('update:isCollapsed', !isCollapsed.value)
  emits('onClickTitle', !isCollapsed.value)
}
</script>

<template>
  <h3 class="widget-title" @click="onClickTitle">
    <span>{{ props.title }}</span>
    <button class="widget-btn">
      <Icon name="uil:plus" class="custom-icon plus-icon" :class="{ collapsed: !isCollapsed }" />
    </button>
    <button class="widget-btn">
      <Icon name="uil:minus" class="custom-icon" :class="{ collapsed: isCollapsed }" />
    </button>
  </h3>
</template>

<style scoped lang="scss">
.widget {
  & .widget-title {
    position: relative;
    margin: -0.1rem 0;
    padding: 1.4rem 2.5rem 1.4rem 0;
    font-weight: 600;
    font-size: 1.6rem;
    color: #333;
    letter-spacing: 0;
    border-bottom: 1px solid #eee;
    text-transform: capitalize;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    & .widget-btn {
      display: block;
      position: absolute;
      right: 0;
      top: 50%;
      -webkit-transform: translate(-100%, -50%);
      transform: translate(-100%, -50%);

      margin-top: -0.1rem;
      width: 10px;
      padding: 0;
      opacity: 1;

      & .custom-icon {
        -webkit-transition: all 0.3s;
        transition: all 0.3s;

        &.collapsed {
          visibility: none;
          opacity: 0;
          transform: rotate(180deg);

          &.plus-icon {
            transform: rotate(-180deg);
          }
        }
      }
    }
  }
}
</style>
