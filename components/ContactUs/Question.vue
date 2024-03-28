<script setup>
const commonStore = useCommonStore()

const listquestions = ref()

async function getListQuestions() {
  commonStore.setIsLoading(true)
  const { data } = await useCustomFetch(`questions`)
  if (data.value) {
    listquestions.value = data.value.data.map((question, index) => {
      if (index === 0)
        question.isOpen = true
      else
        question.isOpen = false

      return question
    })
  }
  console.log(listquestions.value)
  commonStore.setIsLoading(false)
}
getListQuestions()

function toggleAccordion(index) {
  listquestions.value.forEach((question, i) => {
    if (i === index)
      question.isOpen = !question.isOpen
    else
      question.isOpen = false
  })
}
</script>

<template>
  <div class="col-lg-6 mb-8">
    <h4 class="title mb-2">
      People usually ask these
    </h4>
    <div
      v-for="(question, index) in listquestions" :key="question.id"
      class="question question-bg question-gutter-md question-border"
    >
      <div class="card mb-2" @click="toggleAccordion(index)">
        <div class="card-header">
          <NuxtLink :class="{ isactive: question.isOpen }">
            {{ question.name }}
          </NuxtLink>
          <Icon name="ic:twotone-keyboard-arrow-up" />
        </div>
        <div v-if="question.isOpen" id="collapse1" class="card-body expanded">
          <p class="mb-0">
            {{ question.content }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.question {
  overflow: hidden;
}

.card-header {
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1.5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  &:hover {
    color: #336699;
    cursor: pointer;
  }
}

.card-header a {
  padding-top: 1.5rem;
}

.question-bg .card-header a {
  background-color: #f5f5f5;
}

.card-header a {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: relative;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  color: inherit;
  padding: 1.4rem 5rem 1.4rem 2rem;
  -webkit-transition: background-color 0.4s;
  transition: background-color 0.4s;
}

.question-border .card-body {
  border: 1px solid #eee;
  border-top: 0;
}

.card-body {
  padding: 1.2rem 2rem;
}

.card-body p {
  font-size: 1.3rem;
  line-height: 2;
}

.mb-0 {
  margin-bottom: 0rem !important;
}
svg {
  font-size: 2rem;
  margin-right: 2rem;
}
.isactive {
  color: #336699 !important;
}
</style>
