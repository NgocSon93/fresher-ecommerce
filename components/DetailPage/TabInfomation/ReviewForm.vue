<script setup lang="ts">
import { toast } from 'vue3-toastify'
import type { Product } from '~/types/products'
import { useAuthStore } from '~/stores/auth.store'

const props = defineProps<{
  productId: Product['id']
}>()

const profileStore = useProfileStore()

const userID = computed(() => profileStore.profile?.id)

const rating = ref(0)
const comment = ref('')

const errors = ref<string[]>([])
const submitReviewLoading = ref<boolean>(false)

async function handleSubmitReview() {
  if (!userID.value) {
    useAuthStore().setIsShowLoginPopup(true)
    return
  }

  errors.value = []

  if (rating.value === 0)
    errors.value.push('Rating is required')

  if (comment.value.trim() === '')
    errors.value.push('Comment is required')

  if (errors.value.length > 0) {
    toast.error('Please fill in all required fields')
  }
  else {
    const review = {
      rating: rating.value,
      comment: comment.value,
      productId: props.productId,
    }

    submitReviewLoading.value = true

    const { error } = await useCustomFetch('/reviews/product', {
      method: 'POST',
      body: review,
    })

    if (error.value) {
      errors.value = Object.values(JSON.parse(error.value.message)).flat() as string[]
      submitReviewLoading.value = false
      return
    }

    toast.success('Review submitted successfully')

    submitReviewLoading.value = false

    rating.value = 0
    comment.value = ''

    await refreshNuxtData()
  }
}
</script>

<template>
  <div class="review-form-wrapper">
    <h3 class="title tab-pane-title font-weight-bold mb-1">
      Submit Your
      Review
    </h3>
    <p class="mb-3">
      Your email address will not be published. Required
      fields are marked *
    </p>
    <form action="" method="POST" class="review-form">
      <div class="rating-form">
        <label for="rating">Your Rating Of This Product :</label>
        <span class="rating-stars">
          <NuxtLink
            v-for="i in 5" :key="i"
            :class="`star-${i} cursor-pointer ${rating === i ? 'active' : ''}`"
            @click="rating = i"
          >1</NuxtLink>
        </span>
      </div>
      <textarea
        id="review"
        v-model="comment" cols="30"
        rows="6" placeholder="Write Your Review Here..."
        class="form-control"
      />

      <template v-if="errors">
        <ul class=" mb-3">
          <li
            v-for="error in errors" :key="error"
            class="text-red-500 mb-1"
          >
            {{ error }}
          </li>
        </ul>
      </template>
      <BaseButtonLoading :is-loading="submitReviewLoading" class="w-[207px]">
        <button class="btn btn-dark" @click.prevent="handleSubmitReview">
          Submit Review
        </button>
      </BaseButtonLoading>
    </form>
  </div>
</template>
