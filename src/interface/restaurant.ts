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
