<script setup lang="ts">
import { ValidateHelper } from '~/utils/validate.helper'

const authStore = useAuthStore()
const commonStore = useCommonStore()

const isSendEmail = ref(false)
const isResendEmail = ref(true)
const seconds = ref(0)

const data = reactive({
  email: '',
  sentEmail: '',
  otp: '',
  password: '',
  confirmPassword: '',
})
const message = reactive({
  success: '',
  error: '',
  errorEmail: '',
  errorOtp: '',
  errorPassword: '',
  errorConfirmPassword: '',
})

function countdown() {
  seconds.value = 30

  const timer = setInterval(() => {
    seconds.value--
    if (seconds.value <= 0) {
      seconds.value = 0
      clearInterval(timer)
    }
  }, 1000)
}
function onFocusEmail() {
  message.errorEmail = ''
}
function onFocusPassword() {
  message.errorPassword = ''
}
function onFocusOtp() {
  message.errorEmail = ''
}
function onFocusConfirmPassword() {
  message.errorConfirmPassword = ''
}
function onChangeEmail() {
  if (isSendEmail.value && data.sentEmail !== data.email) {
    isResendEmail.value = true
    setTimeout(() => {
      isSendEmail.value = false
    }, 490)

    const temp = data.email
    clearContent()
    data.email = temp
  }
}

async function onClickResendEmail() {
  clearError()
  let isSuccess: boolean = true

  if (!data.email) {
    message.errorEmail = 'Email cannot be blank'
    isSuccess = false
  }
  else if (!ValidateHelper.isValidEmail(data.email)) {
    message.errorEmail = 'Invalid email'
    isSuccess = false
  }
  if (isSuccess) {
    commonStore.setIsLoading(true)
    const res = await authStore.fetchForgotPassword(data.email)
    if (res && res.includes('success')) {
      message.success = 'Email resend successfully'
      countdown()
    }
    else if (res) {
      message.error = res
    }
    commonStore.setIsLoading(false)
  }
}
async function onSubmitForm() {
  clearError()
  let isSuccess: boolean = true

  if (!isSendEmail.value) {
    if (!data.email) {
      message.errorEmail = 'Email cannot be blank'
      isSuccess = false
    }
    else if (!ValidateHelper.isValidEmail(data.email)) {
      message.errorEmail = 'Invalid email'
      isSuccess = false
    }
    if (isSuccess) {
      commonStore.setIsLoading(true)
      data.sentEmail = data.email
      const res = await authStore.fetchForgotPassword(data.sentEmail)
      if (res && res.includes('success')) {
        message.success = res
        isSendEmail.value = true
        isResendEmail.value = false
        countdown()
      }
      else if (res) {
        message.error = res
      }
      commonStore.setIsLoading(false)
    }
  }
  else {
    if (!data.email) {
      message.errorEmail = 'Email cannot be blank'
      isSuccess = false
    }
    else if (!ValidateHelper.isValidEmail(data.email)) {
      message.errorEmail = 'Invalid email'
      isSuccess = false
    }
    if (!data.otp) {
      message.errorOtp = 'OTP cannot be blank'
      isSuccess = false
    }
    if (!data.password) {
      message.errorPassword = 'Password cannot be blank'
      isSuccess = false
    }
    else if (!ValidateHelper.isValidPassword(data.password)) {
      message.errorPassword = 'Password must be at least 8 characters long'
      isSuccess = false
    }
    if (!data.confirmPassword) {
      message.errorConfirmPassword = 'Confirm password cannot be blank'
      isSuccess = false
    }
    else if (!ValidateHelper.isValidPassword(data.confirmPassword)) {
      message.errorConfirmPassword = 'Password must be at least 8 characters long'
      isSuccess = false
    }
    if (data.password !== data.confirmPassword) {
      message.errorConfirmPassword = 'The confirm password must match the password'
      isSuccess = false
    }
    if (isSuccess) {
      commonStore.setIsLoading(true)
      logContent()
      const res = await authStore.fetchResetPassword(
        data.sentEmail,
        data.otp,
        data.password,
      )
      if (res && res.includes('success'))
        message.success = res
      else if (res)
        message.error = res
      commonStore.setIsLoading(false)
    }
  }
}
function clearError() {
  message.success = ''
  message.error = ''
  message.errorEmail = ''
  message.errorOtp = ''
  message.errorPassword = ''
  message.errorConfirmPassword = ''
}
function clearContent() {
  data.email = ''
  data.sentEmail = ''
  data.otp = ''
  data.password = ''
  data.confirmPassword = ''
}
function logContent() {
  console.log(data)
}
</script>

