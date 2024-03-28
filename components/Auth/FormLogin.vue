<script setup lang="ts">
import { ValidateHelper } from '~/utils/validate.helper'

interface FormLoginProps {
  isLogin?: boolean
}
interface FormLoginEmits {
  (e: 'update:isLogin', isLogin: boolean): void
  (e: 'onLoginSucess'): void
  (e: 'onClose'): void
}
const props = defineProps<FormLoginProps>()
const emits = defineEmits<FormLoginEmits>()

const authStore = useAuthStore()
const commonStore = useCommonStore()

const isActiveTab: Ref<boolean> = computed(() => props.isLogin)
const isVendor: Ref<boolean> = ref(false)

const data = reactive({
  username: '',
  password: '',
  fullName: '',
  shopName: '',
  shopUrl: '',
  phoneNumber: '',
  remember: false,
})
const message = reactive({
  success: '',
  error: '',
  errorUsername: '',
  errorPassword: '',
  errorFullName: '',
  errorShopName: '',
  errorShopUrl: '',
  errorPhoneNumber: '',
  errorRemember: '',
})

function onClickSignin() {
  clearContent()
  clearError()
  emits('update:isLogin', true)
}
function onClickSignup() {
  clearContent()
  clearError()
  emits('update:isLogin', false)
}
function onClickCustomer() {
  clearError()
  isVendor.value = false
}
function onClickVendor() {
  clearError()
  isVendor.value = true
}
function onFocusUsername() {
  message.errorUsername = ''
}
function onFocusPassword() {
  message.errorPassword = ''
}
function onFocusFullName() {
  message.errorFullName = ''
}
function onFocusShopName() {
  message.errorShopName = ''
}
function onFocusShopUrl() {
  message.errorShopUrl = ''
}
function onFocusPhoneNumber() {
  message.errorPhoneNumber = ''
}
function onToggleForgotPassword() {
  emits('onClose')
}
function onClickRemember() {
  message.errorRemember = ''
}

