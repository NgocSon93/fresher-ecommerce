<script setup>
import { ValidateHelper } from '~/utils/validate.helper'

const props = defineProps(['profile'])
const emits = defineEmits(['updateEdit'])
const commonStore = useCommonStore()

const mainImage = computed(() => {
  return props.profile?.image.find(image => image.main)?.imagePath ?? ''
})

const passwordChange = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})
const errorCurrentPassword = reactive({
  text: '',
  status: false,
})
const errorNewPassword = reactive({
  text: '',
  status: false,
})
const errorConfirmPassword = reactive({
  text: '',
  status: false,
})
const successfully = reactive({
  text: '',
  status: false,
})
const errorPasswordInvalid = reactive({
  text: '',
  status: false,
})

function focusCurrentPassword() {
  errorCurrentPassword.text = ''
  successfully.text = ''
  errorPasswordInvalid.text = ''
}
function focusNewPassword() {
  errorNewPassword.text = ''
  successfully.text = ''
  errorConfirmPassword.text = ''
  errorPasswordInvalid.text = ''
}
function focusConfirmPassword() {
  errorConfirmPassword.text = ''
  successfully.text = ''
  errorPasswordInvalid.text = ''
}
async function changePassword() {
  let isSuccess = true
  if (!ValidateHelper.isValidPassword(passwordChange.currentPassword)) {
    errorCurrentPassword.text = 'Password must be at least 8 characters long.'
    errorCurrentPassword.status = true
    isSuccess = false
  }
  if (!ValidateHelper.isValidPassword(passwordChange.newPassword)) {
    errorNewPassword.text = 'Password must be at least 8 characters long.'
    errorNewPassword.status = true
    isSuccess = false
  }
  if (!ValidateHelper.isValidPassword(passwordChange.confirmPassword)) {
    errorConfirmPassword.text = 'Password must be at least 8 characters long.'
    errorConfirmPassword.status = true
    isSuccess = false
  }
  if (isSuccess) {
    if (passwordChange.currentPassword === passwordChange.newPassword) {
      errorNewPassword.text
        = 'The new password must be different from the old password'
      errorNewPassword.status = true
    }
    else if (passwordChange.confirmPassword !== passwordChange.newPassword) {
      errorConfirmPassword.text = 'Passwords must be the same'
      errorConfirmPassword.status = true
    }
    else {
      commonStore.setIsLoading(true)
      const { data } = await useCustomFetch(`/users/change-password`, {
        method: 'PUT',
        body: {
          current_password: passwordChange.currentPassword,
          new_password: passwordChange.newPassword,
          password_confirmation: passwordChange.confirmPassword,
        },
      })
      if (data.value) {
        successfully.text = 'Password changed successfully'
        successfully.status = true
      }
      else {
        errorPasswordInvalid.text = 'Password is invalid'
        errorPasswordInvalid.status = true
      }
      commonStore.setIsLoading(false)
    }
  }
}

function updateActiveEdit(newName) {
  emits('updateEdit', { name: newName })
}
</script>

<template>
  <div id="account-details" class="tab-pane active">
    <div class="icon-box icon-box-side icon-box-light">
      <span class="icon-box-icon icon-account mr-2">
        <i class="w-icon-user" />
      </span>
      <div class="icon-box-content">
        <h4 class="icon-box-title mb-0 ls-normal">
          Account Details
        </h4>
      </div>
    </div>
    <div class="account-content">
      <div class="image flex justify-center bg-slate-900 rounded-full">
        <div class="border-2 rounded-full my-1">
          <BaseAvatar :size="90" :name="props.profile.name" :path="mainImage" />
        </div>
      </div>
      <form class="form account-details-form mt-2">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group mt-2">
              <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
              <input
                type="text" name="first-name" autocomplete="given-name" class="form-control form-control-md"
                :value="props.profile.name" readonly
              >
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mt-2">
              <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Phone</label>
              <input
                type="text" name="phone" autocomplete="family-name" class="form-control form-control-md" readonly
                :value="props.profile.phone"
              >
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="form-group mt-2">
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
              <div class="mt-2">
                <input
                  name="email" type="email" autocomplete="email" class="form-control form-control-md" readonly
                  :value="props.profile.email"
                >
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mt-2">
              <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Birth Day</label>
              <div class="mt-2">
                <input
                  type="text" name="birth day" autocomplete="family-name" class="form-control form-control-md"
                  readonly :value="props.profile.birthday"
                >
              </div>
            </div>
          </div>
        </div>
        <div class="EditProfile-button mt-4">
          <button type="button" class="btn btn-dark btn-rounded btn-sm mb-4" @click="updateActiveEdit('editprofile')">
            Go Edit Profile
            <i class="w-icon-long-arrow-right" />
          </button>
        </div>

        <div class="password-change row">
          <h4 class="title title-password ls-25 font-weight-bold">
            Password change
          </h4>
          <div class="form-group mt-2">
            <label class="text-dark" for="cur-password">Current Password leave blank to leave unchanged</label>
            <input
              id="cur-password" v-model="passwordChange.currentPassword" type="password" name="cur_password"
              class="form-control form-control-md" @focus="focusCurrentPassword"
            >
            <p v-if="errorCurrentPassword.status" class="error-password">
              {{ errorCurrentPassword.text }}
            </p>
          </div>
          <div class="form-group mt-2">
            <label class="text-dark" for="new-password">New Password leave blank to leave unchanged</label>
            <input
              id="new-password" v-model="passwordChange.newPassword" type="password" name="new_password"
              class="form-control form-control-md" @focus="focusNewPassword"
            >
            <p v-if="errorNewPassword.status" class="error-password">
              {{ errorNewPassword.text }}
            </p>
          </div>
          <div class="form-group mt-2">
            <label class="text-dark" for="conf-password">Confirm Password</label>
            <input
              id="conf-password" v-model="passwordChange.confirmPassword" type="password" name="conf_password"
              class="form-control form-control-md" @focus="focusConfirmPassword"
            >
            <p v-if="errorConfirmPassword.status" class="error-password">
              {{ errorConfirmPassword.text }}
            </p>
            <p v-if="successfully.status" class="successfully-password mt-2">
              {{ successfully.text }}
            </p>
            <p v-if="errorPasswordInvalid.status" class="error-password mt-2 text-center">
              {{ errorPasswordInvalid.text }}
            </p>
          </div>
        </div>

        <button type="button" class="btn btn-dark btn-rounded btn-sm mb-4 mt-4" @click="changePassword">
          Save Changes
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
a {
  color: inherit;
}
#account-details.tab-pane {
  padding-top: 0.9rem;
}

