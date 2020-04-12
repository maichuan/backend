import cron from 'node-cron'
import Orders from '../models/Orders'
import RestaurantRank from '../models/RestautantRank'
import { Request, Response } from 'express'
import Sequelize from 'sequelize'
import { sequelize } from '../database'
import { CreatedAt } from 'sequelize-typescript'

export const updateRank = () => {
  cron.schedule('1 17 * * *', async () => {
    const today = new Date()
    console.log('start', new Date().toLocaleString())
    const orders = await RestaurantRank.findAll({
      attributes: [
        'resId',
        [Sequelize.fn('count', Sequelize.col('resId')), 'col_resId'],
      ],
      where: {
        updatedAt: today.toISOString().slice(0, 10),
      },
      group: ['resId'],
      raw: true,
    })
    const rankOrders = await RestaurantRank.findAll()
    orders.map(async (order, i) => {
      const find = await RestaurantRank.findAndCountAll({
        where: {
          resId: order.resId,
          createdAt: today.toISOString().slice(0, 10),
        },
      })
      if (find.count !== 0) {
        await RestaurantRank.increment(
          { score: +3 },
          {
            where: {
              resId: order.resId,
              updatedAt: today.toISOString().slice(0, 10),
            },
          },
        )
      } else {
        await RestaurantRank.create({
          resId: order.resId,
          score: 3,
        })
      }
      // if (rankOrders.includes(order)) {
      //     await RestaurantRank.increment(
      //         { score: +3 },
      //         {
      //             where: {
      //                 resId: order.resId,
      //             },
      //         },
      //     )
      // } else {
      //     await RestaurantRank.create({
      //         resId: order.resId,
      //         score: 3,
      //     })
      // }
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

  // const rank = await RestaurantRank.findAll({
  //     attributes: [
  //         'resId',
  //         [Sequelize.fn('count', Sequelize.col('resId')), 'col_resId']
  //     ],
  //     group: ['resId'],
  //     raw: true
  // })
  console.log('Rank count:', topRank)

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
  return res.json({ data: rank })
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
