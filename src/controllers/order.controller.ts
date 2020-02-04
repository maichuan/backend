import { Request, Response } from 'express'

import ConfirmOrders from '../models/ConfirmOrders'

export const getConfirmOrder = async (req: Request, res: Response) => {
  const uid = req.body
  const confOrders = await ConfirmOrders.findAll({
    where: {
      uid,
    },
  })
  return res.json(confOrders)
}

export const postConfirmOrder = async (req: Request, res: Response) => {
  const newOrder = req.body

  try {
    await ConfirmOrders.create(newOrder)
    return res.json({
      message: 'Selected order success',
    })
  } catch (e) {
    return res.json({
      message: 'Error: ' + e,
    })
  }
}