.tab-pane {
  font-size: 1.3rem;
  line-height: 1.7;
  padding: 1.3rem 0;
  color: #666;
}

#account-details .icon-box {
  margin-bottom: 1.4rem;
}

.icon-box-light {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
}
.icon-box-light .icon-box-title {
  font-size: 2rem;
}

.icon-box .icon-box-title {
  text-transform: capitalize;
  letter-spacing: -0.025em;
  margin-bottom: 0.4rem;
}

.ls-normal {
  letter-spacing: 0 !important;
}

.mb-0 {
  margin-bottom: 0rem !important;
}

form {
  display: block;
  margin-top: 0em;
}

.row {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

.col-md-6 {
  max-width: 50%;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 50%;
  flex: 0 0 50%;
}

#account-details .account-details-form label {
  color: #666;
  font-size: 1.4rem;
  line-height: 2.3;
}

#account-details .account-details-form .form-control {
  border-radius: 0.3rem;
  font-size: 1.4rem;
  color: #666;
}

.form-control {
  -webkit-transition: border-color 0.4s;
  transition: border-color 0.4s;
}

.form-control.form-control-md {
  font-size: 1.3rem;
  min-height: 4.4rem;
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
// change password

#account-details .title-password {
    font-size: 1.8rem;
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
.ls-25 {
    letter-spacing: -0.025em !important;
}
.font-weight-bold {
    font-weight: 600 !important;
}

#account-details .title-password {
    font-size: 1.8rem;
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
.ls-25 {
    letter-spacing: -0.025em !important;
}
.font-weight-bold {
    font-weight: 600 !important;
}

// button

.btn.btn-sm {
    font-size: 1.3rem;
    padding: 0.77em 1.4em;
}

.btn.btn-rounded {
    border-radius: 3px;
}
.btn-dark {
    color: #fff;
    border-color: #333;
    background-color: #333;
}
.btn {
    display: inline-block;
    background-color: #000000;
    color: #fff;
    outline: 0;
    border-radius: 0;
    font-family: inherit;
    font-weight: 600;
    font-size: 1.4rem;
    padding: 0.93em 1.98em;
    line-height: 1;
    text-transform: uppercase;
    text-align: center;
    -webkit-transition: color 0.3s, border-color 0.3s, background-color 0.3s, -webkit-box-shadow 0.3s;
    transition: color 0.3s, border-color 0.3s, background-color 0.3s, -webkit-box-shadow 0.3s;
    transition: color 0.3s, border-color 0.3s, background-color 0.3s, box-shadow 0.3s;
    transition: color 0.3s, border-color 0.3s, background-color 0.3s, box-shadow 0.3s, -webkit-box-shadow 0.3s;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
    background-color: #333;
    color: #fff;
    transition: 0.2s;
  }
}
.mb-4 {
    margin-bottom: 2rem !important;
}
.form-group label {
  color: #666;
  font-size: 1.4rem;
  line-height: 2.3;
}

.form-group .form-control {
  border-radius: 0.3rem;
  font-size: 1.4rem;
  color: #666;
}
.form-control.form-control-md {
  font-size: 1.3rem;
  min-height: 4.4rem;
  margin: 0 !important;
}
.error-password {
  color: red;
  font-size: 1.2rem;
}

.successfully-password {
  margin-top: 2rem;
  text-align: center;
  color: orange;
  font-size: 1.5rem;
}
img {
  width: 7rem;
  height: 7rem;
}

.iconimage {
  width: 5.5rem;
  height: 5.5rem;
  color: #999;
}
</style>
