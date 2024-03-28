<script setup>
import { ValidateHelper } from '~/utils/validate.helper'

const props = defineProps(['profile'])
const emits = defineEmits(['updateProfile', 'cancelUpdate'])

let isSuccess = true
const idDelete = ref([])
const imageUpload = ref([])
const handleChangeImage = ref()
const commonStore = useCommonStore()
const confirmDelete = ref(false)
const imageDeleted = ref()

function confirmModel(image) {
  imageDeleted.value = image
  confirmDelete.value = !confirmDelete.value
  validate()
}
const updateProfile = reactive({
  name: props.profile.name,
  phone: props.profile.phone,
  email: props.profile.email,
  birthday: props.profile.birthday,
  images: props.profile.image,
})
const errorName = reactive({
  text: '',
  status: false,
})
const errorEmail = reactive({
  text: '',
  status: false,
})
const errorPhone = reactive({
  text: '',
  status: false,
})
const successfully = reactive({
  text: '',
  status: false,
})
function validate() {
  isSuccess = true
  if (!updateProfile.name) {
    errorName.text = 'Invalid Name.'
    errorName.status = true
    isSuccess = false
  }
  if (!ValidateHelper.isValidEmail(updateProfile.email)) {
    errorEmail.text = 'Invalid Email.'
    errorEmail.status = true
    isSuccess = false
  }
  if (!ValidateHelper.isValidPhoneNumber(updateProfile.phone)) {
    errorPhone.text = 'Invalid Phone Number.'
    errorPhone.status = true
    isSuccess = false
  }
}

function focusName() {
  errorName.text = ''
  successfully.text = ''
}
function focusEmail() {
  errorEmail.text = ''
  successfully.text = ''
}
function focusPhone() {
  errorPhone.text = ''
  successfully.text = ''
}
function cancelUpdate() {
  emits('cancelUpdate')
}
function handleFileImage(e) {
  const files = e.target.files
  if (files.length) {
    [...files].forEach((value) => {
      imageUpload.value.push(value)
      const newImage = {
        name: value.name,
        main: false,
        imagePath: URL.createObjectURL(value),
      }
      updateProfile.images.push(newImage)
    })
  }
}
function deleteImage(id) {
  idDelete.value.push(id)
  updateProfile.images = updateProfile.images.filter(value => value.imagePath !== imageDeleted.value.imagePath)
  imageUpload.value = imageUpload.value.filter(value => value.name !== imageDeleted.value.name)
  confirmDelete.value = false
}

function handleRadioChange(selected, imgShow) {
  handleChangeImage.value = imgShow.id
  updateProfile.images.forEach((value, index) => {
    value.main = false
    if (index === selected)
      value.main = true
  })
}

async function submitUpdateProfile() {
  validate()
  if (isSuccess) {
    commonStore.setIsLoading(true)
    const formData = new FormData()
    formData.append('name', updateProfile.name)
    formData.append('email', updateProfile.email)
    formData.append('phone', updateProfile.phone)
    formData.append('birthday', updateProfile.birthday || '')
    imageUpload.value.forEach((image) => {
      formData.append('images[]', image)
    })
    idDelete.value.forEach((id) => {
      formData.append('imageDelete[]', id)
    })

    formData.append('imageUpdate', handleChangeImage.value || '')

    const { data, error } = await useCustomFetch(`users/edit-profile`, {
      method: 'POST',
      params: { _method: 'PATCH' },
      body: formData,
    })
    if (data.value) {
      imageUpload.value = []
      idDelete.value = []
      successfully.text = 'Update successfully'
      successfully.status = true
      emits('cancelUpdate')
    }

    else { console.error('loix', error) }

    commonStore.setIsLoading(false)
  }
}
</script>

