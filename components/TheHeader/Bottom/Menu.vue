<script setup lang="ts">
import type { HierarchicalCategories } from '~/types/categories'
import { useCategoryStore } from '~/stores/categories'
import { getMainImagePath } from '~/utils'
import { getSlugWithId } from '~/utils/slug'

const categories: HierarchicalCategories = useCategoryStore().hierarchicalCategories
const layout = inject('layout') as string
</script>

<template>
  <div
    class="dropdown category-dropdown has-border"
    data-visible="true"
  >
    <NuxtLink
      class="category-toggle" role="button" data-toggle="dropdown"
      :class="layout === 'home' ? 'text-dark' : ''"
      aria-haspopup="true" aria-expanded="true" data-display="static"
      title="Browse Categories"
    >
      <i class="w-icon-category" />
      <span>Browse Categories</span>
    </NuxtLink>

    <div class="dropdown-box">
      <ul class="menu vertical-menu category-menu">
        <li
          v-for="(category, index) in categories" :key="index"
          :class="{ 'has-submenu': category.childs.length > 0 }"
        >
          <NuxtLink
            :to="`/categories/${getSlugWithId(category.id, category.slug)}`"
          >
            {{ category.name }}
          </NuxtLink>
          <template v-if="category.childs.length > 0">
            <ul class="megamenu">
              <li
                v-for="childCategory in category.childs"
                :key="childCategory.id"
                :style="{ minWidth: '200px' }"
              >
                <h4 class="menu-title">
                  {{ childCategory.name }}
                </h4>
                <hr class="divider">
                <ul>
                  <li v-for="grandChildrenCategory in childCategory.childs" :key="grandChildrenCategory.id">
                    <NuxtLink
                      :to="`/categories/${getSlugWithId(grandChildrenCategory.id, grandChildrenCategory.slug)}`"
                    >
                      {{ grandChildrenCategory.name }}
                    </NuxtLink>
                  </li>
                </ul>
              </li>
              <li>
                <div class="banner-fixed menu-banner menu-banner2">
                  <figure>
                    <NuxtImg
                      :src="getMainImagePath(category.images)" alt="Menu Banner"
                      width="235" height="347"
                    />
                  </figure>
                </div>
              </li>
            </ul>
          </template>
        </li>
        <li>
          <NuxtLink
            to="/categories"
            class="font-weight-bold text-primary text-uppercase ls-25"
          >
            View All Categories<i class="w-icon-angle-right" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
