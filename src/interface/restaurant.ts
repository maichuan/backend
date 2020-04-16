export interface Restaurant {
  ownerId: number
  name: string
  address?: string
  phoneno: string
  imgURL: string
  lat: number
  long: number
  serviceCharge?: number
  vat?: number
  numberOfTable?: number
}

export interface RestaurantStat {
  userId: number
  resId: number
}

export interface Rank {
  resId: number
  score: number
}