<template>
  <!-- Start of Forgot password popup -->
  <div class="forgot-popup">
    <div class="tab-nav-center tab-nav-underline">
      <ul class="nav nav-tabs text-uppercase" role="tablist">
        <li class="nav-item">
          <NuxtLink to="/login" class="nav-link">
            Sign In
          </NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink to="/register" class="nav-link">
            Sign Up
          </NuxtLink>
        </li>
      </ul>
      <div class="tab-content">
        <form id="forgot-password" class="tab-pane active">
          <div v-if="message.success" class="success-message">
            {{ message.success }}
          </div>
          <div v-if="message.error" class="error-message">
            {{ message.error }}
          </div>
          <div class="form-group">
            <label>Email address *</label>
            <div class="flex gap-4">
              <input
                id="email"
                v-model="data.email"
                type="text"
                class="form-control"
                name="email"
                @focus="onFocusEmail"
                @input="onChangeEmail"
              >
              <button
                v-if="!isResendEmail"
                class="btn btn-primary btn-resend w-auto"
                :disabled="seconds > 0"
                @click.prevent="onClickResendEmail"
                v-text="seconds ? seconds : 'Resend'"
              />
            </div>
            <div v-if="message.errorEmail" class="error-message">
              {{ message.errorEmail }}
            </div>
          </div>
          <div
            v-if="isSendEmail"
            class="tab-reset"
            :class="{ active: !isResendEmail }"
          >
            <div class="form-group">
              <label>Otp *</label>
              <input
                id="otp"
                v-model="data.otp"
                type="text"
                class="form-control"
                name="otp"
                @focus="onFocusOtp"
              >
              <div v-if="message.errorOtp" class="error-message">
                {{ message.errorOtp }}
              </div>
            </div>
            <div class="form-group">
              <label>Password *</label>
              <input
                id="password"
                v-model="data.password"
                type="password"
                class="form-control"
                name="password"
                @focus="onFocusPassword"
              >
              <div v-if="message.errorPassword" class="error-message">
                {{ message.errorPassword }}
              </div>
            </div>
            <div class="form-group">
              <label>Confirm Password *</label>
              <input
                id="confirm-password"
                v-model="data.confirmPassword"
                type="password"
                class="form-control"
                name="confirm-password"
                @focus="onFocusConfirmPassword"
              >
              <div v-if="message.errorConfirmPassword" class="error-message">
                {{ message.errorConfirmPassword }}
              </div>
            </div>
          </div>
          <button
            type="submit"
            class="btn btn-primary w-full"
            @click.prevent="onSubmitForm"
            v-text="isSendEmail ? 'Reset password' : 'Send email'"
          />
        </form>
      </div>
      <!-- <AuthSocialSignin /> -->
    </div>
  </div>
  <!-- End of Forgot password popup -->
</template>

