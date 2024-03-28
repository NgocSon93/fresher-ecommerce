<script setup lang="ts">
interface PaginationsProps {
  total: number
  pageSize: number
  currentPage: number
  isShowDetail?: boolean
}
interface PaginationsEmits { (e: 'onPageChange', page: number): void }
const props = defineProps<PaginationsProps>()
const emits = defineEmits<PaginationsEmits>()

const pageLength = 5
const pageNumber = computed<number>(() => props.currentPage)
const totalPages = computed<number>(() => Math.ceil(props.total / props.pageSize))
const pageStart = computed<number>(() => (pageNumber.value - 1) * props.pageSize + 1 || 0)
const pageEnd = computed<number>(() => (pageNumber.value * props.pageSize < props.total) ? pageNumber.value * props.pageSize : props.total)
const pagesArray = computed<number[]>(() => {
  if (totalPages.value <= pageLength)
    return Array.from({ length: totalPages.value }, (_v, i) => i + 1)
  else if (pageNumber.value <= (pageLength + 1) / 2)
    return Array.from({ length: pageLength }, (_v, i) => i + 1)
  else if (pageNumber.value >= totalPages.value - (pageLength / 2))
    return Array.from({ length: pageLength }, (_v, i) => totalPages.value - pageLength + i + 1)
  else
    return Array.from({ length: pageLength }, (_v, i) => pageNumber.value - Math.ceil(pageLength / 2) + i + 1)
})

function onTogglePrev() {
  if (pageNumber.value > 1)
    emits('onPageChange', pageNumber.value - 1)
}
function onTogglePage(page: number) {
  if (pageNumber.value >= 1 && pageNumber.value <= totalPages.value)
    emits('onPageChange', page)
}
function onToggleNext() {
  if (pageNumber.value < totalPages.value)
    emits('onPageChange', pageNumber.value + 1)
}
</script>

<template>
  <!-- Start of Pagination -->
  <div class="toolbox-pagination" :class="props.isShowDetail ? 'justify-between' : 'justify-center'">
    <p v-if="props.isShowDetail" class="showing-info mb-sm-4 mb-0">
      Showing<span>{{ `${pageStart}-${pageEnd} of ${total}` }}</span>Products
    </p>
    <ul class="pagination">
      <li class="prev" :class="{ disabled: pageNumber <= 1 }">
        <button aria-label="Previous" tabindex="-1" aria-disabled="true" @click="onTogglePrev">
          <Icon name="icon-park:arrow-left" class="custom-icon" />Prev
        </button>
      </li>
      <li v-for="(page, index) in pagesArray" :key="index" class="page-item" :class="{ active: page === pageNumber }">
        <button class="page-link" @click="onTogglePage(Number(page))">
          {{ page }}
        </button>
      </li>
      <li class="next" :class="{ disabled: pageNumber >= totalPages }">
        <button aria-label="Next" @click="onToggleNext">
          Next
          <Icon name="icon-park:arrow-right" class="custom-icon" />
        </button>
      </li>
    </ul>
  </div>
  <!-- End of Pagination -->
</template>

<style scoped lang="scss">
.toolbox-pagination {
  padding: 2.5rem 0;
  border-top: 1px solid #f4f4f4;

  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;

  & .showing-info {
    font-size: 1.3rem;
    line-height: 1.86;
    color: #aaa;

    & span {
      margin: 0 0.9rem;
      color: #333;
    }
  }

  & .pagination {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    text-align: center;
    font-size: 1.4rem;
    color: #666;
    letter-spacing: 0.025em;

    & .prev,
    & .next {
      height: 4rem;
      min-width: 8rem;
      padding: 1.2rem;
      line-height: 1;
      text-align: center;
      letter-spacing: 0;

      &.disabled {
        color: #aaa;
        pointer-events: none;
      }

      &:hover:not(.disabled) {
        background-color: transparent;
        border-color: #eee;
        color: #336699;
        border-radius: 0.3rem;
      }
    }

    & .prev {
      margin-right: 0.5rem;

      & .custom-icon {
        margin-right: 0.5rem;
      }
    }

    & .next {
      & .custom-icon {
        margin-left: 0.5rem;
      }
    }

    & .page-item:not(:last-child) {
      margin-right: 0.5rem;
    }

    & .page-item {
      & .page-link {
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        min-width: 3rem;
        height: 4rem;
        background-color: transparent;
        border: 1px solid transparent;
        -webkit-transition: background-color 0.4s, border 0.4s, color 0.4s;
        transition: background-color 0.4s, border 0.4s, color 0.4s;
        line-height: 1;
      }

      &:hover:not(.disabled)>.page-link,
      &.active:not(.disabled)>.page-link {
        background-color: transparent;
        border-color: #eee;
        color: #336699;
        border-radius: 0.3rem;
      }
    }
  }
}
</style>
