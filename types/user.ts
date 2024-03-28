import type { Images } from './index'

interface Address {
  id: number
  receiver: string
  phone: string
  address: string
}

type Addresses = Address[]

interface PaymentMethod {
  id: number
  provider: string
  accountNumber: string
}

type PaymentMethods = PaymentMethod[]

interface User {
  id: number
  name: string
  image: Images
  email: string
  phone: string
  birthday: string
  address: Addresses
  paymentMethod: PaymentMethods
  role: number
}

type Users = User[]

export type {
  Address,
  Addresses,
  PaymentMethod,
  PaymentMethods,
  User,
  Users,
}
