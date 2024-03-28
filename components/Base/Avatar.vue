<script setup lang="ts">
import VueAvatar from '@webzlodimir/vue-avatar'
import '@webzlodimir/vue-avatar/dist/style.css'

interface AvatarProps { size?: number; name: string; path?: string }
const props = defineProps<AvatarProps>()

const avatarElement = ref<HTMLElement | null>(null)
const { width: avatarWidth } = useElementBounding(avatarElement)
const path = computed(() => props.path ?? '')
const username = computed(() => capitalizeFirstLetter(props.name))
const size = computed(() => props.size ?? avatarWidth.value)

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
</script>

<template>
  <div ref="avatarElement" class="avatar-wrapper">
    <NuxtImg
      v-if="path" :src="path" alt="Avatar" class="relative rounded-full"
      :style="{ width: `${size}px`, height: `${size}px` }"
    />
    <VueAvatar v-else :size="size" :username="username" />
  </div>
</template>