async function onSubmitFormLogin() {
  clearError()
  let isSuccess: boolean = true

  if (isActiveTab.value) {
    if (!data.username) {
      message.errorUsername = 'Username or email cannot be blank'
      isSuccess = false
    }
    else if (!ValidateHelper.isValidEmail(data.username)) {
      message.errorUsername = 'Invalid username or email'
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
    if (isSuccess) {
      commonStore.setIsLoading(true)
      const res = await authStore.fetchLogin(data.username, data.password)
      if (res && res.includes('success')) {
        message.success = res
        emits('onLoginSucess')
      }
      else if (res) {
        message.error = res
      }

      commonStore.setIsLoading(false)
    }
  }
}
async function onSubmitFormRegister() {
  clearError()
  let isSuccess: boolean = true

  if (!isActiveTab.value) {
    if (isVendor.value) {
      if (!data.username) {
        message.errorUsername = 'Username or email cannot be blank'
        isSuccess = false
      }
      else if (!ValidateHelper.isValidEmail(data.username)) {
        message.errorUsername = 'Invalid username or email'
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
      if (!data.fullName) {
        message.errorFullName = 'Full name cannot be blank'
        isSuccess = false
      }
      if (!data.shopName) {
        message.errorShopName = 'Shop name cannot be blank'
        isSuccess = false
      }
      if (!data.shopUrl) {
        message.errorShopUrl = 'Shop url cannot be blank'
        isSuccess = false
      }
      else if (!ValidateHelper.isValidUrl(data.shopUrl)) {
        message.errorShopUrl = 'Shop url is incorrect'
        isSuccess = false
      }
      if (!data.phoneNumber) {
        message.errorPhoneNumber = 'Phone number cannot be blank'
        isSuccess = false
      }
      else if (!ValidateHelper.isValidPhoneNumber(data.phoneNumber)) {
        message.errorPhoneNumber = 'Phone number is incorrect'
        isSuccess = false
      }
      if (!data.remember) {
        message.errorRemember = 'You must read privacy policy'
        isSuccess = false
      }
      if (isSuccess)
        logContent()
    }
    else {
      if (!data.username) {
        message.errorUsername = 'Username or email cannot be blank'
        isSuccess = false
      }
      else if (!ValidateHelper.isValidEmail(data.username)) {
        message.errorUsername = 'Invalid username or email'
        isSuccess = false
      }
      if (!data.fullName) {
        message.errorFullName = 'Full name cannot be blank'
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
      if (!data.remember) {
        message.errorRemember = 'You must read privacy policy'
        isSuccess = false
      }
      if (isSuccess) {
        commonStore.setIsLoading(true)
        const res = await authStore.fetchRegister(data.username, data.fullName, data.password)
        if (res && res.includes('success')) {
          message.success = res
          emits('onLoginSucess')
        }
        else if (res) {
          message.error = res
        }

        commonStore.setIsLoading(false)
      }
    }
  }
}
function clearError() {
  message.success = ''
  message.error = ''
  message.errorUsername = ''
  message.errorPassword = ''
  message.errorFullName = ''
  message.errorShopName = ''
  message.errorShopUrl = ''
  message.errorPhoneNumber = ''
  message.errorRemember = ''
}
function clearContent() {
  data.username = ''
  data.password = ''
  data.fullName = ''
  data.shopName = ''
  data.shopUrl = ''
  data.phoneNumber = ''
  data.remember = false
}
function logContent() {
  console.log(data)
}
</script>

<template>
  <!-- Start of Sign up popup -->
  <div class="login-popup-wrapper">
    <div class="tab-nav-center tab-nav-underline">
      <ul class="nav nav-tabs text-uppercase" role="tablist">
        <li class="nav-item">
          <div
            class="nav-link"
            :class="{ active: isActiveTab }"
            @click="onClickSignin"
          >
            Sign In
          </div>
        </li>
        <li class="nav-item">
          <div
            class="nav-link"
            :class="{ active: !isActiveTab }"
            @click="onClickSignup"
          >
            Sign Up
          </div>
        </li>
      </ul>
      <div class="tab-content">
        <form
          v-if="isActiveTab"
          id="sign-in"
          class="tab-pane active"
          @submit.prevent="onSubmitFormLogin"
        >
          <div v-if="message.success" class="success-message">
            {{ message.success }}
          </div>
          <div v-if="message.error" class="error-message">
            {{ message.error }}
          </div>
          <div class="form-group">
            <label>Username or email address *</label>
            <input
              id="username"
              v-model="data.username"
              type="text"
              class="form-control"
              name="username"
              required
              @focus="onFocusUsername"
            >
            <div v-if="message.errorUsername" class="error-message">
              {{ message.errorUsername }}
            </div>
          </div>
          <div class="form-group mb-0">
            <label>Password *</label>
            <input
              id="password"
              v-model="data.password"
              type="password"
              class="form-control"
              name="password"
              required
              @focus="onFocusPassword"
            >
            <div v-if="message.errorPassword" class="error-message">
              {{ message.errorPassword }}
            </div>
          </div>
          <div class="form-checkbox-custom flex items-center justify-between">
            <input
              id="remember1"
              v-model="data.remember"
              type="checkbox"
              class="custom-checkbox"
              name="remember1"
            >
            <label for="remember1">Remember me</label>
            <NuxtLink to="/forgotpassword" @click="onToggleForgotPassword">
              Last your password?
            </NuxtLink>
          </div>
          <button type="submit" class="btn btn-primary">
            Sign In
          </button>
        </form>
        <form
          v-else
          id="sign-up"
          class="tab-pane active"
          @submit.prevent="onSubmitFormRegister"
        >
          <div v-if="message.success" class="success-message">
            {{ message.success }}
          </div>
          <div v-if="message.error" class="error-message">
            {{ message.error }}
          </div>
          <div class="form-group">
            <label>Your email address *</label>
            <input
              id="email_1"
              v-model="data.username"
              type="text"
              class="form-control"
              name="email_1"
              required
              @focus="onFocusUsername"
            >
            <div v-if="message.errorUsername" class="error-message">
              {{ message.errorUsername }}
            </div>
          </div>
          <div class="form-group mb-5">
            <label>Full Name *</label>
            <input
              id="full-name"
              v-model="data.fullName"
              type="text"
              class="form-control"
              name="full-name"
              required
              @focus="onFocusFullName"
            >
            <div v-if="message.errorFullName" class="error-message">
              {{ message.errorFullName }}
            </div>
          </div>
          <div class="form-group mb-5">
            <label>Password *</label>
            <input
              id="password_1"
              v-model="data.password"
              type="password"
              class="form-control"
              name="password_1"
              required
              @focus="onFocusPassword"
            >
            <div v-if="message.errorPassword" class="error-message">
              {{ message.errorPassword }}
            </div>
          </div>
          <div v-if="isVendor" class="checkbox-content login-vendor">
            <div class="form-group mb-5">
              <label>Shop Name *</label>
              <input
                id="shop-name"
                v-model="data.shopName"
                type="text"
                class="form-control"
                name="shop-name"
                required
                @focus="onFocusShopName"
              >
              <div v-if="message.errorShopName" class="error-message">
                {{ message.errorShopName }}
              </div>
            </div>
            <div class="form-group mb-5">
              <label>Shop URL *</label>
              <input
                id="shop-url"
                v-model="data.shopUrl"
                type="text"
                class="form-control"
                name="shop-url"
                required
                @focus="onFocusShopUrl"
              >
              <small>https://store.com/</small>
              <div v-if="message.errorShopUrl" class="error-message">
                {{ message.errorShopUrl }}
              </div>
            </div>
            <div class="form-group mb-5">
              <label>Phone Number *</label>
              <input
                id="phone-number"
                v-model="data.phoneNumber"
                type="text"
                class="form-control"
                name="phone-number"
                required
                @focus="onFocusPhoneNumber"
              >
              <div v-if="message.errorPhoneNumber" class="error-message">
                {{ message.errorPhoneNumber }}
              </div>
            </div>
          </div>
          <div class="form-checkbox-custom mt-0">
            <div class="checkbox-group hidden">
              <input
                id="check-customer"
                type="checkbox"
                class="custom-checkbox checkbox-round"
                :class="{ active: !isVendor }"
                name="check-customer"
                :checked="!isVendor"
                @click="onClickCustomer"
              >
              <label for="check-customer" class="check-customer mb-1">I am a customer</label>
            </div>
            <br class="hidden">
            <div class="checkbox-group hidden">
              <input
                id="check-seller"
                type="checkbox"
                class="custom-checkbox checkbox-round"
                :class="{ active: isVendor }"
                name="check-seller"
                :checked="isVendor"
                @click="onClickVendor"
              >
              <label for="check-seller" class="check-seller">I am a vendor</label>
            </div>
          </div>
          <template v-if="false">
            <p>
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our
              <NuxtLink to="#" class="text-primary">
                privacy policy
              </NuxtLink>.
            </p>
            <NuxtLink to="#" class="d-block mb-5 text-primary hidden">
              Signup as a vendor?
            </NuxtLink>
          </template>
          <div class="form-checkbox-custom mb-5">
            <div class="d-flex align-items-center justify-content-between">
              <input
                id="remember"
                v-model="data.remember"
                type="checkbox"
                class="custom-checkbox"
                name="remember"
                @click="onClickRemember"
              >
              <label for="remember" class="font-size-md">I agree to the
                <NuxtLink to="#" class="text-primary font-size-md">privacy policy</NuxtLink>
              </label>
            </div>
            <div v-if="message.errorRemember" class="error-message">
              {{ message.errorRemember }}
            </div>
          </div>
          <button type="submit" class="btn btn-primary">
            Sign Up
          </button>
        </form>
      </div>
      <!-- <AuthSocialSignin /> -->
    </div>
  </div>
  <!-- End of Sign up popup -->
</template>

<style scoped lang="scss">
.login-popup-wrapper {
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

        & p {
          margin-bottom: 0;
          font-size: inherit;
          letter-spacing: 0;
          line-height: 2;
        }

        &.active {
          visibility: visible;
          opacity: 1;
          height: auto;
          position: relative;
          z-index: auto;
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

          & a {
            font-size: 1.2rem;
            color: #a94442;
          }

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

        & input,
        & .btn {
          margin: 0;
          width: 100%;
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

      .btn {
        display: inline-block;
        border: 2px solid #ccc;
        border-top-color: rgb(204, 204, 204);
        border-right-color: rgb(204, 204, 204);
        border-bottom-color: rgb(204, 204, 204);
        border-left-color: rgb(204, 204, 204);
        background-color: #fff;
        color: #666;
        outline: 0;
        border-radius: 0;
        font-family: inherit;
        font-weight: 600;
        font-size: 1.4rem;
        padding: 0.93em 1.98em;
        padding-top: 0.93em;
        padding-bottom: 0.93em;
        line-height: 1;
        text-transform: uppercase;
        text-align: center;
        -webkit-transition: color 0.3s, border-color 0.3s, background-color 0.3s,
          -webkit-box-shadow 0.3s;
        transition: color 0.3s, border-color 0.3s, background-color 0.3s,
          -webkit-box-shadow 0.3s;
        transition: color 0.3s, border-color 0.3s, background-color 0.3s,
          box-shadow 0.3s;
        transition: color 0.3s, border-color 0.3s, background-color 0.3s,
          box-shadow 0.3s, -webkit-box-shadow 0.3s;
        white-space: nowrap;
        cursor: pointer;

        display: block;
        padding-top: 0.79em;
        padding-bottom: 0.79em;
      }

      & .btn-primary {
        color: #fff;
        border-color: #336699;
        background-color: #336699;
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
</style>
