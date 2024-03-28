<script setup lang="ts">
</script>

<template>
  <div class="bg-primary">
    <div class="container py-9">
      <div class="flex items-center justify-between">
        <div class="flex items-center text-white">
          <Icon
            name="i-radix-icons-envelope-closed"
            size="60px"
            class="mr-6"
          />
          <div>
            <h3 class="uppercase font-bold text-xl">
              SUBSCRIBE TO OUR NEWSLETTER
            </h3>
            <p>Get all the latest information on Events, Sales and Offers.</p>
          </div>
        </div>
        <form class="ml-7 text-[1.125rem]">
          <input
            type="text"
            placeholder="Your email address"
            class="py-2.5 px-6 rounded outline-none min-w-[40px]"
          >
          <button
            class="py-2.5 px-8 bg-secondary hover:bg-secondary-800 transition-colors text-white font-semibold rounded ml-3 uppercase"
          >
            <span>Subscribe</span>
            <span>
              <Icon
                name="i-material-symbols-arrow-forward"
                class="ml-2"
              />
            </span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
