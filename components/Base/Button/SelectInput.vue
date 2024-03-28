<script setup lang="ts">
interface InputType { id: number; name: string; value: any }
interface SelectInputProps {
  name?: string
  activeItem: any
  items: InputType[]
  label?: string
}
interface SelectInputEmits {
  (e: 'update:activeItem', value: any): void
  (e: 'onChange'): void
}
const props = defineProps<SelectInputProps>()
const emits = defineEmits<SelectInputEmits>()

const activeItem = ref(props.activeItem)

watch(() => activeItem.value, (newVal) => {
  emits('update:activeItem', newVal)
  emits('onChange')
})
</script>

<template>
  <div class="toolbox-item toolbox-sort select-box">
    <Icon name="uiw:down" class="custom-icon down-icon" />
    <label v-if="props.label">{{ props.label }}</label>
    <select v-model="activeItem" :name="props.name" class="form-control" :class="{ 'full-width': !props.label }">
      <option v-for="item in props.items" :key="item.id" :value="item.value" :selected="props.activeItem === item.value">
        {{ item.name }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss">
.toolbox-item {
  @apply relative flex flex-wrap items-center text-secondary mb-4;

  &.select-box::before {
    @apply text-[1.1rem] right-4 mt-[0.1rem];
  }

  & .down-icon {
    @apply absolute right-4 top-1/2 -translate-y-1/2 text-[1.1rem] mt-[0.1rem];
  }

  & label {
    @apply text-[1.4rem] font-semibold leading-normal mr-4;
  }

  & .form-control {
    @apply relative block h-full w-auto max-w-none shadow-none outline-0 appearance-none py-[0.75em] pr-[2.7rem] pl-[1.4rem] cursor-pointer;
    @apply bg-transparent text-inherit text-[1.2rem] font-normal leading-normal z-[1] border-[1px] border-solid border-[#d7d7d7] rounded-[0.3rem];

    &.full-width{
      @apply w-full max-w-full;
    }

    & option {
      @apply text-[1.2rem];
    }
  }
}
</style>
