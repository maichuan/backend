import { Request, Response, NextFunction } from 'express'
import Restaurants from '../models/Restaurants'

import { Restaurant } from '../interface/restaurant'
import Menus from '../models/Menus'
import OrderStatistics from '../models/OrderStatistics'
import { Menu } from '../interface/menu'

export const getRestaurants = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    const restaurants = await Restaurants.findAll()

    return res.json({ restaurants })
  } catch (e) {
    console.log(e)
  }
}

export const createRestaurant = async (req: Request, res: Response) => {
  const newRestaurant: Restaurant = req.body
  console.log('REQ', req.body)

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
  const menus = await Menus.findAll({
    where: {
      restaurantId: id,
    },
    raw: true,
  })

  const formatMenu = menus.map(m => ({
    ...m,
    question: JSON.parse(m.question),
  }))

  return res.json({
    ...JSON.parse(JSON.stringify(restaurant)),
    menus: formatMenu,
  })
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

export const updateStat = async (req: Request, res: Response) => {
  const id = req.query
  // Brb
  const restaurant = await OrderStatistics.findAll({
    where: { restaurantId: id },
  })
  await OrderStatistics.update(restaurant, {
    where: {},
  })
  //  Brb
  return res.json({ message: 'statRes updated' })
}
