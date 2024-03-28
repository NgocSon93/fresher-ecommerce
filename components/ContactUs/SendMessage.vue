<script setup lang="ts">
import { ValidateHelper } from '~/utils/validate.helper'

const commonStore = useCommonStore()

interface message {
  name: string
  email: string
  message: string
}
const messageFeedbacks = reactive<message>({
  name: '',
  email: '',
  message: '',
})
const messageNotifications = reactive({
  success: '',
  name: '',
  email: '',
  message: '',
})

function focusname() {
  messageNotifications.name = ''
  messageNotifications.success = ''
}
function focusemail() {
  messageNotifications.email = ''
  messageNotifications.success = ''
}
function focusmessage() {
  messageNotifications.message = ''
  messageNotifications.success = ''
}
function clearMessage() {
  messageNotifications.success = ''
}

async function sendMessage() {
  clearMessage()
  let isSuccess = true
  if (!messageFeedbacks.name) {
    messageNotifications.name = 'Your name cannot be blank.'
    isSuccess = false
  }
  if (!ValidateHelper.isValidEmail(messageFeedbacks.email)) {
    messageNotifications.email = 'Your email is not valid.'
    isSuccess = false
  }
  if (!messageFeedbacks.message) {
    messageNotifications.message = 'Your message cannot be blank.'
    isSuccess = false
  }
  if (isSuccess) {
    commonStore.setIsLoading(true)
    const { data } = await useCustomFetch(`/feedbacks`, {
      method: 'POST',
      body: {
        name: messageFeedbacks.name,
        email: messageFeedbacks.email,
        message: messageFeedbacks.message,
      },
    })
    if (data.value)
      console.log(data.value)
    messageNotifications.success = 'The message has been sent successfully'

    commonStore.setIsLoading(false)
  }
}
</script>

<template>
  <div class="col-lg-6 mb-8">
    <h4 class="title mb-3">
      Send Us a Message
    </h4>
    <form class="form contact-us-form" action="#" method="post">
      <div class="form-group">
        <label for="username">Your Name</label>
        <input
          id="username" v-model="messageFeedbacks.name" type="text" name="username" class="form-control"
          @focus="focusname"
        >
        <p v-if="messageNotifications.name" class="error">
          {{ messageNotifications.name }}
        </p>
      </div>
      <div class="form-group">
        <label for="email_1">Your Email</label>
        <input
          id="email_1" v-model="messageFeedbacks.email" type="email" name="email_1" class="form-control"
          @focus="focusemail"
        >
        <p v-if="messageNotifications.email" class="error">
          {{ messageNotifications.email }}
        </p>
      </div>
      <div class="form-group">
        <label for="message">Your Message</label>
        <textarea
          id="message" v-model="messageFeedbacks.message" name="message" cols="30" rows="5" class="form-control"
          @focus="focusmessage"
        />
        <p v-if="messageNotifications.message" class="error">
          {{ messageNotifications.message }}
        </p>
        <p v-if="messageNotifications.success" class="success">
          {{ messageNotifications.success }}
        </p>
      </div>
      <button type="button" class="btn mt-1 btn-dark btn-rounded" @click="sendMessage">
        Send Now
      </button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.mb-8 {
  margin-bottom: 4rem !important;
}

.col-lg-6 {
  max-width: 50%;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 50%;
  flex: 0 0 50%;
}

.title {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  position: relative;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: center;
  margin-bottom: 1.7rem;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
}

.mb-3 {
  margin-bottom: 1.5rem !important;
}

form {
  display: block;
  margin-top: 0em;
}

.contact-us-form .form-group label {
  color: #333;
  line-height: 2;
}

.contact-us-form .form-group .form-control {
  margin-bottom: 1.4rem;
  min-height: 4.6rem;
  border-radius: 0.3rem;
}

.form .form-control {
  margin-bottom: 2rem;
}

.form-control {
  display: block;
  width: 100%;
  min-height: 4.7rem;
  padding: 0.85rem 2rem;
  border: 1px solid #eee;
  font-size: 1.4rem;
  font-family: Poppins, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color: #999;
  background-color: transparent;
  border-radius: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
  outline: 0;
}

input,
.btn {
  margin: 0;
}

.error {
  color: red;
  font-size: 1.2rem;
  margin-bottom: 1.3rem;
}
.success {
  margin-top: 2rem;
  text-align: center;
  color: orange;
  font-size: 1.5rem;
}
</style>
