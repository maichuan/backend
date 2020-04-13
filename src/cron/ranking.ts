import cron from 'node-cron'
import Orders from '../models/Orders'
import RestaurantRank from '../models/RestautantRank'
import { Request, Response } from 'express'
import Sequelize, { Op } from 'sequelize'
import moment from 'moment'
import RestaurantStatistics from '../models/RestaurantStatistics'

export const updateRank = () => {
  cron.schedule('1 17 * * *', async () => {
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
    /////////////////////////////// Order loop score ///////////////////////////////////////////
    orders.map(async order => {
      const findOrder = await RestaurantRank.findAll({
        where: {
          resId: order.restaurantId,
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
      })
      if (findOrder.length === 0) {
        await RestaurantRank.create({
          where: {
            resId: order.restaurantId,
            score: 3,
          },
        })
      } else {
        await RestaurantRank.increment(
          { score: +3 },
          {
            where: {
              resId: order.restaurantId,
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
          },
        )
      }
    })
    ///////////////////////////////////// Click score //////////////////////////////////
    numclick.map(async click => {
      const findOrder = await RestaurantRank.findAll({
        where: {
          resId: click.resId,
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
      })
      if (findOrder.length === 0) {
        await RestaurantRank.create({
          where: {
            resId: click.resId,
            score: 1,
          },
        })
      } else {
        await RestaurantRank.increment(
          { score: +1 },
          {
            where: {
              resId: click.resId,
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
          },
        )
      }
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

  const startDate: Date = new Date()
  const endDate: Date = new Date(startDate.setDate(startDate.getDate() - 1))

  console.log(
    'start:',
    startDate.setHours(startDate.getDate() + 7).toPrecision(),
  )
  console.log('end:', endDate)

  console.log('moment', moment())
  console.log(
    'mo',
    moment()
      .subtract(1, 'days')
      .startOf('day')
      .toDate(),
  )
  const yesterday = moment()
    .subtract(7, 'hours')
    .startOf('day')
    .toDate()
  console.log('yes', yesterday)

  const ranks = await RestaurantRank.findAll({
    // attributes: [
    //     'restaurantId',
    //     [Sequelize.fn('count', Sequelize.col('restaurantId')), 'col_resId'],
    // ],
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
    // group: ['restaurantId'],
    raw: true,
  })

  console.log(ranks.length)
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
  return res.json({ data: ranks })
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
