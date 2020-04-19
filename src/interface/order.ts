export interface Order {
  userId: number
  restaurantId: number
  totalPrice: number
  menus: OrderMenu[]
  table?: number
  type: number
  chargeId: string
  token?: string
}

export interface OrderMenu {
  id: number
  restaurantId: number
  price: number
  description?: string
  answers: Answer[]
  quantity: number
}

export interface Answer {
  question: string
  choices: string | string[]
}

export interface Notification {
  token: string
  title: string
  name: string
}