<style scoped lang="scss">
.forgot-popup {
  margin: 4.2rem auto 5rem;
  -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  max-width: 50rem;
  padding: 3.3rem 5rem 2.6rem;

  & .tab-nav-center {
    & .nav {
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
    }

    & .nav-tabs {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      border-bottom: 1px solid #eee;
      color: #333;

      & .nav-item {
        width: calc(50% - 0.5rem);
        margin: 0;
        margin-right: 0px;
        cursor: pointer;

        &:first-child {
          margin-right: 1rem;
        }

        &.show .nav-link,
        & .nav-link.active,
        &:hover .nav-link {
          color: #336699;

          &::after {
            border-color: #336699;
            -webkit-transform: scaleX(1);
            transform: scaleX(1);
          }
        }

        & .nav-link {
          display: block;
          position: relative;
          font-size: 1.4rem;
          font-weight: 600;
          color: inherit;
          line-height: 1;
          letter-spacing: 0;
          text-align: center;
          text-transform: uppercase;
          border-radius: 0;
          border: 0;
          padding: 1.5rem 2.85rem;
          -webkit-transition: border 0.3s, color 0.3s, background-color 0.3s;
          transition: border 0.3s, color 0.3s, background-color 0.3s;

          padding: 1.3rem 0;
          font-size: 1.6rem;
          font-weight: 700;

          &::after {
            content: "";
            display: block;
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            border-top: 3px solid transparent;
            border-top-width: 3px;
            border-top-color: transparent;
            -webkit-transform: scaleX(0);
            transform: scaleX(0);
            -webkit-transition: border-color 0.3s, -webkit-transform 0.3s;
            transition: border-color 0.3s, -webkit-transform 0.3s;
            transition: transform 0.3s, border-color 0.3s;
            transition: transform 0.3s, border-color 0.3s,
              -webkit-transform 0.3s;
          }
        }
      }
    }

    & .text-uppercase {
      text-transform: uppercase !important;
    }

    .tab-content {
      position: relative;
      background-color: #fff;

      & .tab-pane {
        font-size: 1.3rem;
        line-height: 1.7;
        padding: 1.3rem 0;
        color: #666;
      }

      & .tab-pane {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        height: 0;
        opacity: 0;
        z-index: -1;
        -webkit-transition: visibility 0.3s, opacity 0.3s;
        transition: visibility 0.3s, opacity 0.3s;
        overflow: hidden;
        visibility: hidden;

        padding-top: 3.3rem;
        padding-bottom: 2.6rem;

        &.active {
          visibility: visible;
          opacity: 1;
          height: auto;
          position: relative;
          z-index: auto;
        }

        & .tab-reset {
          height: 0;
          opacity: 1;
          overflow: hidden;
          animation: collapsing 0.5s;

          &.active {
            height: auto;
            animation: expanding 0.5s;
          }
        }

        & .form-group {
          margin-bottom: 2.6rem;

          & label {
            display: block;
            margin-bottom: 0.5rem;
          }

          & .form-control {
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

            min-height: 4.4rem;
          }
        }

        & .form-checkbox-custom {
          margin-top: 2.2rem;
          margin-bottom: 2.3rem;

          & .custom-checkbox {
            position: absolute;
            opacity: 0;
            z-index: 1;
            width: 1.8rem;
            height: 1.8rem;
            cursor: pointer;

            &:checked + label::before,
            &.checked + label::before {
              content: url(~/assets/svg/check.svg);
              border-color: #222;
              background: #222;
              color: #fff;
              font-size: 9px;
              font-weight: 600;
              font-family: "Font Awesome 5 Free";
              text-align: center;
            }
          }

          & .custom-checkbox + label {
            display: inline-block;
            position: relative;
            padding-left: 2.5rem;
            cursor: pointer;
          }

          & .custom-checkbox + label::before {
            content: "";
            position: absolute;
            top: 50%;
            -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
            left: 0;
            width: 18px;
            height: 18px;
            line-height: 15px;
            border: 1px solid #ccc;
            border-radius: 2px;
          }

          & .checkbox-round + label::before {
            border-radius: 50%;
            border: 1px solid #ccc;
            background: transparent;
          }

          & .checkbox-round + label::after {
            content: "";
            width: 8px;
            height: 8px;
            background-color: #333;
            position: absolute;
            border-radius: 50%;
            top: 50%;
            -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
            left: 5px;
            opacity: 0;
          }

          & .checkbox-round.active + label::after {
            opacity: 1;
          }

          & .checkbox-round.active:checked + label::before,
          & .checkbox-round.active.checked + label::before {
            border-color: #ccc;
            background: #fff;
          }
        }

        & .success-message {
          color: green;
          margin-top: 0.5rem;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        & .error-message {
          color: red;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
      }

      & .btn-resend {
        min-width: 75px;
        padding: 0 1rem;

        &:disabled {
          pointer-events: none;
        }
      }

      & p {
        margin-bottom: 2.1rem;
        line-height: 1.84;
      }

      & .text-primary {
        color: #336699 !important;
      }
    }
  }
}

@keyframes expanding {
  0% {
    height: 0;
    opacity: 0.1;
  }

  100% {
    height: 291px;
    opacity: 1;
  }
}

@keyframes collapsing {
  0% {
    height: 291px;
    opacity: 1;
  }

  100% {
    height: 0;
    opacity: 0.1;
  }
}
</style>
