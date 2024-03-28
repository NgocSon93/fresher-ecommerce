<script setup lang="ts">
interface BreadcrumbNav { id?: number; name: string; route?: string }
interface BreadcrumbProps { items: BreadcrumbNav[]; isBorderBottom?: boolean }
const props = defineProps<BreadcrumbProps>()

const commonStore = useCommonStore()

const breadcrumbElement = ref<HTMLElement | null>(null)
const { height: breadcrumbHeight } = useElementBounding(breadcrumbElement)

watchEffect(() => {
  commonStore.setBreadcrumbHeight(breadcrumbHeight.value)
})
</script>

<template>
  <!-- Start of Breadcrumb -->
  <nav ref="breadcrumbElement" class="breadcrumb-nav">
    <div class="container">
      <ul class="breadcrumb" :class="{ 'bb-no': !props.isBorderBottom }">
        <li v-for="(item, index) in props.items" :key="index">
          <NuxtLink :to="item.route" :class="{ disabled: !item.route }">
            {{ item.name }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
  <!-- End of Breadcrumb -->
</template>

<style scoped lang="scss">
.breadcrumb-nav {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

  & .breadcrumb {
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    border-bottom: 1px solid #eeeeee;
    color: #333;
    font-size: 1.3rem;
    line-height: 1.5;
    padding: 1.5rem 0.2rem 1.6rem;

    & li {
      & a {
        text-transform: capitalize;
        color: inherit;

        &.disabled {
          color: #333;
          pointer-events: none;
        }
      }

      &:last-child {
        color: #333;
        pointer-events: none;
      }

      &:not(:last-child) {
        padding-right: 0.25rem;
        -webkit-transition: opacity 0.3s;
        transition: opacity 0.3s;
        opacity: 0.8;

        &:hover {
          opacity: 1;
        }

        &::after {
          content: ">";
          position: relative;
          display: inline-block;
          margin-left: 0.5rem;
          margin-right: 0.5rem;
          font-size: 1.3rem;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
