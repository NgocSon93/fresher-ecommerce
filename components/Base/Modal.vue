<script setup lang="ts">
interface ModalProps { isShow: boolean }
interface ModalEmits { (e: 'update:isShow', value: boolean): void }
const props = defineProps<ModalProps>()
const emits = defineEmits<ModalEmits>()

const modalElement = ref<HTMLElement | null>(null)
const show = ref<boolean>(false)

onBeforeMount(() => {
  show.value = false
  setTimeout(() => {
    show.value = true
  }, 150)

  if (props.isShow) {
    document.body.style.marginRight = '15px'
    document.body.style.overflow = 'hidden'
  }
  else {
    document.body.style.marginRight = ''
    document.body.style.overflow = ''
  }
})

watch(() => props.isShow, (isShow) => {
  show.value = false
  setTimeout(() => {
    show.value = true
  }, 150)

  if (isShow) {
    document.body.style.marginRight = '15px'
    document.body.style.overflow = 'hidden'
  }
  else {
    document.body.style.marginRight = ''
    document.body.style.overflow = ''
  }
})

onClickOutside(modalElement, () => {
  // onClose()
})

function onClose() {
  show.value = false
  setTimeout(() => {
    emits('update:isShow', false)
    show.value = true
  }, 150)
}
</script>

<template>
  <!-- Start of Modal -->
  <div
    v-if="props.isShow" class="modal-wrapper relative"
    aria-labelledby="modal-title" role="dialog" aria-modal="true"
  >
    <div class="modal modal-fade" :class="{ show }" @click="onClose" />
    <div class="modal-container mfp-ajax-holder">
      <div ref="modalElement" class="modal-content" :class="{ show }">
        <div class="content-wrapper scrollable">
          <slot class="slot-content" name="content" />
        </div>
        <button
          title="Close (Esc)" type="button" class="mfp-close"
          @click="onClose"
        />
      </div>
    </div>
  </div>
  <!-- Start of Modal -->
</template>

<style scoped lang="scss">
.modal-wrapper {
  @apply z-[1051];

  .modal {
    @apply fixed top-0 left-0 w-full h-full overflow-hidden;
    @apply bg-black opacity-40 transition-opacity duration-[300ms] ease-out;

    &.modal-fade {
      @apply transition-all duration-[150ms] ease-out opacity-0;

      &.show {
        @apply opacity-40;
      }
    }
  }

  & .modal-container {
    @apply fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center px-8 py-16 box-border;

    &:before {
      content: '';
      @apply inline-block h-full align-middle;
    }

    & .modal-content {
      @apply relative inline-block;
      @apply align-middle text-start mx-auto my-0;
      @apply w-auto cursor-auto transition-all duration-[150ms] ease-out;
      @apply opacity-0;

      &.show {
        @apply opacity-100;
      }

      & .content-wrapper {
        @apply max-w-[90rem] max-h-[80vh] relative block m-auto bg-white;

        &.scrollable {
          @apply overflow-hidden overflow-y-scroll;;
          -webkit-overflow-scrolling: touch;

          &::-webkit-scrollbar {
            @apply w-[5px] cursor-pointer;
            cursor: pointer !important;

            &:hover {
              @apply w-[10px];
            }
          }

          &::-webkit-scrollbar-thumb {
            @apply rounded-[5px] bg-[rgba(0,0,0,0.25)];
          }

          &::-webkit-scrollbar-track {
            @apply bg-[#F5F5F5];
          }
        }
      }
    }
  }
}
</style>
