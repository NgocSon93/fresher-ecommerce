<script setup lang="ts">
const props = defineProps(['isConfirm'])
</script>

<template>
  <div v-if="props.isConfirm" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-40 transition-opacity" />
    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          class="relative  transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl "
          @click.stop
        >
          <div class="bg-white pb-4 pt-4 sm:p-6 sm:pb-4">
            <div class=" sm:flex sm:items-start">
              <div
                class=" flex h-12 w-12 mr-3 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 icon-box icon-box-side icon-box-light"
              >
                <svg
                  class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" aria-hidden="true"
                >
                  <path
                    stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <slot name="content" />
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <slot name="button" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.icon-box-light {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
}

.icon-box-side {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}
.icon-box-side .icon-box-content {
    text-align: start;
}
.icon-box-light .icon-box-title {
    font-size: 2rem;
}

.icon-box .icon-box-title {
    font-size: 1.4rem;
    text-transform: capitalize;
    letter-spacing: -0.025em;
    margin-bottom: 0.4rem;
}
</style>
