import { Request, Response } from 'express'
import ConfirmOrders from '../models/ConfirmOrders'
import Orders from '../models/Orders'
import { getFullDate, getTime } from '../utils/date'
import { GetHistoryResponse } from '../interface/history'
import Restaurants from '../models/Restaurants'

export const getHistory = async (req: Request, res: Response) => {
  const id = req.headers.id

  if (id) {
    const history = await Orders.findAll({
      where: {
        userId: id,
      },
      raw: true,
    })

    const data: GetHistoryResponse[] = []
    await Promise.all(
      history.map(async h => {
        const resName = await Restaurants.findOne({
          where: { id: h.restaurantId },
          attributes: ['name'],
          raw: true,
        })

        const date = getFullDate(h.createdAt)
        const singleData = data.find(d => d.date === date)
        const ordered = {
          ...h,
          time: getTime(h.createdAt),
          restaurantName: resName ? resName.name : '',
        }
        if (singleData) {
          singleData.ordered.push(ordered)
        } else {
          data.push({ date, ordered: [ordered] })
        }
      }),
    )

    return res.json({ data })
  } else {
    return res.json('No user id')
  }
}
