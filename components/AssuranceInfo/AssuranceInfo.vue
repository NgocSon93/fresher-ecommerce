<script setup lang="ts">
withDefaults(defineProps<{
  direction?: 'horizontal' | 'vertical'
}>(), {
  direction: 'horizontal',
})

const features = [
  {
    name: 'Free shipping',
    description: 'Free shipping on all orders',
    icon: 'w-icon-truck',
  },
  {
    name: 'Secure payment',
    description: 'We ensure secure payment',
    icon: 'w-icon-bag',
  },
  {
    name: 'Money back guarantee',
    description: '30 days money back guarantee',
    icon: 'w-icon-money',
  },
  {
    name: '24/7 support',
    description: '24/7 support',
    icon: 'w-icon-chat',
  },
]
</script>

<template>
  <div
    :class="direction === 'horizontal' ? 'icon-box-wrapper br-sm mt-6 mb-6' : 'widget widget-icon-box mb-6'"
  >
    <div :class="direction === 'horizontal' ? 'row cols-md-4 cols-sm-3 cols-1' : ''">
      <div
        v-for="(feature, index) in features" :key="index"
        class="icon-box icon-box-side"
        :class="direction === 'horizontal' ? 'icon-box-primary' : ''"
      >
        <span
          class="icon-box-icon"
          :class="direction === 'horizontal' ? 'icon-chat' : 'text-dark'"
        >
          <i :class="feature.icon" />
        </span>
        <div class="icon-box-content">
          <h4 class="icon-box-title" :class="direction === 'horizontal' ? 'font-weight-bold mb-1' : ''">
            {{ feature.name }}
          </h4>
          <p :class="direction === 'horizontal' ? 'text-default' : ''">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
