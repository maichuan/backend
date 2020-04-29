import Orders from '../models/Orders'
import RestaurantRank from '../models/RestautantRank'
import { Request, Response } from 'express'
import Sequelize, { Op } from 'sequelize'
import moment from 'moment'
import RestaurantStatistics from '../models/RestaurantStatistics'
import Restaurants from '../models/Restaurants'
import { Rank } from '../interface/restaurant'

export const getRank = async (req: Request, res: Response) => {
  const ranks = await RestaurantRank.findAll({
    limit: 10,
    order: [['score', 'DESC']],
    where: {
      createdAt: {
        [Op.and]: {
          [Op.gte]: moment()
            .subtract(1, 'days')
            .startOf('day')
            .subtract(7, 'hours')
            .toDate(),
          [Op.lte]: moment().toDate(),
        },
      },
    },
    raw: true,
  })
  return res.json({ data: ranks })
}

export const updateRestaurantRank = async (req: Request, res: Response) => {
  const { token } = req.headers

  if (token === 'VARIT') {
    const ranks: Rank[] = []
    const orders = await Orders.findAll({
      where: {
        updatedAt: {
          [Op.and]: {
            [Op.gte]: moment()
              .subtract(1, 'days')
              .startOf('day')
              .subtract(7, 'hours')
              .toDate(),
            [Op.lte]: moment().toDate(),
          },
        },
      },
      raw: true,
    })
    const numclick = await RestaurantStatistics.findAll({
      where: {
        createdAt: {
          [Op.and]: {
            [Op.gte]: moment()
              .subtract(1, 'days')
              .startOf('day')
              .subtract(7, 'hours')
              .toDate(),
            [Op.lte]: moment().toDate(),
          },
        },
      },
      raw: true,
    })

    orders.map(async order => {
      const rankIndex = ranks.findIndex(
        rank => rank.resId === order.restaurantId,
      )
      if (rankIndex >= 0) {
        ranks[rankIndex] = {
          ...ranks[rankIndex],
          score: ranks[rankIndex].score + 3,
        }
      } else {
        ranks.push({ resId: order.restaurantId, score: 3 })
      }
    })

    numclick.map(async click => {
      const rankIndex = ranks.findIndex(
        rank => rank.resId === Number.parseInt(click.resId, 10),
      )
      if (rankIndex >= 0) {
        ranks[rankIndex] = {
          ...ranks[rankIndex],
          score: ranks[rankIndex].score + 1,
        }
      } else {
        ranks.push({ resId: Number.parseInt(click.resId, 10), score: 1 })
      }
    })
    await RestaurantRank.bulkCreate(ranks)
    return res.status(200).send({ message: 'Update complete' })
  }
  return res.status(401).send({ message: 'Resquest without token' })
}

export const getTrendRestaurant = async () => {
  const ranks = await RestaurantRank.findAll({
    limit: 10,
    order: [['score', 'DESC']],
    where: {
      createdAt: {
        [Op.and]: {
          [Op.gte]: moment()
            .subtract(1, 'days')
            .startOf('day')
            .subtract(7, 'hours')
            .toDate(),
          [Op.lte]: moment().toDate(),
        },
      },
    },
    raw: true,
  })

  const ids = ranks.map(r => r.resId)

  const restaurants = await Restaurants.findAll({
    where: { id: ids },
    raw: true,
  })

  const trends = restaurants.map(restaurant => {
    const { score } = ranks.find(rank => rank.resId === restaurant.id) || {
      score: 0,
    }
    return { ...restaurant, score }
  })

  return trends.sort((a, b) => b.score - a.score)
}
