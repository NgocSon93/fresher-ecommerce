enum CouponType {
  Fixed = 0,
  Rate = 1,
}

enum OrderStatusEnum {
  Pending = 0,
  Approved = 1,
  Delivered = 2,
}

enum PaymentStatusEnum {
  Unpaided = 0,
  Paided = 1,
}

enum PaymentMethodEnum {
  Cod = 0,
  BankTransfer = 1,
}

enum ShippingMethodEnum {
  FreeShip = 0,
  LocalPick = 1,
  FlatRate = 2,
}

enum SortByEnum {
  CreatedAtDesc = '0',
  UpdatedAtDesc = '1',
  PopularityDesc = '2',
  ReviewDesc = '3',
  PriceAsc = '4',
  PriceDesc = '5',
  AvgStarDesc = '6',
}

const paymentMethods = [
  {
    id: PaymentMethodEnum.Cod,
    text: 'Cash on delivery',
    desc: 'Pay with cash upon delivery.',
    active: true,
  },
  {
    id: PaymentMethodEnum.BankTransfer,
    text: 'Direct Bank Transfor',
    desc: 'Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.',
    active: false,
  },
]

const shippingMethods = [
  {
    id: ShippingMethodEnum.FreeShip,
    text: 'Free Shipping',
    name: 'free-shipping',
    value: 0,
    active: true,
  },
  // {
  //   id: ShippingMethodEnum.LocalPick,
  //   text: 'Local Pickup',
  //   name: 'local-pickup',
  //   value: 0,
  //   active: false,
  // },
  // {
  //   id: ShippingMethodEnum.FlatRate,
  //   text: 'Flat rate: $2.00',
  //   name: 'flat-rate',
  //   value: 2,
  //   active: false,
  // },
]

export {
  CouponType,
  OrderStatusEnum,
  PaymentStatusEnum,
  PaymentMethodEnum,
  ShippingMethodEnum,
  SortByEnum,
  shippingMethods,
  paymentMethods,
}
