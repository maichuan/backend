import cron from 'node-cron'
import Orders from '../models/Orders'
import RestaurantRank from '../models/RestautantRank'
import { Request, Response } from 'express'
import Sequelize, { Op } from 'sequelize'
import { sequelize } from '../database'
import moment from 'moment'

export const updateRank = () => {
  cron.schedule('1 17 * * *', async () => {
    const today = new Date()
    console.log('start', new Date().toLocaleString())
    const orders = await Orders.findAll({
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

    orders.map(async (order, i) => {
      const find = await RestaurantRank.findAndCountAll({
        where: {
          resId: order.restaurantId,
          createdAt: today.toISOString().slice(0, 10),
        },
      })
      if (find.count !== 0) {
        await RestaurantRank.increment(
          { score: +3 },
          {
            where: {
              resId: order.restaurantId,
              updatedAt: today.toISOString().slice(0, 10),
            },
          },
        )
      } else {
        await RestaurantRank.create({
          resId: order.restaurantId,
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
  // const topRank = await RestaurantRank.findAll({
  //     limit: 10,
  //     order: [['score', 'DESC']],
  //     where: {
  //         updatedAt: today.toISOString().slice(0, 10),
  //     },
  // })

  // const rank = await RestaurantRank.findAll({
  //     attributes: [
  //         'resId',
  //         [Sequelize.fn('count', Sequelize.col('resId')), 'col_resId'],
  //     ],
  //     group: ['resId'],
  //     raw: true,
  // })
  // console.log('Rank count:', rank)

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

  const startDate: Date = new Date()
  const endDate: Date = new Date(startDate.setDate(startDate.getDate() - 1))

  console.log('start:', startDate)
  console.log('end:', endDate)

  console.log('moment', moment())
  const orders = await Orders.findAll({
    attributes: [
      'restaurantId',
      [Sequelize.fn('count', Sequelize.col('restaurantId')), 'col_resId'],
    ],
    where: {
      createdAt: {
        [Op.and]: {
          [Op.gte]: moment()
            .subtract(1, 'days')
            .startOf('day')
            .toDate(),
          [Op.lte]: moment().toDate(),
        },
      },
      // createdAt: {
      //     [Op.gte]: moment().subtract(1, 'days').toDate(),
      // }
    },
    group: ['restaurantId'],
    raw: true,
  })

  console.log(today)
  // orders.map(async (order) => {
  //     const find = await RestaurantRank.findAndCountAll({
  //         where: {
  //             resId: order.restaurantId,
  //             createdAt: today.toISOString().slice(0, 10),
  //         },
  //     })
  //     if (find.count === null) {
  //         await RestaurantRank.increment(
  //             { score: +3 },
  //             {
  //                 where: {
  //                     resId: order.restaurantId,
  //                     updatedAt: today.toISOString().slice(0, 10),
  //                 },
  //             },
  //         )
  //     } else {
  //         await RestaurantRank.create({
  //             resId: order.restaurantId,
  //             score: 3,
  //         })
  //     }
  // })
  return res.json({ data: orders })
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
