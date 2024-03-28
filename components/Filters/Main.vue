<script setup lang="ts">
interface SidebarProps { isActive: boolean }
interface SidebarEmits {
  (e: 'update:isActive', isActive: boolean): void
  (e: 'onTogglePrice'): void
  (e: 'onToggleBrand', nameArray: string[]): void
  (e: 'onToggleConcentration', nameArray: string[]): void
  (e: 'onToggleSize', nameArray: string[]): void
}
const props = defineProps<SidebarProps>()
const emits = defineEmits<SidebarEmits>()

const categoryStore = useCategoryStore()
const commonStore = useCommonStore()

const cleanAll = ref<boolean>(false)
const isActiveFilterTab = computed<boolean>(() => props.isActive)
const brandItems = computed(() => {
  if (commonStore.brands.length) {
    return commonStore.brands?.map((value) => {
      return {
        id: value.id,
        name: value.name,
        isActive: false,
      }
    })
  }
  return []
})
const concentrationItems = computed(() => {
  if (commonStore.concentrations.length) {
    return commonStore.concentrations?.map((value) => {
      return {
        id: value.id,
        name: value.name,
        isActive: false,
      }
    })
  }
  return []
})
const sizeItems = computed(() => {
  if (commonStore.sizes.length) {
    return commonStore.sizes?.map((value) => {
      return {
        id: value.id,
        name: value.name,
        isActive: false,
      }
    })
  }
  return []
})

;(async function getFilters() {
  // Fetch categories when mounted
  if (!categoryStore.topLevelCategories.length)
    categoryStore.fetchData()
  // Fetch brands when mounted
  if (!commonStore.brands.length)
    commonStore.fetchAllBrands()
  // Fetch concentrations when mounted
  if (!commonStore.concentrations.length)
    commonStore.fetchAllConcentrations()
  // Fetch sizes when mounted
  if (!commonStore.sizes.length)
    commonStore.fetchAllSizes()
})()

// Component function
function onToggleCloseFilters() {
  emits('update:isActive', false)
}
function onToggleCleanAll() {
  cleanAll.value = true
  navigateTo({ params: {} })
  emits('onToggleBrand', [])
  emits('onToggleConcentration', [])
  emits('onToggleSize', [])
  emits('update:isActive', false)
}
function onTogglePrice() {
  emits('onTogglePrice')
}
function onToggleBrand(activeArray: number[]) {
  const nameArray = activeArray.map((value) => {
    return brandItems.value[value]?.name ?? ''
  })
  emits('onToggleBrand', nameArray)
}
function onToggleConcentration(activeArray: number[]) {
  const nameArray = activeArray.map((value) => {
    return concentrationItems.value[value]?.name ?? ''
  })
  emits('onToggleConcentration', nameArray)
}
function onToggleSize(activeArray: number[]) {
  const nameArray = activeArray.map((value) => {
    return sizeItems.value[value]?.name ?? ''
  })
  emits('onToggleSize', nameArray)
}
</script>

<template>
  <!-- Start of Sidebar, Shop Sidebar -->
  <aside class="sidebar shop-sidebar left-sidebar sticky-sidebar-wrapper" :class="{ active: isActiveFilterTab }">
    <!-- Start of Sidebar Overlay -->
    <div class="sidebar-overlay" @click="onToggleCloseFilters" />
    <button class="sidebar-close" @click="onToggleCloseFilters">
      <Icon name="uil:plus" class="close-icon" />
    </button>

    <!-- Start of Sidebar Content -->
    <div class="sidebar-content scrollable">
      <div class="filter-actions">
        <label>Filter :</label>
        <button class="btn btn-dark btn-link filter-clean" @click="onToggleCleanAll">
          Clean All
        </button>
      </div>
      <!-- Start of Collapsible widget -->
      <FiltersCollapse title="All Categories">
        <FiltersItemsCategories @on-toggle-category="onToggleCloseFilters" />
      </FiltersCollapse>

      <FiltersCollapse title="Price">
        <FiltersItemsPrice @click="onTogglePrice" />
      </FiltersCollapse>

      <FiltersCollapse title="Brands">
        <FiltersItemsCheckbox
          v-model:clean-all="cleanAll" title="Brand" :items="brandItems"
          @on-toggle-checkbox="onToggleBrand"
        />
      </FiltersCollapse>
      <FiltersCollapse title="Concentrations">
        <FiltersItemsCheckbox
          v-model:clean-all="cleanAll" title="Concentration" :items="concentrationItems"
          @on-toggle-checkbox="onToggleConcentration"
        />
      </FiltersCollapse>
      <FiltersCollapse title="Sizes">
        <FiltersItemsCheckbox
          v-model:clean-all="cleanAll" title="Size" :items="sizeItems"
          @on-toggle-checkbox="onToggleSize"
        />
      </FiltersCollapse>
      <!-- End of Collapsible Widget -->
    </div>
    <!-- End of Sidebar Content -->
  </aside>
  <!-- End of Shop Sidebar -->
</template>

<style scoped lang="scss">
.sidebar {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 31rem;
  flex: 0 0 31rem;
  max-width: 31rem;

  &.active {

    & .sidebar-overlay,
    & .sidebar-close {
      visibility: visible;
      opacity: 0.5;
    }

    & .sidebar-content {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
  }

  &.shop-sidebar {
    position: relative;
  }

  & .sidebar-overlay,
  & .sidebar-toggle,
  & .sidebar-content,
  & .sidebar-close {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1052;
  }

  & .sidebar-overlay {
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    opacity: 0;
    visibility: hidden;
    -webkit-transition: visibility 0.4s, opacity 0.4s;
    transition: visibility 0.4s, opacity 0.4s;
  }

  & .sidebar-close {
    opacity: 0;
    visibility: hidden;
    margin: 0;
    left: calc(100vw - 60px);
    top: 25px;
    z-index: 1052;
    -webkit-transition: opacity 0.4s, visibility 0.4s;
    transition: opacity 0.4s, visibility 0.4s;

    & .close-icon {
      display: block;
      position: relative;
      width: 30px;
      height: 30px;
      -webkit-transform: rotateZ(45deg);
      transform: rotateZ(45deg);
    }
  }

  & .sidebar-content {
    bottom: 0;
    width: 31rem;
    padding: 2rem;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    overflow: auto;
    background-color: #fff;
    opacity: 0;
    line-height: 1.3;
    -webkit-transition: opacity 0.4s, -webkit-transform 0.4s;
    transition: opacity 0.4s, -webkit-transform 0.4s;
    transition: transform 0.4s, opacity 0.4s;
    transition: transform 0.4s, opacity 0.4s, -webkit-transform 0.4s;

    & .filter-actions {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      padding: 0.8rem 0 1.7rem;

      & label {
        font-size: 1.6rem;
        font-weight: 600;
        letter-spacing: -0.025em;
        color: #333;
      }

      & .btn-dark.btn-link {
        padding: 0;
        border: 0;
        background: transparent;

        background-color: transparent;
        color: #333;
        border-color: #333;
      }

      & .filter-clean {
        padding-bottom: 0;
        text-transform: capitalize;
        font-size: 1.4rem;
        font-weight: 400;
      }
    }
  }
}

.scrollable {
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: #fff;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.25);
    cursor: pointer;
  }
}
</style>
