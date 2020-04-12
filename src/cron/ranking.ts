import cron from 'node-cron'
import Orders from '../models/Orders'
import RestaurantRank from '../models/RestautantRank'
import { Request, Response } from 'express'
import Sequelize from 'sequelize'

export const updateRank = () => {
  console.log('start', new Date().toLocaleString())
  cron.schedule('1 17 * * *', async () => {
    const orders = await Orders.findAll()
    orders.map(async (order, i) => {
      if (orders.includes(order)) {
        await RestaurantRank.increment(
          { score: +3 },
          {
            where: {
              resId: order.restaurantId,
            },
          },
        )
      } else {
        await RestaurantRank.create({
          resId: order.restaurantId,
          score: 3,
        })
      }
    })
  })
}

export const getRank = async (req: Request, res: Response) => {
  const today = new Date()
  const topRank = await RestaurantRank.findAll({
    limit: 10,
    order: [['score', 'DESC']],
    where: {
      updatedAt: today.toISOString().slice(0, 10),
    },
  })

  // const now = new Date()
  // console.log("nowwwwwww")
  // console.log(now.toISOString().slice(0, 10))

  ////////////////////////////////////////////////////////////
  // const Op = Sequelize.Op;
  // const TODAY_START = new Date().setHours(0, 0, 0, 0);
  // const NOW = new Date();
  // console.log("date:", NOW)

  // const SUM = await RestaurantRank.findAll({
  //     where: {
  //         created: {
  //             [Op.gt]: TODAY_START,
  //             [Op.lt]: NOW
  //         },
  //     },
  // });
  // console.log("SUM: ", SUM);
  ////////////////////////////////////////////////////////////
  return res.json({ data: topRank })
}

export const testUpdateRank = async (req: Request, res: Response) => {
  const sc = req.query.sc
  RestaurantRank.increment(
    { score: 0 },
    {
      where: {
        resId: 16,
      },
    },
  )
  return res.json({
    message: 'mum-313',
  })
}
