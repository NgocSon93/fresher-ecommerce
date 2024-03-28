<script setup lang="ts">
const features = [
  {
    name: 'Free Shipping & Returns',
    description: 'For all orders over $99',
    icon: 'icomoon-free:truck',
  },
  {
    name: 'Secure Payment',
    description: 'We ensure secure payment',
    icon: 'fluent:payment-48-filled',
  },
  {
    name: 'Money Back Guarantee',
    description: 'Any back within 30 days',
    icon: 'i-fa6-solid-money-bill-transfer',
  },
  {
    name: 'Customer Support',
    description: 'Call or email us 24/7',
    icon: 'i-material-symbols-android-chat',
  },
]
</script>

<template>
  <div class="container my-9">
    <div class="px-12 py-7 border border-secondary-100">
      <div class="flex items-center justify-between">
        <div
          v-for="feature in features" :key="feature.name"
          class="flex items-center"
        >
          <Icon :name="feature.icon" size="2.5rem" class="text-primary mr-4" />
          <div>
            <div class="font-bold text-[17.5px]">
              {{ feature.name }}
            </div>
            <div class="text-secondary-500">
              {{ feature.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
