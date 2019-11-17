import { Request, Response, NextFunction } from 'express'
import Restaurants from '../models/Restaurants'

import { Restaurant } from '../interface/restaurant'

export const getRestaurants = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    const restaurants = await Restaurants.findAll()

    return res.json(restaurants)
  } catch (e) {
    console.log(e)
  }
}

export const createRestaurant = async (req: Request, res: Response) => {
  const newRestaurant: Restaurant = req.body
  console.log(newRestaurant)

  try {
    await Restaurants.create(newRestaurant)
    return res.json({
      message: 'Restaurant Created',
    })
  } catch (e) {
    return res.json({
      message: 'Error: ' + e,
    })
  }
}

export const getRestaurant = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const id = req.params.id
  const restaurant = await Restaurants.findByPk(id)

  return res.json(restaurant)
}

export const deleteRestaurant = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const id = req.params.id
  await Restaurants.destroy({ where: { id } })

  return res.json({ message: 'restaurant deleted' })
}

export const updateRestaurant = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const id = req.params.id
  const restaurant = req.body
  await Restaurants.update(restaurant, { where: { id } })

  return res.json({ message: 'restaurant updated' })
}