<template>
  <div id="update-account">
    <form enctype="multipart/form-data">
      <div class="space-y-12 mt-4 tab-pane">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="icon-box-title text-gray-900">
            Profile
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>
          <div class="mt-4">
            <div class="col-span-full">
              <label for="photo" class="icon-box-title text-gray-900">Photo</label>
              <div class="mt-2 flex items-center gap-x-3">
                <div v-if="updateProfile.images.length === 0" class="icon-image">
                  <svg class="h-20 w-20 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path
                      fill-rule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div v-for="(imageshow, index) in updateProfile.images" :key="index" class="image m-auto rounded-full">
                  <div class="showimage flex justify-center ">
                    <NuxtImg class="border-2 rounded-full my-1" :src="imageshow.imagePath" />
                    <Icon name="typcn:delete" class="cursor-pointer" @click="confirmModel(imageshow)" />

                    <BaseConfirm
                      v-if="imageDeleted && imageDeleted.main" :is-confirm="confirmDelete"
                      @click="confirmModel()"
                    >
                      <template #content>
                        <div class="text-center icon-box icon-box-side icon-box-light">
                          <div class="icon-box-content">
                            <h4 class="mb-0 ls-normal">
                              Delete Image
                            </h4>
                            <div class="input-form mt-2">
                              <p class="text-sm text-gray-500">
                                Avatar photos cannot be deleted
                              </p>
                            </div>
                          </div>
                        </div>
                      </template>
                      <template #button>
                        <button
                          type="button"
                          class="mt-3  inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-xl font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                          @click="confirmModel()"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-xl font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          @click="confirmModel()"
                        >
                          Cancel
                        </button>
                      </template>
                    </BaseConfirm>
                    <BaseConfirm v-else :is-confirm="confirmDelete" @click="confirmModel()">
                      <template #content>
                        <div class="text-center icon-box icon-box-side icon-box-light">
                          <div class="icon-box-content">
                            <h4 class="mb-0 ls-normal">
                              Delete Image
                            </h4>
                            <div class="input-form">
                              <p class="text-sm text-gray-500">
                                Are you sure you want to delete your image? All your data will be permanently
                                deleted. This action cannot be undone.
                              </p>
                            </div>
                          </div>
                        </div>
                      </template>
                      <template #button>
                        <button
                          type="button"
                          class="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-xl font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                          @click="deleteImage(imageDeleted.id, index)"
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-xl font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          @click="confirmModel()"
                        >
                          Cancel
                        </button>
                      </template>
                    </BaseConfirm>
                  </div>
                  <div class="form-radio-custom flex ">
                    <input
                      :id="index" :checked="imageshow.main" type="radio" class="custom-radio mr-1 cursor-pointer"
                      @change="handleRadioChange(index, imageshow)"
                    >
                    <label :for="index" class="cursor-pointer">Choose</label>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-span-full">
              <label for="cover-photo" class="icon-box-title text-gray-900">Upload photo</label>
              <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div class="text-center">
                  <div class="mt-4 flex text-lg leading-6 text-gray-600">
                    <label
                      for="file-upload"
                      class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <input id="file-upload" type="file" name="files[]" multiple accept="image/*" class="sr-only" @change="handleFileImage">
                      <span>
                        <div>
                          <svg
                            class="mx-auto mb-4 h-16 w-16 text-gray-300" viewBox="0 0 24 24" fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <div class="flex items-center">
                            <p>Upload a file</p>
                            <p class="pl-1 text-xs font-thin text-gray-600">
                              or drag and drop
                            </p>
                          </div>
                          <p class="text-xs leading-5 text-gray-600">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="pb-2">
          <h2 class="icon-box-title text-gray-900">
            Personal Information
          </h2>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                <div class="input-form">
                  <input
                    id="name" v-model="updateProfile.name" type="text" name="name" autocomplete="given-name"
                    class="form-control" @focus="focusName"
                  >
                  <p v-if="errorName.status" class="error">
                    {{ errorName.text }}
                  </p>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="phone" class="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                <div class="input-form">
                  <input
                    id="phone" v-model="updateProfile.phone" type="text" name="phone" autocomplete="family-name"
                    class="form-control" @focus="focusPhone"
                  >
                  <p v-if="errorPhone.status" class="error">
                    {{ errorPhone.text }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                <div class="input-form">
                  <input
                    id="email" v-model="updateProfile.email" name="email" type="email" autocomplete="email"
                    class="form-control" @focus="focusEmail"
                  >
                  <p v-if="errorEmail.status" class="error">
                    {{ errorEmail.text }}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="phone" class="block text-sm font-medium leading-6 text-gray-900">Birth Day</label>
                <div class="input-form">
                  <input
                    id="phone" v-model="updateProfile.birthday" type="date" name="phone" autocomplete="family-name"
                    class="form-control"
                  >
                </div>
              </div>
            </div>
            <p v-if="successfully.status" class="successfully-password mt-2">
              {{ successfully.text }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-start gap-x-6">
        <button type="button" class="btn bg-white btn-rounded px-4 py-2" @click="cancelUpdate">
          Cancel
        </button>
        <button type="button" class="btn btn-rounded px-4 py-2" @click="submitUpdateProfile()">
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.icon-box-title {
  font-size: 1.5rem;
  text-transform: capitalize;
  letter-spacing: -0.025em;
  margin-bottom: 0.4rem;
}

.tab-pane {
  font-size: 1.4rem;
  line-height: 1.7;
  padding: 1.3rem 0;
  color: #666;
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

.form-group label {
  color: #666;
  font-size: 1.4rem;
  line-height: 2.3;
}

.form-group .form-control {
  margin-bottom: 0.5rem;
  border-radius: 0.3rem;
  font-size: 1.4rem;
  color: #000000;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  font-size: 1.5rem;
  padding: 1.5rem;
  margin: 1rem 0;
  background-color: #000000;
  color: #fff;
  border: 1px solid #333;

  &:hover {
    background-color: #333;
    color: #fff;
    transition: 0.2s;
  }
}

.bg-white {
  border-color: #eee;
  color: #000;

  &:hover {
    color: #333;
  }
}

img {
  width: 70px;
  height: 70px;
  position: relative;
}

.image {
  & svg {
    position: relative;
    width: 25px;
    height: 25px;
    color: red;
    left: -20px;
    opacity: 0;
  }
}

.showimage:hover {
  svg {
    opacity: 1;
    transition: 1s;
  }
}

.error {
  font-size: 1.2rem;
  color: red;
}

.successfully-password {
  font-size: 1.5rem;
  margin-top: 2rem;
  text-align: center;
  color: orange;
}
</style>
