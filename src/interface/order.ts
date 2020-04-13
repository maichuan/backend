export interface Order {
  userId: number
  restaurantId: number
  totalPrice: number
  menus: OrderMenu[]
  table?: number
  type: number
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
