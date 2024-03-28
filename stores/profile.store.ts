import { defineStore } from 'pinia'
import { Api } from '~/utils/api'
import type { Addresses, PaymentMethods, User } from '~/types/user'

interface AddressApiResponse {
  data: Addresses
  links: any
  meta: any
}

interface AddressApiRequest {
  user_id: number
  receiver: string
  phone: string
  address: string
}

interface PaymentMethodApiRequest {
  provider: string
  accountNumber: string
}

const api = new Api()

export const useProfileStore = defineStore('profile', () => {
  const profile: Ref<User | null> = ref(null)
  const email: Ref<string> = ref('')
  const addresses: Ref<Addresses> = ref([])
  const paymentMethod: Ref<PaymentMethods> = ref([])

  function setProfile(newProfile: User | null) {
    profile.value = newProfile
  }

  function setEmail(newEmail: string) {
    email.value = newEmail
  }

  function setAddresses(newAddresses: Addresses) {
    addresses.value = newAddresses
  }

  function setPaymentMethod(newPaymentMethod: PaymentMethods) {
    paymentMethod.value = newPaymentMethod
  }

  async function fetchUserProfile() {
    const { data, error } = await api.get<User>('/users/profile')

    if (error.value) {
      console.error(`Error fetching user profile: ${error.value?.message}`)
      return false
    }

    if (!data.value) {
      setProfile(null)
      return false
    }

    setProfile(data.value)
    return true
  }

  async function fetchAllAddress() {
    const { data, error } = await api.get<AddressApiResponse>('/addresses')

    if (error.value) {
      console.error(`Error fetching all addresses: ${error.value?.message}`)
      return false
    }

    if (!data.value) {
      setAddresses([])
      return false
    }

    setAddresses(data.value.data ?? [])
    return true
  }

  async function fetchAddAddress(body: AddressApiRequest) {
    const { error } = await api.post('/addresses', body)

    if (error.value) {
      console.error(`Error fetching add address: ${error.value?.message}`)
      return false
    }

    return true
  }

  async function fetchUpdateAddress(id: number, body: AddressApiRequest) {
    const { error } = await api.patch(`/addresses/${id}`, body)

    if (error.value) {
      console.error(`Error fetching update address: ${error.value?.message}`)
      return false
    }

    return true
  }

  async function fetchDeleteAddress(id: number) {
    const { error } = await api.post(`/addresses/${id}`)

    if (error.value) {
      console.error(`Error fetching delete address: ${error.value?.message}`)
      return false
    }

    return true
  }

  async function fetchAllPaymentMethod() {
    const { data, error } = await api.get<PaymentMethods>('/payment-methods')

    if (error.value) {
      console.error(`Error fetching all payment method: ${error.value?.message}`)
      return false
    }

    if (!data.value) {
      setPaymentMethod([])
      return false
    }

    setPaymentMethod(data.value)
    return true
  }

  async function fetchAddPaymentMethod(body: PaymentMethodApiRequest) {
    const { error } = await api.post('/payment-methods', body)

    if (error.value) {
      console.error(`Error fetching add payment method: ${error.value?.message}`)
      return false
    }

    return true
  }

  async function fetchUpdatePaymentMethod(id: number, body: PaymentMethodApiRequest) {
    const { error } = await api.patch(`/payment-methods/${id}`, body)

    if (error.value) {
      console.error(`Error fetching update payment method: ${error.value?.message}`)
      return false
    }

    return true
  }

  async function fetchDeletePaymentMethod(id: number) {
    const { error } = await api.post(`/payment-methods/${id}`)

    if (error.value) {
      console.error(`Error fetching delete payment method: ${error.value?.message}`)
      return false
    }

    return true
  }

  return {
    profile,
    email,
    addresses,
    paymentMethod,
    setProfile,
    setEmail,
    setAddresses,
    setPaymentMethod,
    fetchUserProfile,
    fetchAllAddress,
    fetchAddAddress,
    fetchUpdateAddress,
    fetchDeleteAddress,
    fetchAllPaymentMethod,
    fetchAddPaymentMethod,
    fetchUpdatePaymentMethod,
    fetchDeletePaymentMethod,
  }
})
