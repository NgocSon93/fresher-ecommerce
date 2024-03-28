<script setup lang="ts">
import { getSlugWithId } from '~/utils/slug'
import type { Categories } from '~/types/categories'

interface CheckboxEmits { (e: 'onToggleCategory'): void }
const emits = defineEmits<CheckboxEmits>()

const route = useRoute()
const categoryStore = useCategoryStore()

const slug = ref<string>(route.params?.slug as string || '')
const categoryId = computed<string>(() => getIdBySlug(slug.value))

const numberItemShow = ref<number>(10)
const isViewAll = ref<boolean>(false)
const filterItems = computed<Categories>(() => {
  if (isViewAll.value)
    return categoryStore.topLevelCategories
  return categoryStore.topLevelCategories.slice(0, numberItemShow.value)
})

function onToggleCategory() {
  emits('onToggleCategory')
}
function onToggleViewAll() {
  isViewAll.value = !isViewAll.value
}
</script>

<template>
  <div class="widget-categories">
    <div v-if="filterItems.length === 0" class="filter-items">
      There aren't any categories yet
    </div>
    <ul v-else class="filter-items search-ul">
      <li v-for="item in filterItems" :key="item.id">
        <NuxtLink
          :to="`/categories/${getSlugWithId(item.id, item.slug)}`"
          :class="{ active: item.id.toString() === categoryId }"
          @click="onToggleCategory"
        >
          {{ item.name }}
        </NuxtLink>
      </li>
      <button
        v-if="isViewAll || (!isViewAll && categoryStore.topLevelCategories.length > numberItemShow)"
        class="viewall-btn" @click="onToggleViewAll"
      >
        {{ `View all Categories` }}
        <Icon name="majesticons:arrow-down-line" class="arrow-icon" :class="{ 'icon-up': isViewAll }" />
      </button>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.widget-categories {
  & .filter-items {
    font-size: 1.4rem;

    & .active {
      color: #336699;
    }

    & a {
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
