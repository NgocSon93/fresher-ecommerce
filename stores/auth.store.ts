import { defineStore } from 'pinia'
import { Api } from '~/utils/api'
import { useProfileStore } from '~/stores/profile.store'

interface ApiResponse {
  access_token: string
  max_age: number
  token_type: string
}

const api = new Api()

export const useAuthStore = defineStore('auth', () => new class Store {
  public isShowLoginPopup = ref<boolean>(false)
  public isLogin = ref<boolean>(true)
  public isAuthenticated = computed<boolean>(() => !!useCookie('token').value)

  public setIsShowLoginPopup = (bool: boolean) => {
    this.isShowLoginPopup.value = bool
  }

  public setIsLogin = (bool: boolean) => {
    this.isLogin.value = bool
  }

  public fetchLogin = async (username: string, password: string) => {
    try {
      const { data, error } = await api.post<ApiResponse>('login', { email: username, password })

      if (data.value) {
        const res: ApiResponse = data.value

        const { setEmail } = (useProfileStore())
        setEmail(username)

        useCookie('token', {
          maxAge: res.max_age,
        }).value = res.access_token

        return 'Login successfully'
      }
      else if (error.value && (error.value.statusCode === 422 || error.value.statusCode === 400)) {
        return 'Incorrect account or password.'
      }
      return 'Login fail'
    }
    catch (error) {
      console.log(error)
      return 'Login fail'
    }
  }

  public fetchRegister = async (username: string, fullname: string, password: string) => {
    try {
      const { data, error } = await api.post<ApiResponse>('register', { email: username, name: fullname, password })

      if (data.value) {
        const res: ApiResponse = data.value

        const { setEmail } = (useProfileStore())
        setEmail(username)

        useCookie('token', {
          maxAge: res.max_age,
        }).value = res.access_token

        return 'Register successfully'
      }
      else if (error.value && (error.value.statusCode === 422 || error.value.statusCode === 400)) {
        return 'The email has already been taken.'
      }

      return 'Register fail'
    }
    catch (error) {
      console.log(error)
      return 'Register fail'
    }
  }

  public fetchForgotPassword = async (email: string) => {
    try {
      const { data, error } = await api.post('forgot-password', { email })

      if (data.value)
        return 'Send email successfully'
      else if (error.value && (error.value.statusCode === 422 || error.value.statusCode === 400))
        return 'The selected email is invalid.'
      return 'Send email fail'
    }
    catch (error) {
      console.log(error)
      return 'Send email fail'
    }
  }

  public fetchResetPassword = async (email: string, otp: string, password: string) => {
    try {
      const { data, error } = await api.post('reset-password', { email, otp, password, password_confirmation: password })

      if (data.value) {
        const router = useRouter()
        router.push('/login')
        return 'Reset password successfully'
      }
      else if (error.value && (error.value.statusCode === 422 || error.value.statusCode === 400)) {
        return 'Your OTP code is incorrect. Please try again.'
      }
      return 'Reset password fail'
    }
    catch (error) {
      console.log(error)
      return 'Reset password fail'
    }
  }

  public fetchLogout = async () => {
    const { data, error } = await api.post('logout')

    if (data.value || error.value) {
      const { setProfile, setEmail } = (useProfileStore())
      setProfile(null)
      setEmail('')

      useCookie('token').value = null

      const middleware = useRoute().meta.middleware
      if (Array.isArray(middleware) && middleware.includes('auth'))
        useRouter().push('login')

      else if (!Array.isArray(middleware) && middleware === 'auth')
        useRouter().push('login')

      return true
    }
  }
}())
