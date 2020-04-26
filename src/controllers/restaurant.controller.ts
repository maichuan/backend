import { Request, Response, NextFunction } from 'express'
import Restaurants from '../models/Restaurants'

import {
  Restaurant,
  RestaurantStat,
  IncomeEachDay,
  MenuEachDay,
} from '../interface/restaurant'
import Menus from '../models/Menus'
import OrderStatistics from '../models/OrderStatistics'
import RestaurantRank from '../models/RestautantRank'
import { Menu } from '../interface/menu'
import RestaurantStatistics from '../models/RestaurantStatistics'
import Orders from '../models/Orders'
import { getFullDate } from '../utils/date'
import ConfirmOrders from '../models/ConfirmOrders'
import { Op } from 'sequelize'

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

export const getStat = async (req: Request, res: Response) => {
  try {
    const resRank = await RestaurantRank.findAll()
    return res.json({ data: resRank })
  } catch (error) {
    return res.json({ message: error })
  }
}

export const postStat = async (req: Request, res: Response) => {
  const newStat: RestaurantStat = req.body
  try {
    await RestaurantStatistics.create(newStat)
    res.json({ message: 'success to post' })
  } catch (error) {
    res.json({ message: error })
  }
}

export const getIncomeById = async (req: Request, res: Response) => {
  const id = req.params.id
  const data: IncomeEachDay[] = []
  const orders = await Orders.findAll({
    order: [['updatedAt', 'DESC']],
    where: {
      restaurantId: id,
    },
  })
  let price = 0
  let oldDate: string
  orders.map(async order => {
    const date: string = getFullDate(order.updatedAt)
    if (oldDate === null || oldDate === undefined) {
      data.push({
        date,
        income: order.price,
      })
      oldDate = date
      price = order.price
      console.log(data)
    } else {
      console.log('olddate', oldDate)
      console.log('date', date)
      if (oldDate === date) {
        price = price + order.price
        data.pop()
        data.push({
          date: oldDate,
          income: price,
        })
      } else {
        data.push({
          date,
          income: order.price,
        })
        price = order.price
        oldDate = date
      }
    }
    console.log('data', data)
  })
  return res.json({
    data,
  })
}

export const getMenuEachDay = async (req: Request, res: Response) => {
  const id = req.params.id
  const date = Number(req.params.date)
  console.log(date)
  const startDay = new Date(date)
  const endDay = new Date()
  endDay.setDate(startDay.getDate())
  endDay.setHours(16, 59, 59, 999)
  startDay.setDate(startDay.getDate() - 1)
  startDay.setHours(17, 0, 0, 0)

  console.log('startDay', startDay)
  console.log('endDay', endDay)
  const orderItems = await ConfirmOrders.findAll({
    // order: [['updatedAt', 'DESC']],
    where: {
      updatedAt: {
        [Op.and]: {
          [Op.gte]: startDay,
          [Op.lte]: endDay,
        },
      },
    },
    raw: true,
  })

  const data: MenuEachDay[] = []
  // let menuId: number = 0
  // let quantity = 0
  // let oldDate = ''
  await Promise.all(
    orderItems.map(async item => {
      const menu = await Menus.findByPk(item.menuId)
      let flag = 0
      if (data.length === 0) {
        data.push({
          id: item.menuId,
          name: menu!.name,
          price: menu!.price,
          quantity: item.quantity,
          totalPrice: item.quantity * menu!.price,
        })
      } else {
        data.map(d => {
          if (d.id === item.menuId) {
            d.quantity = d.quantity + item.quantity
            d.totalPrice = d.quantity * d.price
            flag = 1
          }
        })
        if (flag === 1) {
          data.push({
            id: item.menuId,
            name: menu!.name,
            price: menu!.price,
            quantity: item.quantity,
            totalPrice: item.quantity * menu!.price,
          })
          flag = 0
        }
      }
      console.log(data.length)
    }),
  )
  console.log('last', data.length)
  return res.json({ data })
}
