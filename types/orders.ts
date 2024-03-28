interface ProductInOrder {
  id: number
  productId: number
  name: string
  slug: string
  size: string
  price: number
  quantity: number
  image: string | null
}

interface PaymentMethod {
  id: number
  provider: string
  accountNumber: string
  amount: number
  status: number
}

interface OrderProductRequest {
  productId: number
  price: number
  quantity: number
  sizeId: number
  sizeName: string
  discountId: number | null
}

interface OrderApiResponse {
  orderCode: string
  orderDate: string
  paymentMethod: number
  paymentStatus: number
  status: number
  total: number
}

interface Order {
  id: number
  code: string
  status: number
  receiver: string
  phone: string
  shippingAddress: string
  accountOrder: string
  shippingFee: number
  discount: number
  payment: PaymentMethod
  paymentMethod: number
  subTotal: number
  total: number
  orderDate: string
  products: ProductInOrder[]
}

type Orders = Order[]

export type {
  ProductInOrder,
  OrderProductRequest,
  OrderApiResponse,
  Order,
  Orders,
}
