<script setup lang="ts">
interface ItemType { id: number; name: string; isActive: boolean }
interface CheckboxProps {
  title: string
  items: ItemType[]
  cleanAll: boolean
}
interface CheckboxEmits {
  (e: 'update:cleanAll', bool: boolean): void
  (e: 'onToggleCheckbox', array: number[]): void
}
const props = defineProps<CheckboxProps>()
const emits = defineEmits<CheckboxEmits>()

const numberItemShow = ref<number>(5)
const isViewAll = ref<boolean>(false)
const activeArray = ref<number[]>([])
const filterItems = computed<ItemType[]>(() => {
  const orderItem = props.items
  const regex = /^\d+/

  orderItem.sort((a, b) => {
    const aNum = a.name.match(regex)
    const bNum = b.name.match(regex)

    if (aNum && bNum)
      return Number(aNum[0]) > Number(bNum[0]) ? 1 : -1

    return a.name > b.name ? 1 : -1
  })
  return isViewAll.value ? orderItem : orderItem.slice(0, numberItemShow.value)
})

watchEffect(() => {
  if (props.cleanAll)
    activeArray.value = []
})

function onToggleCheckbox(index: number) {
  emits('update:cleanAll', false)

  if (activeArray.value.includes(index))
    activeArray.value = activeArray.value.filter(value => value !== index)
  else
    activeArray.value.push(index)

  emits('onToggleCheckbox', activeArray.value)
}
function onToggleViewAll() {
  isViewAll.value = !isViewAll.value
}
</script>

<template>
  <div class="widget-checkbox">
    <ul v-if="props.items.length > 0" class="filter-items item-check mt-2">
      <li v-for="(item, index) in filterItems" :key="index">
        <button
          class="check-btn" :class="{ active: activeArray.includes(index) }"
          @click="onToggleCheckbox(index)"
        >
          {{ item.name }}
        </button>
      </li>
      <button
        v-if="isViewAll || (!isViewAll && props.items.length > numberItemShow)"
        class="viewall-btn" @click="onToggleViewAll"
      >
        {{ `View all ${props.title}` }}
        <Icon name="majesticons:arrow-down-line" class="arrow-icon" :class="{ 'icon-up': isViewAll }" />
      </button>
    </ul>
    <div v-else class="filter-items">
      {{ props.title }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.widget-checkbox {
  & .filter-items {
    font-size: 1.4rem;

    &.item-check .check-btn {
      padding-left: 2.8rem !important;

      &::before {
        content: "";
        position: absolute;
        border: 1px solid;
        border-radius: 2px;
        width: 18px;
        height: 18px;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        left: 2px;
        color: #999;
        font-size: 1rem;
        font-weight: 900;
        font-family: "Font Awesome 5 Free";
        text-align: center;
        text-indent: 1px;
        line-height: 1.3em;
      }

      &.active {
        &::before {
          content: url("~/assets/svg/check.svg");
          background-color: #336699;
          width: 20px;
          height: 20px;
          color: #fff;
          border-radius: 3px;
          left: 2px;
          padding-top: 1px;
          padding-right: 1px;
          font-weight: 600;
        }
      }
    }

    & .check-btn {
      position: relative;
      display: block;
      color: inherit;
      padding: 1rem 0 1rem 0.2rem;

      &:hover {
        color: #336699;
      }
    }

    & .viewall-btn {
      display: flex;
      align-items: center;
      margin-top: 1rem;
      border-bottom: 1px solid #666;

      &:hover {
        color: #336699;
        border-color: #336699;
      }

      & .arrow-icon {
        margin-left: 0.5rem;
        transition: transform 0.3s;

        &.icon-up {
          transform: rotate(180deg);
        }
      }
    }
  }
}
</style>
